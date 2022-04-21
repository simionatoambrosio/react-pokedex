import './Pokemon.css'
import React, { useContext } from 'react'
import FavoriteContext from '../contexts/FavoritesContext'
import { Link } from "react-router-dom";

const Pokemon = (props) => {
    const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext)

    const { pokemon } = props
    const onHeartClick = () => {
        updateFavoritePokemons(pokemon.name)
        console.log('Favoritado!!')
    }
    const heart = favoritePokemons.includes(pokemon.name) ? "💖" : "🖤"

    return (
        <div className="pokemon-card ">
            <button className='pokemon-heart-btn' onClick={onHeartClick} title="Favoritar">{heart}</button>
            <Link to={'/details/' + pokemon.id} props={pokemon}>
                <div className='pokemon-card-header'>
                    <img alt={pokemon.name} src={pokemon.sprites && (pokemon.sprites.other.home.front_default || pokemon.sprites.front_default)} />
                    <div className='pokemon-card-top'>
                        <div className='pokemon-card-bottom'>
                            <div className='pokemon-name'>
                                <h2>{pokemon.name.replace(/-/g, " ")}</h2></div>
                            <div>#{pokemon.id}</div>
                        </div>
                        <div className='pokemon-types'>
                            <div className='pokemon-type'>
                                {pokemon.types.map((type, index) => {
                                    return (
                                        <div key={index} className={type.type.name}>
                                            {type.type.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </Link>


        </div>
    )
}

export default Pokemon