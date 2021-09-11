const app = require('../app')
const BlockedSeat = require('../model/blockedSeat')

module.exports = app.post('/check-seat', (req, res) => {
  let id = req.header("id")
  console.log(id, req.body)
  let selectSeat = app.locals.theater.seats.find(seat => seat.position.x === req.body.x && seat.position.y === req.body.y);
  console.log(selectSeat)
  let blocked = app.locals.markedSeat[req.body.y][req.body.x];
  if (selectSeat.isBooked() || (blocked != null && blocked.id !== id && !blocked.isExpired())) {
    console.log('seat in locked', blocked)
    res.status(401).send({
       message: 'Seat is not available'
    });
    return;
  }
  if (req.body.isSelected) {
      console.log('add seat to blockedSeat')
      app.locals.markedSeat[req.body.y][req.body.x] = new BlockedSeat(id, Date.now() + 60000);
      res.send({
        'seat': selectSeat,
        'isSelected': req.body.isSelected,
      });
  } else {
    app.locals.markedSeat[req.body.y][req.body.x] = null;
    res.send({
      'seat': selectSeat,
      'isSelected': req.body.isSelected,
    });
  }
})