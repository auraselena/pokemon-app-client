import "./App.css";
import { Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import MyPokemon from "./pages/MyPokemon";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon-details" element={<PokemonDetails />} />
        <Route path="/my-pokemon" element={<MyPokemon />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
