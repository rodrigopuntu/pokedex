// App.js (o tu archivo principal)
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pokedex from './components/Pokedex/Pokedex';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/pokemon/:pokemonName" component={PokemonDetails} />
        <Route path="/pokedex" component={Pokedex} />
      </Switch>
    </Router>
  );
};

export default App;

