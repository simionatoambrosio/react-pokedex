import React from 'react'

const Navbar = () => {
    const navbarLogo = 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'
    return (
        <nav>
            <div>
                <img
                    alt='PokeAPI logo'
                    src={navbarLogo}
                    className='navbar-img'>
                </img>
            </div>
        </nav>
    )
}

export default Navbar