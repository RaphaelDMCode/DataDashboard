// ---[Displays NavBar Beneath the Header]--- //
import { useState } from "react";

const NavBar = () => {
    return (
        <nav className="navBar-container">
            <ul className="navBar-list">
                <li className="navBar-item">Home</li>
                <li className="navBar-item">About</li>
                <li className="navBar-item">Pokémons</li>
                <li className="navBar-item">Statistics</li>
            </ul>
        </nav>
    )
}

export default NavBar;