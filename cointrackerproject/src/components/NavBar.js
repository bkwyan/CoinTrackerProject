import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/transactions">Transactions</Link>
            </li>
        </div>
    );
}

export default NavBar;