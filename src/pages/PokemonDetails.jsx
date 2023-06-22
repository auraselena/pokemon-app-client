import { Input, useToast, UnorderedList, ListItem, Badge, Box, Image, Text, Tag, Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PokemonDetails = () => {
  const search = useLocation();
  const id = search.search.split("=")[1];
  const navigate = useNavigate();

  const [pokemonData, setPokemonData] = useState({});
  const [pokemonImg, setPokemonImg] = useState("");
  const [pokemonMove, setPokemonMove] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonStat, setPokemonStat] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [UID, setUID] = useState(0);
  const { isOpen: isMovesOpen, onOpen: onMovesOpen, onClose: onMovesClose } = useDisclosure();
  const toast = useToast();

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToastClose = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload(false);
  };

  const handleCatchButton = async () => {
    try {
      const response = await Axios.post("http://localhost:7000/pokemon/catch", {
        pokemonId: id,
        nickname: pokemonData.name,
      });
      console.log("response", response);
      if (response.data.success) {
        setUID(response.data.uniqueID);
        toast({
          title: `Catch Pokemon success!`,
          description: `${response.data.message}`,
          status: "success",
          duration: 9000,
          isClosable: true,
          onCloseComplete: handleToastClose,
        });
      }
    } catch (error) {
      console.error();
    }
  };

  const handleAddName = async () => {
    try {
      const name = await Axios.post(`http://localhost:7000/pokemon/add-name`, {
        UID,
        pokemonName,
      });
      toast({
        title: `Name Pokemon success!`,
        description: `${name.data.message}`,
        status: "success",
        duration: 9000,
        isClosable: true,
        onCloseComplete: () => navigate("/"),
      });
    } catch (error) {
      console.error();
    }
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
        <Button colorScheme="teal" size="sm" marginBottom={8} onClick={() => handleCatchButton()}>
          Catch {pokemonData.name}
        </Button>

        <Text>Types:</Text>
        {type()}

        <Button size="sm" colorScheme="pink" onClick={onMovesOpen} marginY={8}>
          Click to see {pokemonData.name}'s moves
        </Button>

        <Modal isOpen={isMovesOpen} onClose={onMovesClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Moves</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{move()}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onMovesClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Text>Stats:</Text>
        {stat()}

        <Button colorScheme="teal" size="sm" marginY={8}>
          See my Pokemon list
        </Button>
        <Button variant="link" colorScheme="teal" size="sm" onClick={() => navigate("/")}>
          Back to see other Pokemons
        </Button>
      </Box>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wanna give your Pokemon a nickname?</ModalHeader>
          <ModalBody>
            <Input placeholder="Type its name..." onChange={(e) => setPokemonName(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => handleAddName()}>
              Name it.
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PokemonDetails;
