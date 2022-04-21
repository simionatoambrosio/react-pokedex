import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Home from './Home'
import FavoriteContext, { FavoriteProvider } from '../contexts/FavoritesContext'
import { useContext, useState, useEffect } from 'react'
import FavoritesPokemons from '../components/FavoritesPokemons'

function Favorites() {
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
        <Navbar/>
        <FavoritesPokemons/>
      </FavoriteProvider>
    </div>
  )
}

export default Favorites