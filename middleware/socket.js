const { Server } = require("socket.io");

module.exports = {
  socketSetup: (server) => {
    const io = new Server(server, {
      cors: { origin: "http://localhost:5173" },
    });

    io.on("connection", (socket) => {
      socket.on("room", (data) => {
        socket.join(data.converId);
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
