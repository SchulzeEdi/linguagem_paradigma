import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:4000')

interface EstadoDispositivo {
  luzOn: boolean
}

const dispositivo: EstadoDispositivo = {
  luzOn: false
}

const acenderLuz = () => {
  socket.emit('acenderLuz', dispositivo.luzOn)
  console.log(dispositivo.luzOn)
}


function App() {
  const [dispositivo, setDispositivo] = useState({ luzOn: false })

  const trocarLuz = () => {
    setDispositivo({ luzOn: !dispositivo.luzOn });
  }

  useEffect(() => {
    socket.on('estadoInicial', (iniciarDispositivo: EstadoDispositivo) => {
      setDispositivo(estadoDispositivo)
    })
  })

  return () => {
    
  }

  return (
    <div className="casa">
      <h1>Casa inteligente</h1>
      <div className='luz'>
        <p>Luz</p>
        <button onClick={trocarLuz}>
          {dispositivo.luzOn ? 'Desligar' : 'Ligar'}
        </button>
        <img src="img/luz.png" className={`status ${dispositivo.luzOn ? 'on' : 'off'}`} alt="" />
      </div>
    </div>
  )
}

export default App;
