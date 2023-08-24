import './Game.scss';
import TopBar from '../../../components/TopBar/TopBar';
import React, { useState, useEffect } from 'react';
import imageFileNames from './imageImporter';

const Game = () => {

    const [selectedItems, setSelectedItems] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedItems")) || []
    });

    const answer = [0, 1, 2]
    const [shuffledItems, setShuffledItems] = useState(selectedItems);
    const [correctButton, setCorrectButton] = useState(false);
    const [gameImage, setGameImage] = useState("");
    const [answer1, setAnswer1] = useState(0)
    const [answer2, setAnswer2] = useState(0)
    const [answer3, setAnswer3] = useState(0)

    
    
    useEffect(() => {
        const shuffledArray = shuffleArray(selectedItems);
        setShuffledItems(shuffledArray)
        const answerNum = shuffleArray(answer)
        setAnswer1(answerNum[0])
        setAnswer2(answerNum[1])
        setAnswer3(answerNum[2])

        //Exp Earned
        if (correctButton)
            localStorage.setItem('EXP', localStorage.getItem('EXP') ? (parseInt(localStorage.getItem('EXP'))+1) : 1);
            // Reset correctButton when selectedWord changes
            setCorrectButton(false);
        

        const matchingImage = imageFileNames.find(image => image.fileName === shuffledArray[0].image);
        if (matchingImage) {
            setGameImage(matchingImage);
         } 
        },[correctButton]);

    const shuffleArray = (array) => {
        return array.slice().sort(() => Math.random() - 0.5);
    };

    // Event handler for button click
    const handleButtonClick = (imageFile) => {
        if (shuffledItems[0].image === imageFile) {
            setCorrectButton(true);
        }
    };


    return (
        <>
            <TopBar />
            <div className='game5Container'>
                <div className='imageContainer'>
                    <img src={gameImage.url} alt="Game Image" />
                </div>
            </div>
            <div className="buttonContainer">
                <button
                    className={`gameButton ${correctButton ? 'correct' : ''}`}
                    onClick={() => handleButtonClick(shuffledItems[answer1].image)}
                >
                    {shuffledItems[answer1].italian}
                </button>
                <button
                    className={`gameButton ${correctButton ? 'correct' : ''}`}
                    onClick={() => handleButtonClick(shuffledItems[answer2].image)}
                >
                    {shuffledItems[answer2].italian}
                </button>
                <button
                    className={`gameButton ${correctButton ? 'correct' : ''}`}
                    onClick={() => handleButtonClick(shuffledItems[answer3].image)}
                >
                    {shuffledItems[answer3].italian}
                </button>
            </div>
        </>
    );
};

export default Game;
