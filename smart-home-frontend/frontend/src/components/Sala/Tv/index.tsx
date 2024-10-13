import React from "react";
import './style.css';

interface TvProps {
    estadoTv: boolean;
    canalTv: number;
    onToggleTv: () => void;
    onMudarCanal: (canal: number) => void;
}

const Tv: React.FC<TvProps> = ({ estadoTv, canalTv, onToggleTv, onMudarCanal }) => {
    const canais = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className='tv'>
            <p>Sala de Estar - TV</p>
            <button onClick={onToggleTv}>
                {estadoTv ? 'Desligar TV' : 'Ligar TV'}
            </button>
            {estadoTv && (
                <div>
                    <p>Canal: {canalTv}</p>
                    <label>Mudar Canal:</label>
                    <select
                        value={canalTv}
                        onChange={(e) => onMudarCanal(Number(e.target.value))}
                    >
                        {canais.map(canal => (
                            <option key={canal} value={canal}>
                                Canal {canal}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default Tv;
