const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.locals.theater = []
app.locals.markedSeat = []
app.locals.bookedSeat = []

module.exports = app;