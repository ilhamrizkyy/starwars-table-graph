import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TableContent from './components/TableContent';

function App() {
    return (
        <Router>
            <div className = 'app-container'>
                <div className = 'content-title'>Starwars Table and Graph</div>
                <div className = 'content-subtitle'>Data fetched from https://swapi.dev/</div>
                <Switch>
                  <Route exact path = '/'><TableContent></TableContent></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
