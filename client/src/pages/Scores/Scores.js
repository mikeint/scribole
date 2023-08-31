import React, { useState, useEffect } from 'react';
import './Scores.scss';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';

const Scores = () => {

    localStorage.setItem('EXP', localStorage.getItem('EXP') ? (parseInt(localStorage.getItem('EXP'))) : 1);
    localStorage.setItem('LVL', localStorage.getItem('LVL') ? (parseInt(localStorage.getItem('LVL'))) : 1);

    const [playerLevel, setPlayerLevel] = useState(parseInt(localStorage.getItem('LVL')));
    const [currentExp, setCurrentExperience] = useState(parseInt(localStorage.getItem('EXP')));
    const [maxExp, setMaxExp] = useState((playerLevel*100));
    const [expPercentage, setExpPercentage] = useState((currentExp / maxExp) * 100);

    useEffect(() => {
        if (currentExp >= maxExp) {
            const expRemain = currentExp - maxExp;
            setPlayerLevel(parseInt(localStorage.getItem('LVL'))+1);
            localStorage.setItem('LVL', parseInt(localStorage.getItem('LVL'))+1);
            setCurrentExperience(expRemain);
            localStorage.setItem('EXP', expRemain);
            setMaxExp((playerLevel*100));
            setExpPercentage((currentExp / maxExp) * 100);
        }
    })

    return (
        <>
            <TopBar />
            <NavBar />
            <div className='expPageContainer'>
                <div className='expBar'>
                    LvL: {playerLevel}
                    <div className='expProgressBar'>
                        <div
                            className='expProgress'
                            style={{ width: `${expPercentage}%` }}
                        />
                    </div>
                    Experience: {currentExp}/{maxExp}
                </div>
            </div>
        </>
    );
};

export default Scores;
