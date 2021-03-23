import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './TableContent.css';

const TableContent = () => {
    return (
        <div className = 'content-button'>
            <NavLink to = '/table'><Button variant="outline-warning"> Show Starwars Table and Graph</Button></NavLink>
        </div>
    )
}

export default TableContent;
