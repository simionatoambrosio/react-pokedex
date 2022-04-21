import React from 'react'
import Pokedex from '../components/Pokedex'
import Searchbar from '../components/Searchbar'

import { useEffect, useState } from 'react';
import { getPokemonData, getPokemons, searchPokemon } from '../Api';
import Navbar from '../components/Navbar';
import { FavoriteProvider } from '../contexts/FavoritesContext';
import OptionsMenu from '../components/OptionsMenu';

function Home() {
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])

  const [notFound, setNotFound] = useState(false)

  const [favorites, setFavorites] = useState([])

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [searching, setSearching] = useState(false);

  const itensPerPage = 12

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      });
      const results = await Promise.all(promises)
      setNotFound(false)
      setLoading(false)
      setPokemons(results);
      setLoading(false)
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (error) {
      console.log('Fetch pokemons error: ', error)
    }
  }



  useEffect(() => {
    //componente é iniciado
    if (!searching) {
      fetchPokemons()
    }
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
    setSearching(true)
    const result = await searchPokemon(pokemon)
    if (!result) {
      setNotFound(true)
      setLoading(false)
      return;
    }
    else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)
    setSearching(false)
  }

  return (
    <div>
      {/* <FavoriteProvider
        value={{ favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons }}
      > */}
      <Navbar />

      <Searchbar onSearch={onSearchHandler} />
      
      {/* Need to fix it -> <OptionsMenu/> */}
      {notFound ? (
        <div>
          {console.log('Pokemon não encontrado!')}
          Pokemon não encontrado!
        </div>
      ) : (
        <Pokedex
          title="Pokedex"
          pokemons={pokemons}
          loading={loading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />)}
      {/* </FavoriteProvider> */}
    </div>
  )
}

export default Home