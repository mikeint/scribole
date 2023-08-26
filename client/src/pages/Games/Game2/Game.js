import { useState, useRef, useEffect } from 'react';
import './Game.scss';
import sound from '../../../files/correct.mp3';
import { useHistory } from "react-router-dom"; 
import TopBar from '../../../components/TopBar/TopBar';

const Game = () => {
    const [selectedItems, setSelectedItems] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedItems")) || []
    });
    console.log(selectedItems)
    const [randomWord, setRandomWord] = useState(selectedItems[Math.floor(Math.random() * selectedItems.length)]);
    const [pageNumber, setPageNumber] = useState(0);
    const audio = new Audio(sound);

    const inputReference = useRef(null);
    useEffect(() => {
        inputReference.current.focus();
    }, [randomWord]);

    const history = useHistory(); // <-- get history from hook

    const handleForm = e => {
        console.log(e.target.value.toLowerCase(), randomWord) 
        if ((e.target.value).toLowerCase() === randomWord.english) {
            e.target.style.background = "#69d772";
            e.target.disabled = true;
        } else {
            e.target.style.background = "#fff";
        }

        const inputs = document.getElementsByTagName('input');
        if (inputs[0].disabled) {
            setPageNumber(pageNumber + 1);
            showPopUp();
            audio.play();
            /* GAME ENDED */
            if(pageNumber === 5) {
                setPageNumber(0);
                localStorage.setItem('EXP', localStorage.getItem('EXP') ? (parseInt(localStorage.getItem('EXP'))+3) : 5);
                return history.replace("/games");
            }
            else { 
                newWord(inputs);
            }
        } else {
            console.log('game not done yet');
        }
    };
    const newWord =(inputs) => {
        // RESET WORD and PAGE
        setTimeout(function(){
            document.getElementById('popUp').style.display = "none";
            setRandomWord(selectedItems[Math.floor(Math.random() * selectedItems.length)]);
            inputs[0].value='';
            inputs[0].style.backgroundColor = '#ffffff5e';
            inputs[0].disabled = false;
        }, 500);
    }

    const showPopUp = () => {
        document.getElementById('popUp').style.display = "block";

        let id = null;
        const elem = document.getElementById("popUp");
        let pos = 0;
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() {
            if (pos === 350) {
                clearInterval(id);
            } else {
                pos++;
                elem.style.top = pos + "px";
            }
        }
    }
    
    return (
    <>
        <TopBar />
        <div className='gameContainer gradientContainer'>
            <div id="popUp">Good job 🎉</div>

            <div className='wordContainer'>
                <div className='word-italian'>{randomWord.italian}</div>
                <input className="guessInput" id="guessInput" name="guessInput" type="text" autoFocus ref={inputReference} onChange={handleForm} />
            </div>

        </div>
    </>
)}

export default Game;
