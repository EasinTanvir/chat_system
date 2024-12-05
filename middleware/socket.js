const { Server } = require("socket.io");

module.exports = {
  socketSetup: (server) => {
    const io = new Server(server, {
      cors: { origin: "http://localhost:5173" },
    });

    // Set to track active user IDs
    const activeUsers = new Set();

    io.on("connection", (socket) => {
      const userId = socket.handshake.auth.token; // Assuming the token is the userId

      if (!userId) {
        console.error("No userId provided, disconnecting socket.");
        return socket.disconnect();
      }

      // Add userId to the active users set
      activeUsers.add(userId);
      console.log(`User ${userId} connected, Socket ID: ${socket.id}`);
      console.log("Active Users:", Array.from(activeUsers));

      // Emit the updated list of active users to all clients
      io.emit("active-user", Array.from(activeUsers));

      // Handle user joining a room
      socket.on("room", (data) => {
        socket.join(data.converId);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`User ${userId} disconnected, Socket ID: ${socket.id}`);

        // Remove userId from the active users set if no sockets are left
        const remainingSockets = Array.from(io.sockets.sockets.values()).some(
          (s) => s.handshake.auth.token === userId
        );

        if (!remainingSockets) {
          activeUsers.delete(userId); // Remove user from active users if no sockets are left
        }

        console.log("Updated Active Users:", Array.from(activeUsers));

        // Emit the updated list of active users to all clients
        io.emit("active-user", Array.from(activeUsers));
      });

      // Handle sending a message
      socket.on("send-message-backend", (data) => {
        socket.to(data.converId).emit("send-message-frontend", {
          message: data.text,
          receiverId: data.receiverId,
          converId: data.converId,
          senderId: data.senderId,
        });
      });
    });
  },
};
