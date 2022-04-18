
import { useEffect, useState } from 'react';
import { getPokemonData, getPokemons } from './Api';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';

function App() {
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const itensPerPage = 24

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const data = await getPokemons(itensPerPage, itensPerPage * page );
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      });

      const results = await Promise.all(promises)
      setPokemons(results);
      setLoading(false)
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (error) {
      console.log('Fetch pokemons error: ', error)
    }
  }
  useEffect(() => {
    //componente é iniciado
    console.log('carregou')
    fetchPokemons()
    return () => {
      //componente é destruido

    }
    // dentro do array há a lista de dependências, se mudar, ele deve atualizar
  }, [page])

  return (
    <div>
      <Navbar />
      <Searchbar />
      <Pokedex
        pokemons={pokemons}
        loading={loading}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default App;
