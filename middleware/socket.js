const { Server } = require("socket.io");

module.exports = {
  socketSetup: (server) => {
    const io = new Server(server, {
      cors: { origin: "http://localhost:5173" },
    });

    const activeUsers = new Set();

    io.on("connection", (socket) => {
      const userId = socket.handshake.auth.token;

      if (!userId) {
        console.error("No userId provided, disconnecting socket.");
        return socket.disconnect();
      }

      activeUsers.add(userId);
      console.log(`User ${userId} connected, Socket ID: ${socket.id}`);
      console.log("Active Users:", Array.from(activeUsers));

      io.emit("active-user", Array.from(activeUsers));

      socket.on("room", (data) => {
        socket.join(data.converId);
      });

      socket.on("disconnect", () => {
        console.log(`User ${userId} disconnected, Socket ID: ${socket.id}`);

        const remainingSockets = Array.from(io.sockets.sockets.values()).some(
          (s) => s.handshake.auth.token === userId
        );

        if (!remainingSockets) {
          activeUsers.delete(userId);
        }

        io.emit("active-user", Array.from(activeUsers));
      });

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
