// ---[Display List of Pokemon]--- //
import { useEffect, useState } from "react";

const List = ({searchTerm, filterType}) => {

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
        const Search = searchTerm ? searchTerm.toLowerCase() : "";
        const MatchedSearch = poke.name.toLowerCase().includes(Search);
        const MatchedTyped = filterType ? poke.types.some(t => t.type.name === filterType) : true;
        return MatchedSearch && MatchedTyped;
    });

    return (
        <div className="list-container">
            <h2 className="list-title">Pokémon List</h2>

            <table className="poke-table">
                <thead>
                    <tr>
                        <th>Sprite</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Base Experiences</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPokemns.map((poke) => (
                        <tr key={poke.id}>
                            <td>
                                <img 
                                    src={poke.sprites.front_default} 
                                    className="list-sprite" 
                                />
                            </td>

                            <td>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</td>

                            <td>
                                {poke.types.map((t) => (
                                    <span 
                                        key={t.type.name} 
                                        className={`type-item ${t.type.name}`}>
                                            {t.type.name}
                                    </span>
                                ))}
                            </td>

                            <td>{poke.base_experience}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List;