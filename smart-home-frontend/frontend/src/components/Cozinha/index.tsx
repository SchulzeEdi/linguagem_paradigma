// src/components/Cozinha.tsx
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './style.css';
import Luz from './Luz';

export default function Cozinha() {
    const socket = io('http://localhost:4000');

    const [estadoInicial, setEstadoInicial] = useState({
        luzCozinha: false,
        temperaturaGeladeira: 0,
        alertaGeladeira: false,
        fogaoOn: false,
        potenciaFogao: 1,
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

    const ligarLuzCozinha = () => {
        estadoInicial.luzCozinha ? socket.emit('apagarLuzCozinha') : socket.emit('acenderLuzCozinha');
    };

    const ajustarPotenciaFogao = (novaPotencia: number) => {
        socket.emit('ajustarPotenciaFogao', novaPotencia);
    };

    return (
        <div className='cozinha'>
            <Luz estado={estadoInicial.luzCozinha} onToggle={ligarLuzCozinha} />
            <div className='geladeira'>
                <p>Geladeira - Temperatura: {estadoInicial.temperaturaGeladeira}°C</p>
                {estadoInicial.alertaGeladeira && <p style={{ color: 'red' }}>Alerta: Temperatura acima de 5°C!</p>}
            </div>
            <div className='fogao'>
                <p>Fogão Elétrico</p>
                <button onClick={() => ajustarPotenciaFogao(estadoInicial.fogaoOn ? 0 : 1)}>
                    {estadoInicial.fogaoOn ? 'Desligar Fogão' : 'Ligar Fogão'}
                </button>
                {estadoInicial.fogaoOn && (
                    <div>
                        <label>Potência:</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={estadoInicial.potenciaFogao}
                            onChange={(e) => ajustarPotenciaFogao(Number(e.target.value))}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
