import React, { useState, useEffect } from 'react'
import { searchPokemon } from '../Api'
import './WhoIsThatPokemonScreen.css'


function WhoIsThatPokemonScreen() {
    const [options, setOptions] = useState()
    const [answer, setAnswer] = useState('')
    const [imgStatus, setImageStatus] = useState('')
    const [image, setImage] = useState('')
    const [answerStatus, setAnswerStatus] = useState(null)
    const [timesPlayed, setTimesPlayed] = useState(1)
    const [score, setScore] = useState(0)
    const [showAnswer, setShowAnser] = useState('')

    let imageReveal = 'pokemon-silhouette'
    const getRandomPokemon = async () => {
        // setShowAnser(false)
        setImageStatus(imageReveal)
        var arrayPokemons = []
        for (let cont = 0; cont < 4; cont++) {
            let randomId = Math.floor(Math.random(1, 151) * (151 - 1) + 1);
            var pokemon = await searchPokemon(randomId)
            // console.log(pokemon)
            arrayPokemons.push(pokemon.name)
        }
        setOptions(arrayPokemons)

        console.log('Original: ', arrayPokemons)

        const shufflePokemons = (array) => {
            let indice = array.length

            while (indice) {
                const indiceAleatorio = Math.floor(Math.random() * indice--);
                [array[indice], array[indiceAleatorio]] = [array[indiceAleatorio], array[indice]];
            }
            console.log('Shuffled: ', array)
        }

        const randomRightAnswer = (options) => {
            let IndexRightAnswer = Math.floor(Math.random() * (4 - 0) + 0);
            console.log('Index right answer: ', IndexRightAnswer)
            let rightAnswer = options[IndexRightAnswer]
            setAnswer(rightAnswer)
            console.log('RightAnswer:', rightAnswer)
            const pokemonImageAnswer = async (name) => {
                const data = await searchPokemon(name)
                const image = data.sprites.other.home.front_default
                setImage(image)
            }
            pokemonImageAnswer(rightAnswer)
        }

        shufflePokemons(arrayPokemons)
        randomRightAnswer(arrayPokemons)
    }

    const verifyAnswer = async (choice) => {
        if (choice === answer) {
            console.log('ACERTOU!')
            setAnswerStatus('Acertou!')
            setScore(score + 1)
        }
        else {
            console.log('ERRROU!')
            setAnswerStatus('Errou!')
        }
        setAnswer('')
        setShowAnser(answer)
        imageReveal = 'pokemon-reveal'
        setImageStatus(imageReveal)
    }
    const handleAnswer = async (e) => {
        verifyAnswer(e.target.value)
    }

    const playAgain = async (e) => {
        setTimesPlayed(timesPlayed + 1)
        setAnswerStatus(null)
        setShowAnser('')
        // setShowAnser('')
        // setShowAnser(true)
    }

    useEffect(() => {
        getRandomPokemon()
        console.log('i fire once');
    }, [timesPlayed])

    return (
        <div>
            <header className='header'>
                <h1>Who is that Pokemon?</h1>
                <div className='score-container'>
                    <div className='score'>
                        <h3>Score: {score} / {timesPlayed}</h3>
                    </div>
                </div>
            </header>
            <div className='pokemon-image-container'>
                <img className={`pokemon-image ${imgStatus && imgStatus}`} alt="Hidden Pokemon" src={image && image}></img>
            </div>


            <div className='button-container'>

                <div className='button-colum'>
                    <button value={options && options[0]} onClick={handleAnswer}>{options && options[0]}</button>
                    <button value={options && options[1]} onClick={handleAnswer}>{options && options[1]}</button>
                </div>
                <div className='button-colum'>
                    <button value={options && options[2]} onClick={handleAnswer}>{options && options[2]}</button>
                    <button value={options && options[3]} onClick={handleAnswer}>{options && options[3]}</button>
                </div>
                {/* {console.log(options && options)} */}
            </div>
            {/* <div className='answer-container'>
                {answerStatus}
            </div> */}
            <h2 className='hidden-answer'>{showAnswer !== '' && showAnswer}</h2>
            {(showAnswer != null) ? (<div className='play-again-container'>
                <button onClick={playAgain} className="button-play-again">Play Again</button>
            </div>) : (<div></div>)}


        </div>
    )
    // <div>WhoIsThatPokemonScreen


    // </div>

    // )
}

export default WhoIsThatPokemonScreen