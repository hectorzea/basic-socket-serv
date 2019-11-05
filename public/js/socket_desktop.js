var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desktop")) {
  window.location = "index.html";
  throw new Error("desktop neccesary.");
}

var desktop = searchParams.get("desktop");

console.log(searchParams);
let label = $("small");

$("h1").text("Escritorio " + desktop);
console.log(desktop);

$("button").on("click", () => {
  socket.emit("attendTicket", { desktop: desktop }, response => {
    console.log(response);
    if (response === "No tickets to attend") {
      label.text(response);
      alert(response);
      return;
    }

    label.text(response.ticketnumber);
  });
});
