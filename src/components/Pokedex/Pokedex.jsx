import React, { useEffect, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../images/logo.svg';
import GBA from '../../images/8bits.png';
import HD from '../../images/32bits.png';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import TypeIcon from '../TypeIcons/TypeIcons';

const Pokedex = () => {
  const [allPokemonList, setAllPokemonList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showOriginalImages, setShowOriginalImages] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50000');
        const data = await response.json();

        const allPokemon = await Promise.all(data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          const pokemonImageOriginal = pokemonData.sprites.front_default
          const imageUrl = `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`;
          const image = showOriginalImages
            ? pokemonImageOriginal
            : await checkImageAvailability(imageUrl)
              ? imageUrl
              : pokemonImageOriginal;
          
          const noImage = 'https://r2.easyimg.io/u0k0s39qc/sticker-png-pikachu-crying-pokemon-pikachu.png'

          return {
            name: pokemon.name,
            image: image ? image : noImage,
            details: pokemonData,
          };
        }));

        setAllPokemonList(allPokemon);
        const totalPokemonCount = data.count;
        const totalPages = Math.ceil(totalPokemonCount / itemsPerPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error al obtener la lista completa de Pokémon', error);
        setAllPokemonList([]);
        setTotalPages(1);
      }
    };

    fetchAllPokemon();
  }, [showOriginalImages]);

  const fetchFilteredPokemon = () => {
    // Filtrar por término de búsqueda
    const filteredBySearch = searchTerm
      ? allPokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : allPokemonList;

    // Filtrar por tipos seleccionados
    const filteredByType = selectedTypes.length > 0
      ? filteredBySearch.filter((pokemon) => pokemon.details.types.some((type) => selectedTypes.includes(type.type.name)))
      : filteredBySearch;

      // Calcular el rango de Pokémon a mostrar en la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const limitedPokemonList = filteredByType.slice(startIndex, endIndex);

    setPokemonList(limitedPokemonList);
    const totalPages = Math.ceil(filteredByType.length / itemsPerPage);
    setTotalPages(totalPages);
  };

  useEffect(() => {
    fetchFilteredPokemon();
  }, [currentPage, searchTerm, showOriginalImages, allPokemonList, selectedTypes]);

  const checkImageAvailability = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageSelect = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const toggleImageType = () => {
    setShowOriginalImages((prev) => !prev);
  };

  const maxDisplayedPageNumbers = 5;

  const getPageNumbers = () => {
    const totalPageNumbers = Math.min(totalPages, maxDisplayedPageNumbers);
    const pages = Array.from({ length: totalPageNumbers }, (_, i) =>
      currentPage <= Math.floor(maxDisplayedPageNumbers / 2)
        ? i + 1
        : currentPage >= totalPages - Math.floor(maxDisplayedPageNumbers / 2)
        ? totalPages - totalPageNumbers + i + 1
        : currentPage - Math.floor(maxDisplayedPageNumbers / 2) + i
    );
    return pages;
  };

  const handleTypeSelect = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes((prevTypes) => prevTypes.filter((prevType) => prevType !== type));
    } else {
      setSelectedTypes((prevTypes) => [...prevTypes, type]);
    }
  };

  const getAllPokemonTypes = () => {
    // Obten todos los tipos únicos de Pokémon de la lista completa
    const allTypes = allPokemonList
      .flatMap((pokemon) => pokemon.details.types.map((type) => type.type.name))
      .filter((value, index, self) => self.indexOf(value) === index);
    return allTypes;
  };

  

  return (
    <div className='my-3 pokedex-container d-flex flex-wrap'>
      <Container className="my-2">
        <div className='poke-logo'>
          <img src={Logo} alt="poke-logo" />
        </div>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Form className="search-bar">
              <Form.Control
                type="text"
                placeholder="Buscar Pokémon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
          </Col>
        </Row>

        <div className="filter-buttons">
          <Button variant="warning" onClick={() => setSelectedTypes([])}>
            Todos
          </Button>
          {getAllPokemonTypes().map((type) => (
            <Button
              key={type}
              variant={selectedTypes.includes(type) ? "danger" : "warning"}
              onClick={() => handleTypeSelect(type)}
            >
              <TypeIcon type={type} />
            </Button>
          ))}
        </div>

        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={8} className="my-3 text-center">
            <Button className='buttonImages' variant='none' onClick={toggleImageType}>
              <img src={showOriginalImages ? HD : GBA} alt="" />
            </Button>
          </Col>
        </Row>

        <div className='pokedex-card-container'>
          {pokemonList.map((pokemon, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="my-3">
              <Card className="pokemon-card">
                <Card.Img
                  variant="top"
                  src={pokemon.image}
                  alt={pokemon.name}
                  className={`pokemon-image ${showOriginalImages ? 'original-image' : ''}`}
                />
                <Card.Body className="text-center">
                  <Card.Title>{pokemon.name}</Card.Title>
                  <Link to={`/pokemon/${pokemon.name}`}>
                    <Button variant="danger">Ver Detalles</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </div>

        <Switch>
          <Route path="/pokemon/:name" component={PokemonDetails} />
        </Switch>

        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={8} className="my-3 text-center">
            {(!searchTerm) && (
              <Pagination>
                <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
                {getPageNumbers().map((page) => (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageSelect(page)}
                  >
                    {page}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
              </Pagination>
            )}
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default Pokedex;
