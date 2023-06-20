import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonImage, Types, Stats, Abilities, Moves, HeightWeight } from "..";

/* eslint-disable react/prop-types */
const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  let { pokemonId } = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pokemonId]);

  const { name, abilities, height, weight, moves, stats, types } = pokemon;
  return (
    <div className="flex flex-row w-full align-bottom">
      <div className="w-1/2">
        <PokemonImage
          src={pokemon.sprites?.other?.home?.front_default}
          name={name}
        />
      </div>
      <div className="flex w-1/2 items-end">
        <div className="w-1/2 px-5">
          <Abilities abilities={abilities} />
          <HeightWeight height={height} weight={weight} />
          <Moves moves={moves} />
        </div>
        <div className="w-1/2 px-5">
          <Stats stats={stats} />
          <Types types={types} />
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
