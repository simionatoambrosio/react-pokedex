import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import FavoriteContext, { FavoriteProvider } from '../contexts/FavoritesContext'
import { Link } from 'react-router-dom'
import updateFavoritePokemons from '../App'
import navbarLogo from '../assets/pokeapi-logo.png'

const Navbar = () => {
    const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext)

    return (
        <nav className='navbar'>
            <div>
                <Link to="/">
                    <img
                        alt='PokeAPI logo'
                        src={navbarLogo}
                        className='navbar-img'>
                    </img>
                </Link>
            </div>
            <Link to="/favorites">
                <div className='favorites-container'>
                    {/* <FavoriteProvider value={{ favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons }}> */}
                        💖 <strong>{favoritePokemons.length} Favorites</strong>
                    {/* </FavoriteProvider> */}
                </div>
            </Link>
        </nav>
    )
}

export default Navbar