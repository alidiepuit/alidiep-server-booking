const app = require('../app')
const Seat = require('../model/seat')
const Theater = require('../model/theater')
const SeatType = require('../model/seatType')

module.exports = app.get('/theater', (req, res) => {
  let seats = [];
  app.locals.theater.seats.forEach(seat => {
    let s = new Seat(seat.type, seat.enable, seat.position, seat.price);
    let blocked = app.locals.markedSeat[seat.position.y][seat.position.x];
    if (s.isBooked() || (blocked != null && !blocked.isExpired())) {
      console.log(blocked, blocked.isExpired())
      s.type = SeatType.occupied;
    }
    seats.push(s);
  });

  res.send(new Theater(
    app.locals.theater.rows, app.locals.theater.cols, seats
  ));
})
