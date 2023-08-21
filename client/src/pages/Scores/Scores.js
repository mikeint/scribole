import React, { useState, useEffect } from 'react';
import './Scores.scss';  
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';

const Scores = () => {
    const [gamesPlayed, setGamesPlayed] = useState(() => {
        return JSON.parse(localStorage.getItem('gamesPlayed')) || [];
    });

    useEffect(() => {
        localStorage.setItem('gamesPlayed', JSON.stringify(gamesPlayed));
    }, []);

    console.log(gamesPlayed)

    return ( 
        <>
            <TopBar />
            <NavBar />
            <div className='scoresContainer'>
                You played Game2: {gamesPlayed} times
            </div>
        </>
    )
} 

export default Scores;
