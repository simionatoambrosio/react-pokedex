import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import Details from '../components/Details'
import { FavoriteProvider } from '../contexts/FavoritesContext'

export function PokemonDetails() {
  const [pokemon, setPokemon] = useState({}) //{}?
  const { id } = useParams();

  const fetchPokemonById = async (id) => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${id}`
      const response = await fetch(url)
      const dataResponse = await response.json()
      setPokemon(dataResponse)
      console.log(pokemon)
    }
    catch (error) {
      console.log('Erro no fetch data API: ', error)
    }
  }

  useEffect(() => {
    fetchPokemonById(id)
  }, [])

  // Favorite Provider codes: 
  const [favorites, setFavorites] = useState([])
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


  return (
    <div>
      <FavoriteProvider value={{ favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons }}>
        <Navbar />
        <Details pokemon={pokemon} />
      </FavoriteProvider>
    </div>
  )
}

export default PokemonDetails