import { Box, Image, Text, Card, CardBody } from "@chakra-ui/react";

const MyPokemon = () => {
  // const showPokemons = () => {
  //   return pokemonsData.map((pokemon) => {
  //     return (
  //       <Card onClick={() => navigate(`/pokemon-details?id`)} border="1px" key= marginY={4}>
  //         <CardBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
  //           <Image boxSize="150px" src="" alt={pokemon.name} />
  //           <Text as="b" fontSize="md">
  //             {pokemon.name}
  //           </Text>
  //         </CardBody>
  //       </Card>
  //     );
  //   });
  // };

  return (
    <>
      <Box className="pokemon-pics" display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingX={8} paddingY={8} w={[300, 400, 500]}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" alt="Pokemon Logo" />
        <Image src="https://pngimg.com/uploads/pokemon/pokemon_PNG98.png" alt="Some Pokemons" />
        <Text marginTop={8}>Go get your Pokemon!</Text>
      </Box>
      <Box className="pokemon-pics" paddingX={8} w={[300, 400, 500]}>
        {/* {showPokemons()} */}
      </Box>
    </>
  );
};

export default MyPokemon;
