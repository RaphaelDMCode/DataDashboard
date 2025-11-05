// ---[Displays NavBar Beneath the Header]--- //
import { useState } from "react";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navBar-container">
            <ul className="navBar-list">
                <li> <Link to="/" className="navBar-item">Home</Link> </li>
                <li> <Link to="/" className="navBar-item">About</Link> </li>
                <li> <Link to="/" className="navBar-item">Pokémons</Link> </li>
                <li> <Link to="/" className="navBar-item">Statistics</Link> </li>
            </ul>
        </nav>
    )
}

export default NavBar;