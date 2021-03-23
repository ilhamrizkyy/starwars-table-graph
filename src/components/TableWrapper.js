import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';

import TableAndGraph from './Table';
import './TableWrapper.css';

const TableWrapper = () => {
    const history = useHistory()
    const handleBack = () => {
        history.push('/')
    }
    
    return (
        <>  
            <div className = 'button-wrapper'>
                <button className = 'go-back' onClick = { handleBack }>
                    Back
                </button>
            </div>      
            <Switch>
                <Route exact path = '/table'><TableAndGraph></TableAndGraph></Route>
            </Switch>
        </>
    )
}

export default TableWrapper
