import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ErrorPage from './Pages/ErrorPage';
import Favorites from './Pages/Favorites';
import Navbar from './components/Navbar';

import { FavoriteProvider } from './contexts/FavoritesContext'

import updateFavoritePokemons from './App'
import PokemonDetails from './Pages/PokemonDetails';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/details/:id" element={<PokemonDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
