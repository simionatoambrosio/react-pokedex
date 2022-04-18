import './Pokemon.css'
import React, {useContext} from 'react'
import FavoriteContext from '../contexts/FavoritesContext'

const Pokemon = (props) => {
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext)

    const { pokemon } = props
    const onHeartClick= () => {
        updateFavoritePokemons(pokemon.name)
        console.log('Favoritado!!')
    }
    const heart = favoritePokemons.includes(pokemon.name) ? "💖" : "🖤"
    

    let pokemonCardType = "pokemon-card " 
    //+ pokemon.types[0].type.name 
    
    return (
        <div className={pokemonCardType}>
            <button className='pokemon-heart-btn' onClick={onHeartClick}>{heart}</button>
            <div className='pokemon-card-bottom'>
                <img alt={pokemon.name} src={pokemon.sprites.front_default} />
                <div className='pokemon-card-top'>
                    <div className='pokemon-card-header'>
                        <div className='pokemon-name'>
                            <h2>{pokemon.name}</h2></div>
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



        </div>
    )
}

export default Pokemon