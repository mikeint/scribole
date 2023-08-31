import React, { useState, useEffect } from "react";
import './App.scss';
import { Route, HashRouter } from "react-router-dom";
import Login from './pages/Login/Login'; 

import Games from './pages/Games/Games';
import Game1 from './pages/Games/Game1/Game';
import Game2 from './pages/Games/Game2/Game';
import Game3 from './pages/Games/Game3/Game';
import Game4 from './pages/Games/Game4/Game';
import Game5 from './pages/Games/Game5/Game';
import Game6 from './pages/Games/Game6/Game';
import WordGroups from './pages/WordGroups/WordGroups';
import Scores from './pages/Scores/Scores';
import Account from './pages/Account/Account';
import Introduction from './pages/Introduction/Introduction';
import PrivateRoute from './PrivateRoute';
import AuthFunctions from './AuthFunctions';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const App = () => {
    const Auth = new AuthFunctions();

    return (
        <HashRouter>
            {Auth.loggedIn() ? <Redirect to="games" /> : ''}
            <Route exact path="/" render={ () => (<Login />) } />
            <Route exact path='/login' render={ () => (<Login />) } />
            <Route exact path='/#/' render={ () => (<Games />) } />

            <PrivateRoute exact path="/games" component={Games} />
            <PrivateRoute exact path="/wordGroups" component={WordGroups} />
            <PrivateRoute exact path="/scores" component={Scores} />
            <PrivateRoute exact path="/account" component={Account} />
            <PrivateRoute exact path="/introduction" component={Introduction} />

            <PrivateRoute exact path="/game1" component={Game1} />
            <PrivateRoute exact path="/game2" component={Game2} />
            <PrivateRoute exact path="/game3" component={Game3} />
            <PrivateRoute exact path="/game4" component={Game4} />
            <PrivateRoute exact path="/game5" component={Game5} />
            <PrivateRoute exact path="/game6" component={Game6} />

        </HashRouter>
    );
}

export default App;