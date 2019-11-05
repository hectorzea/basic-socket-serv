const fs = require("fs");

class Ticket {
  constructor(ticketnumber, desktoattend) {
    this.ticketnumber = ticketnumber;
    this.desktoattend = desktoattend;
  }
}

class TicketControl {
  constructor() {
    this.tickets = [];
    this.lastTicket = 0;
    this.last4Tickets = [];
    this.now = new Date().getDate();
    let data = require("../data/data.json");
    console.log(data);
    // si es el mismo dia de trabajo empezar desde aquí, sinó reiniciar
    if (data.now === this.now) {
      this.lastTicket = data.lastTicket;
      this.tickets = data.tickets;
      this.last4Tickets = data.last4Tickets;
    } else {
      this.resetCount();
    }
  }
  resetCount() {
    this.lastTicket = 0;
    this.tickets = [];
    this.last4Tickets = [];
    this.saveFile();
  }

  attendTickets(desktop) {
    if (this.tickets.length === 0) {
      return "No tickets to attend";
    }
    let ticketNumber = this.tickets[0].ticketnumber;
    this.tickets.shift();
    let attendTicket = new Ticket(ticketNumber, desktop);
    this.last4Tickets.unshift(attendTicket);
    if (this.last4Tickets.length > 4) {
      this.last4Tickets.pop();
    }
    console.log(this.last4Tickets);
    this.saveFile();
    return attendTicket;
  }

  getLastTicket() {
    return `Ultimo ticket ${this.lastTicket} `;
  }

  getLast4Tickets() {
    return this.last4Tickets;
  }

  saveFile() {
    let jsonData = {
      lastTicket: this.lastTicket,
      now: this.now,
      tickets: this.tickets,
      last4Tickets: this.last4Tickets
    };
    let sJsonJdata = JSON.stringify(jsonData);
    fs.writeFileSync("../server/data/data.json", sJsonJdata);
  }

  nextTicket() {
    this.lastTicket += 1;
    let ticket = new Ticket(this.lastTicket, null);
    this.tickets.push(ticket);
    this.saveFile();
    return `Ticket N° ${this.lastTicket} generado con exito`;
  }
}

module.exports = {
  TicketControl
};
