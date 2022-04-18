import React, { useContext } from 'react'
import FavoriteContext from '../contexts/FavoritesContext'

const Navbar = () => {
    const navbarLogo = 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'
    const {favoritePokemons} = useContext(FavoriteContext)
    return (
        <nav>
            <div>
                <img
                    alt='PokeAPI logo'
                    src={navbarLogo}
                    className='navbar-img'>
                </img>
            </div>
            <div>
                {favoritePokemons.length}💖
            </div>
        </nav>
    )
}

export default Navbar