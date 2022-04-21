import React from "react";
import Pokemon from "./Pokemon";
import './Pokedex.css'
import Pagination from "./Pagination";
import OptionsMenu from "./OptionsMenu";
import loadingAnimation from "../assets/loading-animation.gif"

const Pokedex = (props) => {
    const { title, pokemons, loading, page, setPage, totalPages } = props;

    // const handleInputPage = () => {
    //     if(page > 0 && page > totalPages) {
    //         setPage(page)
    //     }
    // }

    const firstPageHandler = () => {
        setPage(0)
    }

    const lastPageHandler = () => {
        setPage(totalPages - 1)
    }

    const previousPageHandler= () => {
        if(page > 0) {
            setPage(page-1)
        }
    }
    
    const nextPageHandler= () => {
        if (page+1 !== totalPages) {
            setPage(page+1)
        }
    }


    return (
        <div>
            <div className="pokedex-header">
                <h1>{props.title}</h1>
            </div>
            
            {loading ? (
                <div>
                    <p>Buscando na Pokedex...</p>
                    <img src={loadingAnimation} alt="loading gif"></img>
                </div>)
                :
                <div className="pokedex-grid">
                    {pokemons && pokemons.map((pokemon, index) => {
                        return (
                            <Pokemon key={index} pokemon={pokemon} />
                        )
                    })}
                </div>}
                <Pagination
                page={page+1}
                totalPages={totalPages}
                previousPage={previousPageHandler}
                nextPage={nextPageHandler}
                lastPage={lastPageHandler}
                firstPage={firstPageHandler}
                />
        </div>
    )
}

export default Pokedex;