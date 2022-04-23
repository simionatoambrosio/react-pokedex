import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import WhoIsThatPokemonScreen from '../components/WhoIsThatPokemonScreen'
import FavoriteContext, { FavoriteProvider } from '../contexts/FavoritesContext'

function WhoIsThatPokemon() {
  // Favorite part
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
        <WhoIsThatPokemonScreen/>
      </FavoriteProvider>
    </div>
  )
}

export default WhoIsThatPokemon