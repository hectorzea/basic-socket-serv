const { io } = require("../server");

io.on("connection", client => {
  client.emit("enviarMensaje", {
    user: "Admin",
    mensaje: "Bienvenido a esta app"
  });

  console.log("a user connected");
  client.on("disconnect", () => {
    console.log("user disconnected");
  });

  //escuchar al cliente, el fnCallback es lo que viene del cliente si ok o no ok
  client.on("enviarMensaje", (data, fnCallback) => {
    // if (data.mensaje) {
    //   fnCallback({
    //     resp: "SERVER HAS RECEIVED THE MESSAGE"
    //   });
    // } else {
    //   fnCallback({
    //     resp: "MESSAGE WASNT RECEIVED BY THE SERVER"
    //   });
    // }
    console.log(data);
    //esto lo que hace es que al un usuario enviar mensaje, lo recibe el server, lo emite, pero a TODOS
    client.broadcast.emit("enviarMensaje", data);
  });
});
