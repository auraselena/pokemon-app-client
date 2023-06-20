import { Box, Image, Text, Tag, Flex, Button } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PokemonDetails = () => {
  const search = useLocation();
  const id = search.search.split("=")[1];

  const [pokemonData, setPokemonData] = useState({});
  const [pokemonImg, setPokemonImg] = useState("");
  const [pokemonStat, setPokemonStat] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemonData(response.data);
      setPokemonImg(response.data.sprites.front_default);
      setPokemonStat(response.data.stats);
    } catch (error) {
      console.log(`Oops.. Error ${error.message}`);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const stat = () => {
    if (pokemonStat.length === 0) {
      return null;
    }

    return pokemonStat.map((value) => {
      return (
        <Flex>
          <Tag key={value.stat.name} marginBottom={2} marginRight={2}>
            {value.stat.name}
          </Tag>
          <Tag key={value.base_stat} marginBottom={2}>
            {value.base_stat}
          </Tag>
        </Flex>
      );
    });
  };

  return (
    <>
      <Box className="pokemon-pics" display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingX={8} paddingY={8} w={[300, 400, 500]}>
        <Text marginTop={8} fontSize="sm">
          Catch the Pokemon before it escapes!
        </Text>
      </Box>
      <Box className="pokemon-pics" display="flex" flexDirection="column" alignItems="center" justifyContent="center" paddingX={8} w={[300, 400, 500]}>
        <Text as="b" fontSize="md">
          {pokemonData.name}
        </Text>
        <Image boxSize="150px" src={pokemonImg} alt="" />
      </Box>
      <Box className="pokemon-pics" display="flex" flexDirection="column" alignItems="center" justifyContent="start" paddingX={8} w={[300, 400, 500]}>
        <Button colorScheme="teal" size="sm" marginBottom={8}>
          Catch {pokemonData.name}
        </Button>
        {stat()}
      </Box>
    </>
  );
};

export default PokemonDetails;
