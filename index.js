const fs = require('fs')
const app = require('./app')
const Theater = require('./model/theater')
const Seat = require('./model/seat')
const SeatType = require('./model/seatType')
const Position = require('./model/position')
const api = require('./api/index')

const PORT = process.env.PORT || 443

let convertToSeatType = function(i) {
  switch (i) {
    case 0: return SeatType.standard;
    case 1: return SeatType.vip;
    case 2: return SeatType.recliner;
    case 3: return SeatType.wheel;
    case 4: return SeatType.notBookable;
    case 5: return SeatType.occupied;
    default: return null;
  }
}

function _processLine(line, lineNumber) {
  // UPDATE2 with parseFloat
  let numbers = line.split(" ").map(function (item) { return parseInt(item); });
  // console.log(numbers, lineNumber);
  return numbers;
}

let readFile = function(file) {
  let
    remaining = "",
    lineFeed = "\n",
    lineNr = 0,
    cols = 0,
    rows = 0,
    result = [];
  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(file, {encoding: 'utf-8'})
    stream.on('data', function (chunk) {
      // store the actual chunk into the remaining
      remaining = remaining.concat(chunk);

      // look that we have a linefeed
      let lastLineFeed = remaining.lastIndexOf(lineFeed);

      // if we don't have any we can continue the reading
      if (lastLineFeed === -1) return;

      let
        current = remaining.substring(0, lastLineFeed),
        lines = current.split(lineFeed);

      // store from the last linefeed or empty it out
      remaining = (lastLineFeed > remaining.length)
        ? remaining.substring(lastLineFeed + 1, remaining.length)
        : "";


      let i = 0, length = lines.length;
      for (; i < length; i++) {
        // process the actual line
        const numbers = _processLine(lines[i], lineNr++);
        if (i === 0) {
          cols = numbers[0];
          rows = numbers[1];
        } else {
          let len = numbers.length;
          // console.log(numbers)
          let rows = [];
          let bookedRows = [];
          for (let x = 0; x < len; x++) {
            rows.push(null);
            bookedRows = [];
            let seatType = convertToSeatType(numbers[x]);
            if (seatType != null) {
              let seat = new Seat(seatType, true, new Position(x, i-1), 10);
              result.push(seat);
            }
          }
          app.locals.markedSeat.push(rows);
          app.locals.bookedSeat.push(bookedRows);
        }
      }
    })
    stream.on("error", err => reject(err));
    stream.on("end", () => resolve(new Theater(
        rows,
        cols,
        result)
      ));
  });
}

app.get('/', (req, res) => {
  res.json({hello: '123'})
})

app.listen(PORT, () => {
  readFile(__dirname + "/theater.txt").then(res => app.locals.theater = res);
  console.log(`Server is running in port ${PORT}`)
})