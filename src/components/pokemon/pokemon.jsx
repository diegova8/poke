import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="flex flex-col items-center">
      <img
        src={pokemon.sprites?.other?.home?.front_default}
        alt={name}
        className="w-32 h-32"
      />
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <div className="flex min-w-[50%]">
        <div className="w-1/2">
          <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 mb-3 max-w-[80%]">
            <div className="h-full w-full bg-white rounded-md p-3 ">
              <h3 className="text-xl font-bold mb-2">Abilities</h3>
              <ul className="list-none">
                {abilities?.map((ability) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 mb-3 max-w-[80%]">
            <div className="h-full w-full bg-white rounded-md p-3 ">
              <h3 className="text-xl font-bold mb-2">Height</h3>
              <p>{height}</p>
              <h3 className="text-xl font-bold mb-2">Weight</h3>
              <p>{weight}</p>
            </div>
          </div>
          <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 mb-3 max-w-[80%]">
            <div className="h-full w-full bg-white rounded-md p-3 ">
              <h3 className="text-xl font-bold mb-2">Moves</h3>
              <ul className="list-none">
                {moves?.slice(0, 5).map((move) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 mb-3 max-w-[80%]">
            <div className="h-full w-full bg-white rounded-md p-3 ">
              <h3 className="text-xl font-bold mb-2">Stats</h3>
              <ul className="list-none">
                {stats?.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name + ": " + stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 mb-3 max-w-[80%]">
            <div className="h-full w-full bg-white rounded-md p-3 ">
              <h3 className="text-xl font-bold mb-2">Types</h3>
              <ul className="list-none">
                {types?.map((type) => (
                  <li key={type.type.name}>{type.type.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
