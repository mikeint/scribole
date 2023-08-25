import './Game.scss';
import TopBar from '../../../components/TopBar/TopBar';
import React, { useState, useEffect } from 'react';
import imageFileNames from './imageImporter';
import sound from './correct.mp3';
import wrong1 from '../../../files/failure.mp3';

const Game = () => {

    const [selectedItems, setSelectedItems] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedItems")) || []
    });

    const answer = [0, 1, 2]
    const [shuffledItems, setShuffledItems] = useState(selectedItems);
    const [correctButton, setCorrectButton] = useState(false);
    const [wrongButtonClicked, setWrongButtonClicked] = useState(false);
    const [buttonIndex, setWrongButtonIndex] = useState(null);
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

            
        if (correctButton)
            //Exp Earned
            localStorage.setItem('EXP', localStorage.getItem('EXP') ? (parseInt(localStorage.getItem('EXP'))+3) : 5);
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
    const handleButtonClick = (imageFile, buttonIndex) => {
        if (shuffledItems[0].image === imageFile) {
            const audio = new Audio(sound);
            audio.play();
            setCorrectButton(true);
            setWrongButtonClicked(false);
            setWrongButtonIndex(null);
        } else {
            const audio2 = new Audio(wrong1);
            audio2.play();
            setWrongButtonClicked(true);
            setWrongButtonIndex(buttonIndex);
        }
    
        // Reset wrongButtonClicked and buttonIndex when a new question is presented
        setTimeout(() => {
            setWrongButtonClicked(false);
            setWrongButtonIndex(null);
        }, 500); // Adjust the timeout value as needed
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
                    className={`gameButton ${correctButton ? 'correct' : ''} ${buttonIndex === answer1 ? 'disabled' : ''}`}
                    onClick={() => handleButtonClick(shuffledItems[answer1].image, answer1)}
                    disabled={wrongButtonClicked && buttonIndex !== answer1}
                >
                    {shuffledItems[answer1].italian}
                </button>
                <button
                    className={`gameButton ${correctButton ? 'correct' : ''} ${buttonIndex === answer2 ? 'disabled' : ''}`}
                    onClick={() => handleButtonClick(shuffledItems[answer2].image, answer2)}
                    disabled={wrongButtonClicked && buttonIndex !== answer2}
                >
                    {shuffledItems[answer2].italian}
                </button>
                <button
                    className={`gameButton ${correctButton ? 'correct' : ''} ${buttonIndex === answer3 ? 'disabled' : ''}`}
                    onClick={() => handleButtonClick(shuffledItems[answer3].image, answer3)}
                    disabled={wrongButtonClicked && buttonIndex !== answer3}
                >
                    {shuffledItems[answer3].italian}
                </button>


            </div>
        </>
    );
};

export default Game;
