import React from 'react';
import './Games.scss';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import { Link } from "react-router-dom";

const Games = () => {

    return (
        <>
            <TopBar />
            <NavBar />
            <div className="gamesContainer">
                <Link to="/game1" className="game game1">bad game</Link>
                <Link to="/game2" className="game game2"></Link>
                <Link to="/game3" className="game game3"></Link>
                <Link to="/game4" className="game game4"></Link>
                <Link to="/game5" className="game game5"></Link>
            </div>
        </>
    );
}

export default Games;