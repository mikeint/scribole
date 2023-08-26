import './Game.scss';
import TopBar from '../../../components/TopBar/TopBar';
import React, { useState, useEffect } from 'react';
import playButton from './playButton.png';
import correctSound from './correct.mp3'
import wrong1 from '../../../files/failure.mp3';

const importAll = (context) => {
  const keys = context.keys();
  const values = keys.map(context);
  return values;
};

const Game = () => {
    const [selectedItems, setSelectedItems] = useState(() => {
      return JSON.parse(localStorage.getItem('selectedItems')) || [];
    });
  
    const [shuffledItems, setShuffledItems] = useState(selectedItems);
    const [correctButton, setCorrectButton] = useState(false);
    const [selectedWord, setSelectedWord] = useState({});
    const [wrongButtonClicked, setWrongButtonClicked] = useState(false);
    const [buttonIndex, setButtonIndex] = useState(null);
    const [sound, setSound] = useState(new Audio());
    const answer = [0, 1, 2]
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

        const randomSelectedWord = shuffledArray[0];
        const soundNameWithoutExtension = randomSelectedWord.sound.replace('.mp3', '');

        setSelectedWord(randomSelectedWord);

        const soundContext = require.context('../../../files/speech', false, /\.mp3$/);
        const allSounds = importAll(soundContext);

        // Find the sound associated with the selected word
        const selectedSound = allSounds.find(soundPath => soundPath.includes(soundNameWithoutExtension));
        if (selectedSound) {
            const sound = new Audio(selectedSound);
            setSound(sound);
        }

        if (correctButton)
            //Exp Earned
            localStorage.setItem('EXP', localStorage.getItem('EXP') ? (parseInt(localStorage.getItem('EXP'))+3) : 5);
            // Reset correctButton when selectedWord changes
            setCorrectButton(false);

    }, [correctButton]);
  
    const playSound = () => {
        
        sound.play();
    };

    const shuffleArray = (array) => {
        return array.slice().sort(() => Math.random() - 0.5);
    };

    const handleButtonClick = (soundFile, buttonIndex) => {
        if (shuffledItems[0].sound === soundFile) {
            const audio = new Audio(correctSound);
            audio.play();
            setCorrectButton(true);
            setWrongButtonClicked(false);
            setButtonIndex(null);
        } else {
            const audio2 = new Audio(wrong1);
            audio2.play();
            setWrongButtonClicked(true);
            setButtonIndex(buttonIndex);
        }
    
        // Reset wrongButtonClicked and buttonIndex when a new question is presented
        setTimeout(() => {
            setWrongButtonClicked(false);
            setButtonIndex(null);
        }, 200); // Adjust the timeout value as needed
    };
  
    return (
        <>
          <TopBar />
          <div className='game6Container'>
            {selectedWord && sound && (
              <>
                <button className="playButton" onClick={playSound}>
                  <img src={playButton} alt="Play Button" />
                </button>
                <button
                    className={`gameButton ${correctButton ? 'correct' : ''} ${buttonIndex === answer1 ? 'disabled' : ''}`}
                    onClick={() => handleButtonClick(shuffledItems[answer1].sound, answer1)}
                    disabled={wrongButtonClicked && buttonIndex !== answer1}
                >
                    {shuffledItems[answer1].english}
                </button>
                <button
                    className={`gameButton ${correctButton ? 'correct' : ''} ${buttonIndex === answer2 ? 'disabled' : ''}`}
                    onClick={() => handleButtonClick(shuffledItems[answer2].sound, answer2)}
                    disabled={wrongButtonClicked && buttonIndex !== answer2}
                >
                    {shuffledItems[answer2].english}
                </button>
                <button
                    className={`gameButton ${correctButton ? 'correct' : ''} ${buttonIndex === answer3 ? 'disabled' : ''}`}
                    onClick={() => handleButtonClick(shuffledItems[answer3].sound, answer3)}
                    disabled={wrongButtonClicked && buttonIndex !== answer3}
                >
                    {shuffledItems[answer3].english}
                </button>
              </>
            )}
          </div>
        </>
      );
    };

export default Game;
