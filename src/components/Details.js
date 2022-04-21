import React from 'react'
import { useContext } from 'react';
import FavoriteContext from '../contexts/FavoritesContext';
import './Details.css'
import ProgressBar from './ProgressBar';

function Details(props) {
    const { pokemon } = props;
    console.log(pokemon.name)
    if (!pokemon) {
        console.log('Fodeu')
    }

    // Favorite part
    const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext)
    const onHeartClick = () => {
        updateFavoritePokemons(pokemon.name)
        console.log('Favoritado!!')
    }
    const heart = favoritePokemons.includes(pokemon.name) ? "💖" : "🖤"

    return (
        <div className='details-container'>

            <div className='habilities-content'>
                <h2>Abilities</h2>
                <div>
                    {pokemon.abilities && pokemon.abilities.map((element, idx) => {
                        return (
                            <p key={idx}>
                                {element.ability.name.replace(/-/g, " ")}
                            </p>
                        )
                    })}
                </div>
                <h2>Physical Characteristics</h2>
                <div>
                    <p>Height: {pokemon.height / 10}m</p>
                    <p>Weight: {pokemon.weight / 10}kg</p>
                    <p>Base Experience: {pokemon.base_experience}</p>
                </div>
            </div>

            <div className='profile-content'>
                <img src={pokemon.sprites && (pokemon.sprites.other.home.front_default || pokemon.sprites.front_default)}></img>

                <h1>{pokemon.name && pokemon.name.replace(/-/g, " ")}</h1>
                <div className='pokemon-types-container'>
                    {pokemon.types &&
                        pokemon.types.map((types, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={types.type.name}
                                    id={types.type.name}
                                >
                                    {types.type.name}
                                </div>
                            );
                        })}
                </div>
                <div className='heart-icon-container'>
                    <button className='pokemon-heart-btn' onClick={onHeartClick} title="Favoritar">{heart}</button>
                </div>
            </div>

            <div className='stats-content'>
                <h2>Stats</h2>
                {pokemon.stats &&
                    pokemon.stats.map((stats, idx) => {
                        return (
                            <div
                                key={idx}
                            // className={types.type.name}
                            // id={stats.type.name}
                            >
                                <ProgressBar label={stats.stat.name} value={stats.base_stat} />
                            </div>
                        );
                    })}
            </div>



        </div>
    )
}

export default Details