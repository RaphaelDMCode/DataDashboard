import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import StatsChart from "../Components/PokeStats";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import "../App.css";

const DetailView = () => {
    const {name} = useParams();     // It extracts the URL Data
    const [pokemon, setPokemon] = useState(null);

    // Fetching Data
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                // Change Limit to Amount On View
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = await response.json();
                
                setPokemon(data);
            } catch (error) {
                console.error("", error);
            }
        }

        fetchPokemon();
    }, [name]);

    // Loading Pokémons → Something to do with Fetching Data?
    if (!pokemon) {
        return <h2>Loading Pokémons...</h2>
    }

  // Pokémon info Rendering
  return (
    <>
        <Header />
        <NavBar />
        <div className="info-view">
            <div className="info-container">
                {/* Pokémon Image/Sprite */}
                <img 
                    src={pokemon.sprites.front_default} 
                    className="info-sprite"
                />

                {/* Pokémon Info/Entry/Data */}
                <h1 className="info-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>

                <div className="type-container">
                    {pokemon.types.map((t) => (
                        <span
                            key={t.type.name}
                            className={`type-item ${t.type.name}`}
                        >
                            {t.type.name}
                        </span>
                    ))}
                </div>

                <p className="info-stat">Base Exp: {pokemon.base_experience}</p>

                {/* Stat Display */}
                <h2>Pokémon Base Stats</h2>
                <StatsChart stats={pokemon.stats} />

            </div>
        </div>
    </>
  )
}

export default DetailView