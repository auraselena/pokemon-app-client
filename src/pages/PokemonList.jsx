import { Image, Box, Card, CardBody, Text } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const PokemonList = () => {
  const [pokemonsData, setPokemonsData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(pokemonsData.length / itemsPerPage);

  const fetchPokemons = async () => {
    try {
      const response = await Axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`);
      const pokemons = response.data.results;

      const pokemonData = [];
      for (const pokemon of pokemons) {
        const pokemonUrl = await Axios.get(pokemon.url);
        const pokemonDetails = pokemonUrl.data;
        pokemonData.push(pokemonDetails);
      }
      setPokemonsData(pokemonData);
    } catch (error) {
      alert(`Oops... ${error.message}`);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const showPokemons = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedPokemons = pokemonsData.slice(startIndex, endIndex);

    return displayedPokemons.map((pokemon) => {
      return (
        <Card onClick={() => navigate(`/pokemon-details?id=${pokemon.id}`)} border="1px" key={pokemon.name} marginY={4}>
          <CardBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Image boxSize="150px" src={pokemon.sprites.front_default} alt={pokemon.name} />
            <Text as="b" fontSize="md">
              {pokemon.name}
            </Text>
          </CardBody>
        </Card>
      );
    });
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <>
      <Box className="pokemon-pics" display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingX={8} paddingY={8} w={[300, 400, 500]}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" alt="Pokemon Logo" />
        <Image src="https://pngimg.com/uploads/pokemon/pokemon_PNG98.png" alt="Some Pokemons" />
        <Text marginTop={8}>Go get your Pokemon!</Text>
      </Box>
      <Box className="pokemon-pics" paddingX={8} w={[300, 400, 500]}>
        {showPokemons()}
        <ReactPaginate
          className="pagination"
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex"}
          activeClassName={"active"}
          previousLinkClassName={"previous"}
          nextLinkClassName={"next"}
          disabledClassName={"disabled"}
        />
      </Box>
    </>
  );
};

export default PokemonList;
