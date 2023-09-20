import React from "react";
import { NavLink } from 'react-router-dom'

import './NavLinks.css'

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to='/' exact>ALL USERS</NavLink>
        </li>
        <li>
            <NavLink to='/u1/places'>MY PLACE</NavLink>
        </li>
        <li>
            <NavLink to='/places/new'>ADD PLACE</NavLink>
        </li>
        <li>
            <NavLink to='/auth'>AUTHENTICATION</NavLink>
        </li>
        
    </ul>
};

export default NavLinks;