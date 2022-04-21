import React, { useContext, useState, useEffect } from 'react'
import { searchPokemon } from '../Api'
import FavoriteContext from '../contexts/FavoritesContext'
import Pokedex from './Pokedex'
import loadingAnimation from "../assets/loading-animation.gif"
import sadGif from "../assets/no-favorites-animation.gif"
import './FavoritesPokemons.css'

function FavoritesPokemons() {
    const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext)
    console.log(favoritePokemons)

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchPokemons = async () => {
        try {
            setLoading(false)
            // should i put .reverse() ?
            const favoritePromises = favoritePokemons.map(async (pokemon) => {
                return await searchPokemon(pokemon)
            })

            const results = await Promise.all(favoritePromises)
            setPokemons(results.reverse())
            console.log(favoritePokemons.length)
            setTotalPages(0)
        }
        catch (error) {

        }
    }

    useEffect(() => {
        fetchPokemons()
        console.log(favoritePokemons)
    }, [favoritePokemons])

    return (
        <div>
            {favoritePokemons >= 0
                ?
                (
                    <div className='any-favorite-container'>
                        <h2>Looks like you don't have any favorite pokemon yet.</h2>
                        <img src={sadGif} alt="Sad Gif Pikachu Crying"></img>
                    </div>
                )
                :
                <Pokedex
                    title="Favorites"
                    pokemons={pokemons}
                    loading={loading}
                    totalPages={totalPages + 1}
                    page={page}
                />}

        </div>
    )
}

export default FavoritesPokemons