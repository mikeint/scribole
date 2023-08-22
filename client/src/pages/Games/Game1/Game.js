import { useState, useEffect } from 'react';
import './Game.scss';
import words from './words.json';
import sound from '../../../files/correct.mp3';
import TopBar from '../../../components/TopBar/TopBar';

const Game = (props) => {

    const [randomWord, setRandomWord] = useState(words[Math.floor(Math.random() * words.length)]);
    const [randomConjugation, setConjugation] = useState(Math.floor(Math.random() * 3));
    const [randomFormFieldIndexes, setRandomFormFieldIndexes] = useState([]);
    const [fieldData, setfieldData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const audio = new Audio(sound)
    const colors = ["#009344"," #9E9FA5", "#cf2734"];
    const indicativo = ["present", "past", "future"];

    useEffect(
        ()=> {
            initialSetRandomFormFieldIndexes()
        }, []
    );

    const initialSetRandomFormFieldIndexes = () => {
        var tempIndexes = [];
        while(tempIndexes.length < 2){
            var r = Math.floor(Math.random() * 6);
            if(tempIndexes.indexOf(r) === -1) tempIndexes.push(r);
        }
        setRandomFormFieldIndexes(tempIndexes);
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
    
    const newWord =(inputs) => {
        showPopUp();
        audio.play();

        // RESET WORD and PAGE
        setTimeout(function(){
            document.getElementById('popUp').style.display = "none";
            setRandomWord(words[Math.floor(Math.random() * words.length)]);
            setConjugation(Math.floor(Math.random() * 3));
            initialSetRandomFormFieldIndexes();
            inputs[0].value='';
            inputs[1].value='';
            inputs[0].style.backgroundColor = '#ffffff5e';
            inputs[1].style.backgroundColor = '#ffffff5e';
            inputs[0].disabled = false;
            inputs[1].disabled = false;
        }, 1000);
    }

    const handleForm = e => {
        setfieldData(e.target.value);
        console.log(e.target.name, randomWord.conjugations[randomConjugation][e.target.name]);

        if (e.target.value === randomWord.conjugations[randomConjugation][e.target.name]) {
            e.target.style.background = "#69d772";
            e.target.disabled = true;
        } else {
            e.target.style.background = "#fff";
        }

        /* BOTH INPUTS CORRECT */
        const inputs = document.getElementsByTagName('input');
        if (inputs[0].disabled && inputs[1].disabled) {
            setPageNumber(pageNumber + 1);
            if(pageNumber === 4) { 
                props.hideHomePage();
            }
            else { 
                newWord(inputs); 
            }

        } else {
            console.log('get teh words right noob');
        }
    };

    return (
        <>
            <TopBar />
            <div className='gameContainer' style={{backgroundColor: colors[randomConjugation]}}> 
                <div id="popUp">Good job 🎉</div>
                <div className='wordContainer'>
                    <div className='word-italian'>{randomWord.word}</div>
                    <div className='word-english'>{randomWord.english}</div>
                    <div className='word-indicativo'>{indicativo[randomConjugation]}</div>
                </div>


                <div className='tenseContainer'>
                    <div className='tense'>io</div>
                    <div className='tenseConjecation'>{randomFormFieldIndexes.indexOf(0) >= 0 ? <input id="io" name="io" value={fieldData.io} type="text" onChange={handleForm} /> : randomWord.conjugations[randomConjugation].io}</div>
                </div>
                <div className='tenseContainer'>
                    <div className='tense'>tu</div>
                    <div className='tenseConjecation'>{randomFormFieldIndexes.indexOf(1) >= 0 ? <input id="tu" name="tu" value={fieldData.tu} type="text" onChange={handleForm} /> : randomWord.conjugations[randomConjugation].tu}</div>
                </div>
                <div className='tenseContainer'>
                    <div className='tense'>lui/lei</div>
                    <div className='tenseConjecation'>{randomFormFieldIndexes.indexOf(2) >= 0 ? <input id="luilei" name="luilei" value={fieldData.luilei} type="text" onChange={handleForm} /> : randomWord.conjugations[randomConjugation].luilei}</div>
                </div>
                <div className='tenseContainer'>
                    <div className='tense'>noi</div>
                    <div className='tenseConjecation'>{randomFormFieldIndexes.indexOf(3) >= 0 ? <input id="noi" name="noi" value={fieldData.noi} type="text" onChange={handleForm} /> : randomWord.conjugations[randomConjugation].noi}</div>
                </div>
                <div className='tenseContainer'>
                    <div className='tense'>voi</div>
                    <div className='tenseConjecation'>{randomFormFieldIndexes.indexOf(4) >= 0 ? <input id="voi" name="voi" value={fieldData.voi} type="text" onChange={handleForm} /> : randomWord.conjugations[randomConjugation].voi}</div>
                </div>
                <div className='tenseContainer'>
                    <div className='tense'>loro</div>
                    <div className='tenseConjecation'>{randomFormFieldIndexes.indexOf(5) >= 0 ? <input id="loro" name="loro" value={fieldData.loro} type="text" onChange={handleForm} /> : randomWord.conjugations[randomConjugation].loro}</div>
                </div>
            </div>
    </>
)}

export default Game;
