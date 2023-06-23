import { Box, Image, Text, Card, CardBody, Button, Flex, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


const MyPokemon = () => {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [UID, setUID] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const fetchPokemons = async () => {
    try {
      const response = await Axios.get(`http://localhost:7000/pokemon/pokemon`);
      const pokemons = response.data.data;

      if (pokemons !== []) {
        const pokemonData = [];
        for (const pokemon of pokemons) {
          const pokemonSource = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}
          `);
          const pokemonPic = pokemonSource.data.sprites;
          pokemon.pic = pokemonPic;
          pokemonData.push(pokemon);
        }
        setPokemonsData(pokemonData);
      } else if (pokemons === []) {
        toast({
          title: `You haven't catch any Pokemon yet`,
          description: `Wanna try catch one?`,
          status: "success",
          duration: 9000,
          isClosable: true,
          onCloseComplete: () => navigate("/"),
        });
      }
    } catch (error) {
      toast({
        title: `Oops... something is wrong`,
        description: `We're still figuring it out.`,
        status: "warning",
        duration: 4000,
        isClosable: true,
        onCloseComplete: () => navigate("/"),
      });
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleReleaseButton = async () => {
    try {
      const response = await Axios.delete(`http://localhost:7000/pokemon/release?id=${UID}`);
      // console.log("r", response);
      if (response.success === false) {
        toast({
          title: `${response.message}`,
          description: `Please try again ;)`,
          status: "warning",
          duration: 4000,
          isClosable: true,
          onCloseComplete: () => navigate("/"),
        });
      } else if (response.success) {
        toast({
          title: `Release successful!`,
          description: `Wanna try to catch other?`,
          status: "success",
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => navigate("/"),
        });
      }
    } catch (error) {
      console.error();
    }
  };

  const showPokemons = () => {
    return pokemonsData.map((pokemon) => {
      return (
        <Card border="1px" key={pokemon.nickname} marginY={4}>
          <CardBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Image boxSize="150px" src={pokemon.pic.front_default} alt={pokemon.nickname} />
            <Text as="b" fontSize="md">
              {pokemon.nickname}
            </Text>
            <Flex>
              <Button size="sm" marginRight={2} marginTop={3}>
                Rename
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                marginTop={3}
                onClick={() => {
                  onOpen();
                  setUID(pokemon.id);
                }}
              >
                Release
              </Button>
              <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Release Pokemon
                    </AlertDialogHeader>

                    <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          handleReleaseButton();
                          onClose();
                        }}
                        ml={3}
                      >
                        Yes, release it
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Flex>
          </CardBody>
        </Card>
      );
    });
  };

  return (
    <>
      <Box className="pokemon-pics" display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingX={8} paddingY={8} w={[300, 400, 500]}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" alt="Pokemon Logo" />
        <Image src="https://pngimg.com/uploads/pokemon/pokemon_PNG98.png" alt="Some Pokemons" />
        <Text marginTop={8}>Your Pokemon</Text>
      </Box>
      <Box className="pokemon-pics" paddingX={8} w={[300, 400, 500]}>
        {showPokemons()}
      </Box>
    </>
  );
};

export default MyPokemon;
