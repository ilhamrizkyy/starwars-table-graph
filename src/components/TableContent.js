import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './TableContent.css';

const TableContent = () => {
    return (
        <div className = 'content-button'>
            <Button variant="outline-warning"><NavLink to = '/starwars-table'>Starwars Table</NavLink></Button>
            <Button variant="outline-warning"><NavLink to = '/starwars-graph'>Starwars Graph</NavLink></Button>
        </div>
    )
}

export default TableContent
