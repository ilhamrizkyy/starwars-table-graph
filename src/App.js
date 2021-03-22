import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import TableContent from './components/TableContent'
import TableWrapper from './components/TableWrapper'

function App() {
  return (
    <Router>
      <div className='app-container'>
        <div className='content-title'>React Table</div>
        <div className='content-subtitle'>Star Wars Powered By Swapi API https://swapi.dev/</div>
        <Switch>
          <Route exact path='/'>
            <TableContent />
          </Route>
          <TableWrapper />
        </Switch>
      </div>
    </Router>
  )
}

export default App
