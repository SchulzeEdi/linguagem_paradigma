// src/components/Quarto/index.tsx
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './style.css';
import Luz from './Luz';

export default function Quarto() {
    const socket = io('http://localhost:4000');

    const [estadoInicial, setEstadoInicial] = useState({
        luzQuarto: false,
        ventiladorOn: false,
        velocidadeVentilador: 1,
        cortinasAbertas: false,
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

    const ligarLuzQuarto = () => {
        estadoInicial.luzQuarto ? socket.emit('apagarLuzQuarto') : socket.emit('acenderLuzQuarto');
    };

    const controlarVentilador = () => {
        estadoInicial.ventiladorOn ? socket.emit('desligarVentilador') : socket.emit('ligarVentilador');
    };

    const ajustarVelocidadeVentilador = (novaVelocidade: number) => {
        socket.emit('ajustarVelocidadeVentilador', novaVelocidade);
    };

    const controlarCortinas = () => {
        estadoInicial.cortinasAbertas ? socket.emit('fecharCortinas') : socket.emit('abrirCortinas');
    };

    return (
        <div className='quarto'>
            <h2>Quarto</h2>
            <Luz estado={estadoInicial.luzQuarto} onToggle={ligarLuzQuarto} />

            <div className='ventilador'>
                <p>Ventilador Inteligente</p>
                <button onClick={controlarVentilador}>
                    {estadoInicial.ventiladorOn ? 'Desligar Ventilador' : 'Ligar Ventilador'}
                </button>
                {estadoInicial.ventiladorOn && (
                    <div>
                        <label>Velocidade:</label>
                        <input
                            type="number"
                            min="1"
                            max="3"
                            value={estadoInicial.velocidadeVentilador}
                            onChange={(e) => ajustarVelocidadeVentilador(Number(e.target.value))}
                        />
                    </div>
                )}
            </div>

            <div className='cortinas'>
                <p>Cortinas Automáticas</p>
                <button onClick={controlarCortinas}>
                    {estadoInicial.cortinasAbertas ? 'Fechar Cortinas' : 'Abrir Cortinas'}
                </button>
            </div>
        </div>
    );
}
