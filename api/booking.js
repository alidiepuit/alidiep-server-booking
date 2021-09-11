const app = require('../app')
const Position = require('../model/position')

module.exports = app.post('/booking', (req, res) => {
  let id = req.header("id")
  console.log(id, req.body)
  if (req.body.positions != null) {
    let positions = JSON.parse(req.body.positions);
    let length = positions.length;
    for(let i = 0; i < length; i++) {
      let position = positions[i];
      let p = new Position(position.x, position.y);
      let selectSeat = app.locals.theater.seats.find(seat => seat.position.x === p.x && seat.position.y === p.y);
      console.log(selectSeat);
      let blocked = app.locals.markedSeat[p.y][p.x];
      if (selectSeat.isBooked() || (blocked != null && blocked.id !== id && !blocked.isExpired())) {
        console.log('seat in locked', blocked)
        res.status(401).send({
          isSuccess: false,
          message: 'Seat is not available'
        });
        return;
      }
      app.locals.bookedSeat[p.y][p.x] = id;
    }
    res.send({
      isSuccess: true,
      message: 'Success'
    });
  }
})