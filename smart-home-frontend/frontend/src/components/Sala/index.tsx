// src/components/Sala/index.tsx
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './style.css';
import Luz from "./Luz";
import Tv from "./Tv";

export default function Sala() {
    const socket = io('http://localhost:4000'); // Conexão com o backend

    // Estado inicial dos dispositivos
    const [estadoInicial, setEstadoInicial] = useState({
        luzSala: false,
        tvOn: false,
        canalTv: 1,
        arOn: false,
        arTemp: 24,
    });

    useEffect(() => {
        socket.on('estadoInicial', (estado) => {
            setEstadoInicial(estado);
        });

        socket.on('estadoAtual', (novoEstado) => {
            setEstadoInicial(novoEstado);
        });

        return () => {
            socket.off('estadoInicial');
            socket.off('estadoAtual');
        };
    }, []);

    const ligarLuzSala = () => {
        estadoInicial.luzSala ? socket.emit('apagarLuzSala') : socket.emit('acenderLuzSala');
    };

    const ligarTv = () => {
        estadoInicial.tvOn ? socket.emit('desligarTv') : socket.emit('ligarTv');
    };

    const mudarCanal = (canal: number) => {
        socket.emit('mudarCanal', canal);
    };

    const ligarAr = () => {
        estadoInicial.arOn ? socket.emit('desligarAr') : socket.emit('ligarAr');
    };

    return (
        <div className='sala'>
            <h2>Sala de Estar</h2>
            <Luz estado={estadoInicial.luzSala} onToggle={ligarLuzSala} />
            <Tv
                estadoTv={estadoInicial.tvOn}
                canalTv={estadoInicial.canalTv}
                onToggleTv={ligarTv}
                onMudarCanal={mudarCanal}
            />
            <div className='ar'>
                <p>Sala de Estar - AR Condicionado</p>
                <button onClick={ligarAr}>
                    {estadoInicial.arOn ? 'Desligar Ar' : 'Ligar Ar'}
                </button>
                <label>Temperatura:</label>
                <input
                    type="number"
                    value={estadoInicial.arTemp}
                    disabled={!estadoInicial.arOn}
                    onChange={(e) => {
                        const novaTemp = Number(e.target.value);
                        socket.emit('ajustarTemperaturaAr', novaTemp);
                    }}
                />
            </div>
        </div>
    );
}
