import React, { useState, useEffect } from 'react';
import './Game.scss';
import sound from './correct.mp3';
import TopBar from '../../../components/TopBar/TopBar';

const Game = () => {
    const [selectedItems, setSelectedItems] = useState(() => {
        return JSON.parse(localStorage.getItem('selectedItems')) || [];
    });

    const [clickedWord, setClickedWord] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [prevClickedItem, setPrevClickedItem] = useState(null);
    const [pairMatched, setPairMatched] = useState(false);
    const [pairNotMatched, setPairNotMatched] = useState(false);
    const [numOfMatchedPairs, setNumOfMatchedPairs] = useState(0);
    const [resetWords, setResetWords] = useState(0);
    const [matchedPairs, setMatchedPairs] = useState([]);

    const handleButtonClick = (item) => {
        if (clickedWord === item || matchedPairs.includes(item.idNum)) {
            return; //Do nothing if the same button is clicked twice
        }

        if (prevClickedItem && prevClickedItem.idNum === item.idNum) {
            setPairMatched(true);
            const audio = new Audio(sound);
            audio.play();

            // Update the matched pairs
            setMatchedPairs((prevPairs) => [...prevPairs, item.idNum]);
        } else if (prevClickedItem && prevClickedItem.idNum !== item.idNum) {
            setPairNotMatched(true);
        }

        setClickedWord(item);
        setButtonClicked(true);
        setPrevClickedItem(item);
    };

    useEffect(() => {
        if (pairMatched) {
            setTimeout(() => {
                setPrevClickedItem(null);
                setButtonClicked(false);
                setPairMatched(false);
                setClickedWord(null);
                localStorage.setItem('EXP', localStorage.getItem('EXP') ? (parseInt(localStorage.getItem('EXP'))+10) : 1);
                setNumOfMatchedPairs((prevNum) => prevNum + 1);
                if (numOfMatchedPairs === 4) {
                    setResetWords((prevReset) => prevReset + 1);
                    setNumOfMatchedPairs(0);
                    setMatchedPairs([])
                }
            }, 250); // 0.25 seconds delay
        } else if (pairNotMatched) {
            setTimeout(() => {
                setPrevClickedItem(null);
                setButtonClicked(false);
                setPairNotMatched(false);
                setClickedWord(null);
            }, 250); // 0.25 seconds delay
        }
    }, [pairMatched, pairNotMatched, numOfMatchedPairs]);

    const [selectedShuffledItems, setSelectedShuffledItems] = useState([]);
    const [shuffledItemsRight, setShuffledItemsRight] = useState([]);

    useEffect(() => {
        const shuffledItems = shuffleArray(selectedItems);
        const selectedShuffled = shuffledItems.slice(0, 5);
        const shuffledRight = shuffleArray(selectedShuffled);

        const removeEnglishFromShuffledRight = () => {
            const updatedShuffledRight = shuffledRight.map(item => {
                const { english, ...rest } = item;
                return rest;
            });
            setShuffledItemsRight(updatedShuffledRight);
        };

        setSelectedShuffledItems(selectedShuffled);
        setShuffledItemsRight(shuffledRight);
        removeEnglishFromShuffledRight();

    }, [resetWords]);

    const shuffleArray = (array) => {
        return array.slice().sort(() => Math.random() - 0.5);
    };

    return (
        <>
            <TopBar />
            <div className="game3Container">
                
                {clickedWord && (
                    <div className="clickedWordBox">
                        <p className="clickedWordText">{clickedWord.english || clickedWord.italian}</p>
                    </div>
                )}
                <div className="grid">
                    <div className="wordButtonsContainer">
                        {selectedShuffledItems.map((item, index) => (
                            <button
                                key={index}
                                className={`button 
                                    ${item === clickedWord && buttonClicked ? 'activeButton' : ''} 
                                    ${item === clickedWord && pairNotMatched ? 'notMatchedButton' : ''}
                                    ${item === clickedWord && pairMatched ? 'matchedButton' : ''}
                                    ${matchedPairs.includes(item.idNum) ? 'disabledButton' : ''}`
                                }
                                onClick={() => handleButtonClick(item)}
                            >
                                {item.english}
                            </button>
                        ))}
                    </div>
                    <div className="wordButtonsContainer">
                        {shuffledItemsRight.map((item, index) => (
                            <button
                                key={index}
                                className={`button 
                                    ${item === clickedWord && buttonClicked ? 'activeButton' : ''}
                                    ${item === clickedWord && pairNotMatched ? 'notMatchedButton' : ''} 
                                    ${item === clickedWord && pairMatched ? 'matchedButton' : ''}
                                    ${matchedPairs.includes(item.idNum) ? 'disabledButton' : ''}`
                                }
                                onClick={() => handleButtonClick(item)}
                            >
                                {item.italian}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Game;
