// backend.js (ou o arquivo correspondente no seu projeto)
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

// Estado inicial
let dispositivos = {
    luzSala: false,
    tvOn: false,
    canalTv: 1,
    arOn: false,
    arTemp: 24,
    luzCozinha: false,
    temperaturaGeladeira: 1,
    alertaGeladeira: false,
    potenciaFogao: 0,
    fogaoOn: false

};

io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.id);
    socket.emit('estadoInicial', dispositivos);

    socket.on('acenderLuzSala', () => {
        dispositivos.luzSala = true;
        io.emit('estadoAtual', dispositivos);
    });

    socket.on('apagarLuzSala', () => {
        dispositivos.luzSala = false;
        io.emit('estadoAtual', dispositivos);
    });

    socket.on('ligarTv', () => {
        dispositivos.tvOn = true;
        io.emit('estadoAtual', dispositivos);
    });

    socket.on('desligarTv', () => {
        dispositivos.tvOn = false;
        io.emit('estadoAtual', dispositivos);
    });

    socket.on('mudarCanal', (canal) => {
        dispositivos.canalTv = canal;
        io.emit('estadoAtual', dispositivos);
    });

    socket.on('ligarAr', () => {
      dispositivos.arOn = true;
      io.emit('estadoAtual', dispositivos);
    });
    
    socket.on('desligarAr', () => {
      dispositivos.arOn = false;
      io.emit('estadoAtual', dispositivos);
    });

    socket.on('ajustarTemperaturaAr', (novaTemp) => {
      dispositivos.arTemp = novaTemp;
      io.emit('estadoAtual', dispositivos);
    });

    socket.on('acenderLuzCozinha', () => {
        dispositivos.luzCozinha = true;
        io.emit('estadoAtual', dispositivos);
    });

    socket.on('apagarLuzCozinha', () => {
        dispositivos.luzCozinha = false;
        io.emit('estadoAtual', dispositivos);
    });

    socket.on('monitorarGeladeira', () => {
        if (dispositivos.temperaturaGeladeira > 5) {
            dispositivos.alertaGeladeira = true;
        } else {
            dispositivos.alertaGeladeira = false;
        }
        io.emit('estadoAtual', dispositivos);
    });

    socket.on('ajustarPotenciaFogao', (novaPotencia) => {
        dispositivos.potenciaFogao = novaPotencia;
        dispositivos.fogaoOn = novaPotencia > 0;
        io.emit('estadoAtual', dispositivos);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});