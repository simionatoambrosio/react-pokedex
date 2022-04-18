
import { useEffect, useState } from 'react';
import { getPokemonData, getPokemons, searchPokemon } from './Api';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import { FavoriteProvider } from './contexts/FavoritesContext';

function App() {
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])

  const [notFound, setNotFound] = useState(false)

  const [favorites, setFavorites] = useState([])

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const itensPerPage = 24

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      setNotFound(false)
      const data = await getPokemons(itensPerPage, itensPerPage * page);
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

  const favoritesKey = "f"

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons()
  }, [])

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if (favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1)
    }
    else {
      updatedFavorites.push(name)
    }
    console.log(updatedFavorites)
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites)) 
    setFavorites(updatedFavorites)
  }

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons()
    }
    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if(!result) {
      setNotFound(true)
    } 
    else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)
  }

  return (
    <FavoriteProvider
      value={{ favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons }}
    >
      <div>
        <Navbar />
        <Searchbar onSearch={onSearchHandler}/>
        {notFound ? (
          <div>
            {console.log('Não encontrei')}
            Pokemon não encontrado!
          </div>
        ) : (
        <Pokedex
          pokemons={pokemons}
          loading={loading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />)}
      </div>
    </FavoriteProvider>
  );
}

export default App;
