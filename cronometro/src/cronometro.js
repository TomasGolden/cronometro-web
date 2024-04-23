import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cronometro = () => {
    const [horas, setHoras] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [segundos, setSegundos] = useState(0);
    const [running, setRunning] = useState(false);
    let interval;

    useEffect(() => {
        if (running) {
            interval = setInterval(() => {
                setSegundos(segundos => {
                    if (segundos === 59) {
                        setSegundos(0);
                        setMinutos(minutos => {
                            if (minutos === 59) {
                                setMinutos(0);
                                setHoras(horas => horas + 1);
                            } else {
                                setMinutos(minutos => minutos + 1);
                            }
                        });
                    } else {
                        return segundos + 1;
                    }
                
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [running]);

    const handleStartStop = () => {
        setRunning(!running);
    };

    const handleReset = () => {
        setSegundos(0);
        setRunning(false);
    };

    return (
        <div class='container'>
            <div class='row'>
                <div class='col-md-6 mx-auto'>
                    <div class='card-body'>
                        <h5 class='card/title'>Cronometro</h5>
                        <p class='card-text'>
                            <span id='horas' class='crono-digit'>{horas}</span> :
                            <span id='minutos'  class='crono-digit'> {minutos}</span> :
                            <span id='segundos'  class='crono-digit'> {segundos}</span>
                        </p>
                        <div class='btn-group' role='group'>
                            <button class='btn btn-primary' onClick={handleStartStop}>{running ? 'Pausar' : 'Iniciar'}</button>
                            <button class='btn btn-secondary' onClick={handleReset}>Reiniciar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cronometro;