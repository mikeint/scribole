import React, { useState, useEffect } from 'react';
import './Game.scss';
import { useHistory } from 'react-router-dom';
import TopBar from '../../../components/TopBar/TopBar';

// Simple array shuffle
const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
};

const Game = () => {
    const [selectedItems, setSelectedItems] = useState(() => {
        return JSON.parse(localStorage.getItem('selectedItems')) || [];
    });

    const [clickedButtons, setClickedButtons] = useState([]); // Track clicked buttons
    const [uniqueWords, setUniqueWords] = useState([]); // State for unique words
    const [clickedWord, setClickedWord] = useState(""); // New state variable for clicked word
    const [lastClickedId, setLastClickedId] = useState(null); // Track the ID of the last clicked button
    const [mismatched, setMismatched] = useState(false);

    const history = useHistory();

    useEffect(() => {

        // Shuffle the selectedItems array
        const shuffledItems = shuffleArray(selectedItems);

        const extractedWords = shuffledItems.slice(0, 5).flatMap((word) => [
            { idNum: word.idNum, text: word.english },
            { idNum: word.idNum, text: word.italian },
        ]);
        const uniqueWords = Array.from(new Set(extractedWords));
        setUniqueWords(shuffleArray(uniqueWords)); // Shuffle only once when component mounts
    }, [selectedItems]);

    const handleButtonClick = (word) => {
        if (clickedButtons.length === 0) {
            // No button clicked previously, set the clicked button and text
            setClickedButtons([word]);
            // Update the clickedWord state with the text of the clicked word
            setClickedWord(word.text);
            // Set the last clicked ID
            setLastClickedId(word.idNum);
        } 
        else if (clickedButtons.length !== 0 && clickedButtons[0].text !== word.text) {
            // One button clicked previously and it's not the same as the current clicked button
            if (clickedButtons[0].idNum === word.idNum) {
                // Matched ID, shuffle the array
                setUniqueWords(shuffleArray(uniqueWords));
                setClickedButtons([]);
                shuffleArray(selectedItems);
                
            } 
            else {
                // Mismatched text, update clicked buttons and set mismatched state
                setClickedButtons([
                    clickedButtons,
                    { word, text: word.text },
                ]);
                setMismatched(true);
                setTimeout(() => {
                    setClickedButtons([]);
                    setMismatched(false); // Reset mismatched state
                }, 250);
            }
            // Set the last clicked ID
            setLastClickedId(word.idNum);
        }
    };
    

    return (
        <div>
            {/* Display the TopBar component at the very top of the page */}
            <TopBar />
    
            <div className='gameContainer'>
                <div className="grid">
                    {uniqueWords.map((word, index) => (
                        <div key={index} className="wordButtonsContainer">
                            <button
                                className={
                                    clickedButtons.some(
                                        (clickedButton) =>
                                            clickedButton.text === word.text
                                    )
                                        ? mismatched
                                            ? 'mismatchedButton'
                                            : 'activeButton'
                                        : ''
                                }
                                onClick={() => handleButtonClick(word)}
                            >
                                {word.text}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Display the clicked word in the text box */}
                <div className="clickedWordBox">
                    {clickedWord && (
                        <div className="clickedWordText">
                            {clickedWord}
                        </div>
                    )}
                </div>
            </div>
        </div>


    );
    
                    };

export default Game;
