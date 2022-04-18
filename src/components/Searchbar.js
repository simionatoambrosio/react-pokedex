import React from "react";
import { useState, useEffect, useRef } from "react";
import './Searchbar.css'
import {searchPokemon} from '../Api'
import Pokemon from "./Pokemon";

const Searchbar = (props) => {
    const [search, setSearch] = useState("")
    const {onSearch} = props
    const [pokemon, setPokemon] = useState()

    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);

    const [numberOfPokemons, setNumberOfPokemons] = useState()

    const wrapperRef = useRef(null)

    useEffect(() => {
        // let fetchData = fetch(`https://pokeapi.co/api/v2/pokemon/`)
        // .then(response => response.json())
        // .then(data => setNumberOfPokemons(data.count))
        // .catch((error => console.log('Error: fetch all pokemons data')))
        // console.log('n pokes: ', numberOfPokemons)

        // let arrayNumberOfPokemons = numberOfPokemons - 229
        // console.log('array n pokes: ', arrayNumberOfPokemons)
        const allPokemons = [];
        // automatizar o n de pokemons existentes pra criar os arrays
        let biggestPokemonId = 898
        
        const promises = new Array(biggestPokemonId)
        .fill()
        .map((v, i) => 
        fetch(`https://pokeapi.co/api/v2/pokemon-form/${i+1}`))

        Promise.all(promises).then(pokemonArr => {
            return pokemonArr.map(res =>
                 res
                 .json()
                 .then(({ name, sprites: {front_default: sprite}}) => 
                 allPokemons.push({name, sprite})
                 )
            );
    })
    .catch((error => console.log('Error: fetch promises of pokemons data')))
    ;
    setOptions(allPokemons)
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return() => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleClickOutside = event => {
        const {current: wrap} = wrapperRef;
        if(wrap && !wrap.contains(event.target)) {
            setDisplay(false)
        }
    }
    
    const setPokedex = poke => {
        setSearch(poke);
        setDisplay(false)
        onSearch(poke)
    } 

    const onChangeHandler = (e) => {
        setSearch(e.target.value.toLowerCase())
        if (e.target.value.length === 0) {
            setSearch(undefined)
        }
    }

    const onButtonClickHandler = () => {
        onSearch(search)
    }

    // const onSearchHandler = async (pokemon) => {
    //     const result = await searchPokemon(pokemon)
    //     setPokemon(result)
    // }



    return (
        <div>
            <div ref={wrapperRef} className="searchbar-container">
                <div className="searchbar">
                    <input 
                    onClick={() => setDisplay(!display)} placeholder="Buscar pokemon" 
                    onChange={onChangeHandler}
                    value={search}
                    />
                    {display && (
                        <div className="autoContainer" >
                            {options.filter(({name}) => name.indexOf(search.toLowerCase()) > -1)
                            .map((v,i) => {
                                return (
                                <div onClick={() => setPokedex(v.name)} 
                                className="option" 
                                key={i} 
                                tabIndex="0"
                                >
                                    <span>{v.name}</span>
                                    <img src={v.sprite} alt={v.name}></img>
                                </div>
                                );   
                            })}
                        </div>
                    )}
                </div>
                <div className="searchbar-btn">
                    <button onClick={onButtonClickHandler}>Buscar</button>
                </div>
            </div>

        </div>

    )
}

export default Searchbar