/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import { pokeball, black } from "../../assets";

const PokeList = ({ pokemon }) => {
  const { pokemonId } = useParams();

  return (
    <div className="flex flex-col-reverse h-screen w-full">
      <div>
        <h1 className="text-2xl text-center font-semibold font-pokemon">
          Pokedex
        </h1>
      </div>
      <div className="bg-red-400 rounded overflow-auto">
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          {pokemon &&
            pokemon.map((pokemon) => (
              <Link to={`pokemon/${pokemon.name}`} key={pokemon.name} s>
                <li
                  key={pokemon.name}
                  className={`${
                    pokemonId === pokemon.name ? "bg-red-600" : ""
                  } m-1 p-2 sm:p-3 sm:m-2 hover:bg-red-600 rounded`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-row">
                      <img
                        src={pokemonId === pokemon.name ? pokeball : black}
                        alt={pokemon.name}
                        className="w-5 h-5 mx-2 bg-gray-300 rounded-full flex-shrink-0"
                      ></img>
                      <p className="leading-5 text-base font-medium text-white">
                        {pokemon.name}
                      </p>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PokeList;
