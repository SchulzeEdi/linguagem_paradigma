import React from 'react';

interface LuzProps {
    estado: boolean;
    onToggle: () => void;
}

export default function Luz({ estado, onToggle }: LuzProps) {
    return (
        <div className='luz'>
            <p>Sala de Estar - Luz</p>
            <button onClick={onToggle}>
                {estado ? 'Desligar Luz' : 'Ligar Luz'}
            </button>
            <img src='img/luz.png' className={`status ${estado ? 'on' : 'off'}`} />
        </div>
    );
}
