//usar var para compatibilidad xD
var socket = io();

// PARA SABER CUANDO NOS (CLIENTE) CONECTAMOS AL SERVIDOR
socket.on("connect", response => {
  console.log("conectado al servidor");
});

socket.on("disconnect", response => {
  console.log("se perdió conexión con el servidor");
});

// LOS EMITS SON PARA ENVIAR INFORMACION
//LOS QUE SON "ON" PARA ESCUCHAR

socket.emit(
  "enviarMensaje",
  {
    user: "yo",
    mensaje: "jajaja xD"
  },
  data => {
    console.log(data);
  }
);

socket.on("enviarMensaje", data => {
  console.log(data);
});
