## Server booking

####Run server
```
PORT=7000 npm start
```
Default PORT=7000

This server is very basic, using Node.JS to booking ticket.
##How it work
1. Server load map theater since starting.
```
10 5
0 0 0 3 3 3 3 0 0 0
0 -1 0 0 0 0 0 0 -1 0
0 0 1 1 1 1 1 1 0 0
0 0 1 1 1 1 1 1 0 0
0 0 0 0 0 0 0 0 0 0
```
This is map of seats in theater.
The first line is m (column) and n (row)
In next n line, each line contains m space-separated integers.
```
case 0: SeatType.standard
case 1: SeatType.vip
case 2: SeatType.recliner
case 3: SeatType.wheel
case 4: SeatType.notBookable
case 5: SeatType.occupied
```
If there is not any seat in position, it's -1
2. API load list seats
3. API check whether seat is available or not. The selected seat is available in 60s.
4. API booking seat, include add information of user (name, email)
