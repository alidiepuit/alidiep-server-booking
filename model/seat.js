const app = require("../app");

class Seat {
  constructor(type, enable, position, price) {
    this.type = type;
    this.enable = enable;
    this.position = position;
    this.price = price;
  }

  isBooked() {
    // console.log('booked', bookedSeat[this.position.y][this.position.x]);
    return app.locals.bookedSeat[this.position.y][this.position.x] != null;
  }
}

module.exports = Seat;