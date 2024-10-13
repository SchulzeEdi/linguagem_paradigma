import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './style.css';

export default function Quarto() {
    const socket = io('http://localhost:4000');

    interface EstadoInicial {
        luzOn: boolean,
    }

    interface EstadoLuz {
        luzOn: boolean,
    }

    const [estadoInicial, setEstadoInicial] = useState<EstadoInicial>({
        luzOn: false
    });

    const [estadoLuz, setEstadoLuz] = useState<EstadoLuz>({
        luzOn: false
    });

    //conectar ao backend e receber o estado inicial
    useEffect(() => {
        socket.on('estadoInicialQuarto', (estadoInicial: EstadoInicial) => {
            setEstadoInicial(estadoInicial);
        });
        //atualiza estado quando houver mudança
        socket.on('acenderLuzQuarto', (novoEstado: EstadoLuz) => {
            setEstadoLuz(novoEstado);
        });

        return () => {
            socket.off('estadoInicialQuarto');
            socket.off('acenderLuzQuarto');
        }
    }, []);

    //funcao para alterar o estado dos dispositivos
    const acenderLuz = () => {
        socket.emit('acenderLuzQuarto');
    }


    return (
        <div className='quarto'>
            <div className='luz'>
                <p>Quarto - Luz</p>
                <button onClick={acenderLuz}>
                    {estadoLuz.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
                </button>
                <img src='luz.png' className={`status ${estadoLuz.luzOn ? 'on' : 'off'}`} />
            </div>
        </div>
    )
}