// ---[Displays Pokémons Informations]--- //
import { useEffect, useState } from "react";

const Card = ({searchTerm, filterType}) => {

    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                // Change Limit to Amount On View
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
                const data = await response.json();

                const DataPokemon = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        return res.json();
                    })
                )

                setPokemonList(DataPokemon);
            } catch (error) {
                console.error("", error);
            }
        }

        fetchPokemons();
    }, []);
    
    // ---[Filter Search]--- //
    const filteredPokemns = pokemonList.filter(poke => {
        const MatchedSearch = poke.name.toLowerCase().includes(searchTerm.toLowerCase());
        const MatchedTyped = filterType ? poke.types.some(t => t.type.name === filterType) : true;
        return MatchedSearch && MatchedTyped;
    });

    return (
        <div className="card-layout-grid">
            {filteredPokemns.map((poke) => (
                <div className="card-container" key={poke.id}>

                    {/* ---[Pokemon Sprite]--- */}
                    <img 
                        src={poke.sprites.front_default} 
                        className="card-sprite" 
                    />

                    {/* ---[Pokemon Data]--- */}
                    <div className="card-data">
                        <h3 className="card-name">{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h3>
                        
                        <div className="type-container">
                            {poke.types.map((t) => (
                                <span 
                                    key={t.type.name} 
                                    className={`type-item ${t.type.name}`}>
                                    {t.type.name}
                                </span>
                            ))}
                        </div>

                        <p className="card-stat">Base Experiences: {poke.base_experience}</p>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Card;