import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import TableContent from './components/TableContent'
import TableWrapper from './components/TableWrapper';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <div className='content-title'>React Starwars Table</div>
        <div className='content-subtitle'>Powered By Swapi API https://swapi.dev/</div>
        <Switch>
          <Route exact path='/starwars-table-graph'>
            <TableContent />
          </Route>
          <TableWrapper />
        </Switch>
      </div>
    </Router>
  )
}

export default App
