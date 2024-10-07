import express from 'express'
import {Server} from 'socket.io'
import cors from 'cors'
import http from 'http'

const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
})

let dispositivos = {
  luzOn: false
}

io.on('connection', (socket) => {
  console.log('Cliente conectado', socket.id)
  socket.emit('estadoInicial', dispositivos)
  socket.on('acenderLuz', () => {
    dispositivos.luzOn = true
    io.emit('estadoAtual', dispositivos)
  })
  socket.on('apagarLuz', () => {
    dispositivos.luzOn = false
    io.emit('estadoAtual', dispositivos)
  })
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})