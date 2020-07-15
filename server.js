const express = require('express')
const server = express()
const theftCheck = require('./theft_check')
const parking = require('./Routes/parking_data')

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use('/Entryportal',express.static(__dirname + "/public/EntryPortal"))
server.use('/ExitPortal',express.static(__dirname + "/public/ExitPortal"))
server.use('/ParkingPortal',express.static(__dirname + '/public/Parking'))
server.use('/Userlogin',express.static(__dirname + "/public/Userlogin"))
server.use('/',express.static(__dirname+"/public"))

server.use('/Parkingdetails',parking)
server.use('/theft_check',theftCheck)

server.listen(6989,()=>{console.log('http://localhost:6989')})