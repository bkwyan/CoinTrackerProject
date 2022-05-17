import React from 'react';
import { NavLink } from 'react-router-dom';
//import {Link, NavLink} from 'react-router-dom';
import { NavBarContainer, NavItem, NavMenu, NavLinks, Nav} from '../styles/NavBarStyle';


const NavBar = () => {
    return (
        <Nav>
            <NavBarContainer>
                <NavMenu>
                    <NavItem>
                        <NavLinks to='/'>Home</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='transactions'>Transactions</NavLinks>
                    </NavItem>
                </NavMenu>
            </NavBarContainer>
        </Nav>
    );
}

// <div>
        //     <li>
        //         <Link to="/">Home</Link>
        //     </li>
        //     <li>
        //         <Link to="/transactions">Transactions</Link>
        //     </li>
        // </div>

export default NavBar;