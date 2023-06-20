import { Image, Box, Card, CardBody, Text } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PokemonList = () => {
  const [pokemonsData, setPokemonsData] = useState([]);
  const navigate = useNavigate();

  const fetchPokemons = async () => {
    try {
      const response = await Axios.get(`https://pokeapi.co/api/v2/pokemon/`);
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

  const showPokemons = () => {
    return pokemonsData.map((pokemon) => {
      return (
        <Card onClick={() => navigate("/pokemon-details")} border="1px" key={pokemon.name} marginY={4}>
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
      </Box>
    </>
  );
};

export default PokemonList;
