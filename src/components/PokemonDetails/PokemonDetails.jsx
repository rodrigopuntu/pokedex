// PokemonDetailsPage.js
import React, { useEffect, useState } from 'react';
import { Link, Switch, Route, useParams } from 'react-router-dom';
import '../Pokedex/Pokedex.css';
import './PokemonDetails.css';
import { Button } from 'react-bootstrap'

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error(`Error al obtener los detalles de ${pokemonName}`, error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  if (!pokemonDetails) {
    return <div>Cargando detalles...</div>;
  }

  return (
    <div className='container-details'>
      <Link to={`/pokedex`}>
                    <Button variant="primary">⬅️ Atrás</Button>
                  </Link>
      <div  className='pokemon-card card-title'>
      <h2>{pokemonDetails.name} Detalles</h2>
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      {/* Muestra información detallada del Pokémon según tus necesidades */}
      {/* <pre>{JSON.stringify(pokemonDetails, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default PokemonDetails;
