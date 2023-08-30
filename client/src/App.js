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
import PrivateRoute from './PrivateRoute';
import AuthFunctions from './AuthFunctions';

const App = () => {
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');
    const Auth = new AuthFunctions();
    
    useEffect(() => {
        setUser(Auth.getUser() || "")
        setToken(Auth.getToken() || "")
    }, []);

    return (
        <HashRouter>
            <Route exact path="/" render={ () => (<Login />) } />
            <Route exact path='/login' render={ () => (<Login />) } />

            {/* <Route exact path="/games" component={Games} />
            <Route exact path="/wordGroups" component={WordGroups} />
            <Route exact path="/scores" component={Scores} />
            <Route exact path="/account" component={Account} />

            <Route exact path="/game1" component={Game1} />
            <Route exact path="/game2" component={Game2} />
            <Route exact path="/game3" component={Game3} />
            <Route exact path="/game4" component={Game4} />
            <Route exact path="/game5" component={Game5} />
            <Route exact path="/game6" component={Game6} /> */}

            <PrivateRoute exact path="/games" component={Games} user={user} token={token}/>
            <PrivateRoute exact path="/wordGroups" component={WordGroups} user={user} token={token}/>
            <PrivateRoute exact path="/scores" component={Scores} user={user} token={token}/>
            <PrivateRoute exact path="/account" component={Account} user={user} token={token}/>

            <PrivateRoute exact path="/game1" component={Game1} user={user} token={token}/>
            <PrivateRoute exact path="/game2" component={Game2} user={user} token={token}/>
            <PrivateRoute exact path="/game3" component={Game3} user={user} token={token}/>
            <PrivateRoute exact path="/game4" component={Game4} user={user} token={token}/>
            <PrivateRoute exact path="/game5" component={Game5} user={user} token={token}/>
            <PrivateRoute exact path="/game6" component={Game6} user={user} token={token}/>

        </HashRouter>
    );
}

export default App;