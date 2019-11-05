var socket = io();

var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
var lblTicket4 = $("#lblTicket4");

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
var lblEscritorio4 = $("#lblEscritorio4");

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesktop = [
  lblEscritorio1,
  lblEscritorio2,
  lblEscritorio3,
  lblEscritorio4
];

socket.on("last4Tickets", data => {
  var audio = new Audio('audio/new-ticket.mp3');
  audio.play()
  refreshHTML(data.last4Tickets);
});

socket.on("actualState", data => {
  console.log(data);
  refreshHTML(data.last4Tickets);
});

function refreshHTML(last4) {
  for (var i = 0; i < last4.length; i++) {
    lblTickets[i].text("Ticket" + last4[i].ticketnumber);
    lblDesktop[i].text("Desktop" + last4[i].desktoattend);
  }
}
