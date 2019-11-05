//establish server connection
var socket = io();

// PARA SABER CUANDO NOS (CLIENTE) CONECTAMOS AL SERVIDOR
socket.on("connect", response => {
  console.log("CONECTADO AL SERVIDOR DE TICKETS");
});

socket.on("disconnect", response => {
  console.log("se perdió conexión con el servidor DE TICKETS");
});

socket.on("actualState", response => {
  console.log("Ultimo ticket", response);
  $("#lblNuevoTicket").text(response.last);
});

$("button").on("click", function() {
  socket.emit("nextTicket", null, sTicket => {
    $("#lblNuevoTicket").text(sTicket);
  });
});
