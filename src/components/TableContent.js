import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './TableContent.css';

const TableContent = () => {
    return (
        <div className = 'content-button'>
            <NavLink to = '/table'><Button variant="outline-warning">Starwars Table</Button></NavLink>
            <NavLink to = '/graph'><Button variant="outline-warning">Starwars Graph</Button></NavLink>
        </div>
    )
}

export default TableContent;
