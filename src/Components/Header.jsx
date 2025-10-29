// ---[Displays the Title and the Logo at the Top of the Dashboard Page]--- //
import { useState } from "react";

const Header = () => {
    return (
        <header className="header-container">

            {/* ---[Logo]--- */}
            <div className="header-logo">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/500px-Pok%C3%A9_Ball_icon.svg.png" 
                    className="logo-img"
                />
            </div>

            {/* ---[Title]--- */}
            <h1 className="header-title">Pokémon Database</h1>

        </header>
    )
}

export default Header;