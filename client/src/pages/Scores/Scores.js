import React, { useState, useEffect } from 'react';
import './Scores.scss';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';

const Scores = () => {
    const [playerLevel, setPlayerLevel] = useState(localStorage.getItem('LVL'));
    const currentExperience = localStorage.getItem('EXP');
    const maxExperience = (playerLevel*playerLevel*playerLevel+5);
    const experiencePercentage = (currentExperience / maxExperience) * 100;

    useEffect(() => {
        if (currentExperience >= maxExperience)
            localStorage.setItem('LVL', localStorage.getItem('LVL')+1);
            setPlayerLevel(localStorage.getItem('LVL'));
            localStorage.setItem('EXP', 0);
    }, [playerLevel])

    return (
        <>
            <TopBar />
            <NavBar />
            <div className='expBar'>
                <div className='expProgressBar'>
                    <div
                        className='expProgress'
                        style={{ width: `${experiencePercentage}%` }}
                    />
                </div>
                Experience: {currentExperience}/{maxExperience}
            </div>
        </>
    );
};

export default Scores;
