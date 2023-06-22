import { Divider, UnorderedList, ListItem, Badge, Box, Image, Text, Tag, Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PokemonDetails = () => {
  const search = useLocation();
  const id = search.search.split("=")[1];

  const [pokemonData, setPokemonData] = useState({});
  const [pokemonImg, setPokemonImg] = useState("");
  const [pokemonMove, setPokemonMove] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonStat, setPokemonStat] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchDetails = async () => {
    try {
      const response = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemonData(response.data);
      setPokemonImg(response.data.sprites.front_default);
      setPokemonMove(response.data.moves);
      setPokemonType(response.data.types);
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

  const move = () => {
    if (pokemonMove.length === 0) {
      return null;
    }

    return pokemonMove.map((value) => {
      return (
        <UnorderedList>
          <ListItem key={value.move.name} marginBottom={2} marginRight={2}>
            {value.move.name}
          </ListItem>
        </UnorderedList>
      );
    });
  };

  const type = () => {
    if (pokemonType.length === 0) {
      return null;
    }

    return pokemonType.map((value) => {
      return (
        <UnorderedList>
          <ListItem>
            <Badge colorScheme="purple" key={value.type.name} marginBottom={2} marginRight={2}>
              {value.type.name}
            </Badge>
          </ListItem>
        </UnorderedList>
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

        <Text>Types:</Text>
        {type()}

        <Button size="sm" colorScheme="pink" onClick={onOpen} marginY={8}>
          Click to see {pokemonData.name}'s moves
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Moves</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{move()}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Text>Stats:</Text>
        {stat()}

        <Button colorScheme="teal" size="sm" marginTop={8}>
          See my Pokemon
        </Button>
      </Box>
    </>
  );
};

export default PokemonDetails;
