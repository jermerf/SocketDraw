const express = require('express')
const SocketServer = require("./modules/socket-server.js")

const PORT = 8080

var app = express()

app.use(express.static('public'))

app.listen(PORT, () => {
  console.log("Listening on port ", PORT)
})

SocketServer.on('connection', ws => {
  socketSendToEveryoneElse(ws, "new connection")
  ws.on('message', data => {
    socketSendToEveryoneElse(ws, data)
  })
})

function socketSendToEveryoneElse(ws, data) {
  for (const c of SocketServer.clients) {
    if (c == ws) continue
    c.send(data)
  }
}