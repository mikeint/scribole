import React, { useState, useEffect } from 'react';
import './Games.scss';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import Introduction from '../../components/Introduction/Introduction';
import { Link } from "react-router-dom";

const Games = () => {
    const [showIntro, setShowIntro] = useState(JSON.parse(localStorage.getItem('showIntro'))??true);

    const neverShowIntro = () => {
        localStorage.setItem('showIntro', false);
        setShowIntro(false);
    }
    const hideIntroForNow = () => setShowIntro(false);

    return (
        <>
            {showIntro ?
                <Introduction neverShowIntro={neverShowIntro} hideIntroForNow={hideIntroForNow} />
            :
                <>
                    <TopBar />
                    <NavBar />
                    <div className="gamesContainer">
                        <Link to="/game1" className="game game1">
                            <div className="playGameText">PLAY</div>
                        </Link>
                        <Link to="/game2" className="game game2">
                            <div className="playGameText">PLAY</div>
                        </Link>
                        <Link to="/game3" className="game game3">
                            <div className="playGameText">PLAY</div>
                        </Link>
                        <Link to="/game4" className="game game4">
                            <div className="playGameText">PLAY</div>
                        </Link>
                        <Link to="/game5" className="game game5">
                            <div className="playGameText">PLAY</div>
                        </Link>
                        <Link to="/game6" className="game game6">
                            <div className="playGameText">PLAY</div>
                        </Link>
                    </div>
                </>
            }
        </>
    );
}

export default Games;
