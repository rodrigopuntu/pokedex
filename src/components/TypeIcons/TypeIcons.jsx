import React from 'react';
import Fuego from '../../images/fire.png';
import Agua from '../../images/water.png';
import Planta from '../../images/grass.png';
import Bug from '../../images/bug.png';
import Dark from '../../images/dark.png';
import Dragon from '../../images/dragon.png';
import Electric from '../../images/electric.png';
import Fairy from '../../images/fairy.png';
import Fighthing from '../../images/fighthing.png';
import Flying from '../../images/flying.png';
import Ghost from '../../images/ghost.png';
import Ground from '../../images/ground.png';
import Ice from '../../images/ice.png';
import Normal from '../../images/normal.png';
import Poison from '../../images/poison.png';
import Psychic from '../../images/psychic.png';
import Rock from '../../images/rock.png';
import Steel from '../../images/steel.png';
import '../Pokedex/Pokedex.css'

const TypeIcon = ({ type }) => {
    let typeImage;
    switch (type) {
        case 'fire':
            typeImage = Fuego;
            break;
        case 'water':
            typeImage = Agua;
            break;
        case 'grass':
            typeImage = Planta;
            break;
        case 'bug':
            typeImage = Bug;
            break;
        case 'dark':
            typeImage = Dark;
            break;
        case 'dragon':
            typeImage = Dragon;
            break;
        case 'electric':
            typeImage = Electric;
            break;
        case 'fairy':
            typeImage = Fairy;
            break;
        case "fighting":
            typeImage = Fighthing;
            break;
        case 'flying':
            typeImage = Flying;
            break;
        case 'ghost':
            typeImage = Ghost;
            break;
        case 'ground':
            typeImage = Ground;
            break;
        case 'ice':
            typeImage = Ice;
            break;
        case 'normal':
            typeImage = Normal;
            break;
        case 'poison':
            typeImage = Poison;
            break;
        case 'psychic':
            typeImage = Psychic;
            break;
        case 'rock':
            typeImage = Rock;
            break;
        case 'steel':
            typeImage = Steel;
            break;
        default:
            typeImage = null;
    }

    // Renderiza la imagen
    return typeImage && <img src={typeImage} alt={type} className="type-icon" />;
};

export default TypeIcon;
