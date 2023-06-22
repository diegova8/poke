import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import PokeList from "./../components/poke-list/poke-list";

//import { useLoaderData } from "react-router-dom";
//import { getPokemon } from "./../services/pokemon-service";

// export async function loader() {
//   const pokemon = await getPokemon();
//   return { pokemon };
// }

export default function Root() {
  //const { pokemon } = useLoaderData();
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then((response) => response.json())
      .then((data) => setPokemonList(data.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container flex flex-row mx-auto h-screen max-[600px]:flex-col-reverse items-center capitalize">
      <div className="side-bar overflow-auto w-1/5  max-[600px]:w-full max-[600px]:h-2/4 ">
        {" "}
        <PokeList pokemon={pokemonList} />
      </div>
      <div className="main-content w-4/5 max-[600px]:w-full max-[600px]:h-2/4  max-[600px]:overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
