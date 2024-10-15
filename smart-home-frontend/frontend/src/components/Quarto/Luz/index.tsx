import React from 'react';

interface LuzProps {
    estado: boolean;
    onToggle: () => void;
}

const Luz: React.FC<LuzProps> = ({ estado, onToggle }) => {
    return (
        <div className='luz'>
            <p>Cozinha - Luzes Inteligentes</p>
            <button onClick={onToggle}>
                {estado ? 'Desligar Luz' : 'Ligar Luz'}
            </button>
            <img src='img/luz.png' className={`status ${estado ? 'on' : 'off'}`} />
        </div>
    );
};

export default Luz;
