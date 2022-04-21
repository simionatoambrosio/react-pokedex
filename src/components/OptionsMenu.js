import React from 'react'
import { useState } from 'react'
import { getAllPokemonsOfType, searchPokemon } from '../Api'
import './OptionsMenu.css'
function OptionsMenu(pokemonType) {
    const [pokemonsOfType, setPokemonsOfType] = useState([])
    const [pokemons, setPokemons] = useState([])

    const onButtonTypeClickHandler = async (pokemonType) => {
        const result = await getAllPokemonsOfType(pokemonType)
        setPokemonsOfType(result)
        console.log("Searching type pokemons: ", pokemonsOfType)
        console.log(pokemonsOfType.pokemon)

        // pokemonsOfType.pokemon.forEach(element => {
        //     // console.log(element.pokemon.name)

        //     searchPokemon(element.pokemon.name)
        //     setPokemons(result)
        //     console.log(pokemons)
        // });

    }

    return (
        <div className='options-menu-container'>
            <ul>
                <button onClick={onButtonTypeClickHandler} pokemonType={1} className="normal">Normal</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={2} className="fighting">Fighting</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={3} className="flying">Flying</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={4} className="poison">Poison</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={5} className="ground">Ground</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={6} className="rock">Rock</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={7} className="bug">Bug</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={8} className="ghost">Ghost</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={9} className="steel">Steel</button>
            </ul>
            <ul>
                <button onClick={onButtonTypeClickHandler} pokemonType={10} className="fire">Fire</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={11} className="water">Water</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={12} className="grass">Grass</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={13} className="electric">Electric</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={14} className="psychic">Psychic</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={15} className="ice">Ice</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={16} className="dragon">Dragon</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={17} className="dark">Dark</button>
                <button onClick={onButtonTypeClickHandler} pokemonType={18} className="fairy">Fairy</button>
            </ul>
        </div>
    )
}

export default OptionsMenu