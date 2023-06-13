import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import PokeList from "./../components/poke-list/poke-list";

export default function Root() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then((response) => response.json())
      .then((data) => setPokemon(data.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container flex flex-row mx-auto h-screen max-[600px]:flex-col-reverse">
      <div className="side-bar overflow-auto w-1/5  max-[600px]:w-full max-[600px]:h-2/4 ">
        {" "}
        <PokeList pokemon={pokemon} />
      </div>
      <div className="main-content w-4/5 max-[600px]:w-full max-[600px]:h-2/4  max-[600px]:overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
