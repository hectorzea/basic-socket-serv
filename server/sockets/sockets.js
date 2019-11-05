const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const Ticket = new TicketControl();

io.on("connection", client => {
  client.emit("enviarMensaje", {
    user: "Admin",
    mensaje: "Aplicación de TICKETS!!!"
  });

  console.log("a user connected");
  client.on("disconnect", () => {
    console.log("user disconnected");
  });

  client.on("nextTicket", (data, fnCallback) => {
    let nextTicket = Ticket.nextTicket();
    console.log(nextTicket);
  });

  client.emit("actualState", {
    last: Ticket.getLastTicket(),
    last4Tickets: Ticket.getLast4Tickets()
  });

  client.on("attendTicket", (data, fnCallback) => {
    if (!data.desktop) {
      return fnCallback({
        err: true,
        msg: "Desktop is neccesary"
      });
    }
    let attendTicket = Ticket.attendTickets(data.desktop);
    client.broadcast.emit("last4Tickets", {
      last4Tickets: Ticket.getLast4Tickets()
    });
    fnCallback(attendTicket);
    //actualizar cambios
  });
  //escuchar al cliente, el fnCallback es lo que viene del cliente si ok o no ok
  client.on("enviarMensaje", (data, fnCallback) => {
    //mensajes para verificar que se recibieron los datos desde el front (cliente)
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
