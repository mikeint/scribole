import React from 'react';
import './Scores.scss';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';

const Scores = () => {
    const level = 5;
    const currentExperience = localStorage.getItem('EXP');
    const maxExperience = level*level*level;
    const experiencePercentage = (currentExperience / maxExperience) * 100;

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
