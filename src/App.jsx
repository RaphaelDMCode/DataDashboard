import { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import Card from './Components/Cards'
import List from './Components/List'

function App() {
  const [pokemonCount, setPokemonCount] = useState(0);

  const [typeCount, setTypeCount] = useState(0);
  const [moveCount, setMoveCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const [minBaseExp, setMinBaseExp] = useState('');
  const [maxBaseExp, setMaxBaseExp] = useState('');

  useEffect(() => {
    const fetchStat = async () => {
      try {
        // Fetches The Total Aoount of Pokemon
        const PokeResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
        const PokeData = await PokeResponse.json();
        setPokemonCount(PokeData.count);

        // Fetches the Number of Types There Are
        const TypeResponse = await fetch("https://pokeapi.co/api/v2/type");
        const TypeData = await TypeResponse.json();
        setTypeCount(TypeData.count);

        // Fetches the Number of Moves it Has
        const MoveResponse = await fetch("https://pokeapi.co/api/v2/move?limit=1");
        const MoveData = await MoveResponse.json();
        setMoveCount(MoveData.count);

      } catch (error) {
        console.error("", error);
      }
    }

    fetchStat();
  }, [])

  return (
    <div className='Dashboard-Page'>

      {/* ---[Header]--- */}
      <Header />


      {/* ---[NavBar]--- */}
      <NavBar />


      {/* ---[Summary]--- */}
      <section className='summary-section'>
        <div className='summary-card'>
          <h3>Total Pokémon</h3>
          <p>{pokemonCount}</p>
        </div>

        <div className='summary-card'>
          <h3>Total Types</h3>
          <p>{typeCount}</p>
        </div>

        <div className='summary-card'>
          <h3>Total Moves</h3>
          <p>{moveCount}</p>
        </div>
      </section>


      {/* ---[Search Type]--- */}
      <div className='search-container'>

        {/* Search Bar */}
        <input 
          type="text" 
          className='search-bar'
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filtering Type */}
        <select value={filterType} className='filter-dropdown' onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="rock">Rock</option>
          <option value="ground">Ground</option>
          <option value="psychic">Psychic</option>
          <option value="fighting">Fighting</option>
          <option value="ghost">Ghost</option>
          <option value="fairy">Fairy</option>
          <option value="bug">Bug</option>
          <option value="dark">Dark</option>
          <option value="dragon">Dragon</option>
          <option value="ice">Ice</option>
          <option value="poison">Poison</option>
          <option value="steel">Steel</option>
          <option value="normal">Normal</option>
          <option value="flying">Flying</option>
        </select>

        {/* Base Experience - Specific Bounds */}
        <input type="number" className='exp-filter' placeholder='Min BE' value={minBaseExp} onChange={(e) => setMinBaseExp(e.target.value)} />
        <input type="number" className='exp-filter' placeholder='Max BE' value={maxBaseExp} onChange={(e) => setMaxBaseExp(e.target.value)} />

      </div>


      {/* ---[Card]--- */}
      <div className='Temporary-Pokemon'>
      <Card searchTerm={searchTerm} filterType={filterType} minBaseExp={minBaseExp} maxBaseExp={maxBaseExp} />
      </div>


      {/* ---[List]--- */}
      <List searchTerm={searchTerm} filterType={filterType} minBaseExp={minBaseExp} maxBaseExp={maxBaseExp} />


    </div>
  )
}

export default App
