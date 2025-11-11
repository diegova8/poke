import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PokemonImage, Types, Stats, Abilities, Moves } from "..";
import { connect } from "react-redux";
import { toggleFavorite } from "../../redux/actions/pokemonListActions";

/* eslint-disable react/prop-types */
const Pokemon = ({ favorites, pokemonList, toggleFavorite }) => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  let { pokemonId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Fetch main pokemon data
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        // Fetch species data
        return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
      })
      .then((response) => response.json())
      .then((data) => {
        setSpecies(data);
        // Fetch evolution chain
        return fetch(data.evolution_chain.url);
      })
      .then((response) => response.json())
      .then((data) => {
        setEvolutions(extractEvolutionChain(data.chain));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [pokemonId]);

  const extractEvolutionChain = (chain) => {
    const evolutions = [];
    let current = chain;
    while (current) {
      evolutions.push(current.species.name);
      current = current.evolves_to[0];
    }
    return evolutions;
  };

  const getCurrentPokemonIndex = () => {
    return pokemonList.findIndex((p) => p.name === pokemonId);
  };

  const handleNextPokemon = () => {
    const currentIndex = getCurrentPokemonIndex();
    if (currentIndex < pokemonList.length - 1) {
      navigate(`/pokemon/${pokemonList[currentIndex + 1].name}`);
    }
  };

  const handlePreviousPokemon = () => {
    const currentIndex = getCurrentPokemonIndex();
    if (currentIndex > 0) {
      navigate(`/pokemon/${pokemonList[currentIndex - 1].name}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gradient-to-b from-red-500 to-red-400">
        <div className="text-white text-2xl font-pokemon">Loading...</div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gradient-to-b from-red-500 to-red-400">
        <div className="text-white text-2xl font-pokemon">Pokémon not found</div>
      </div>
    );
  }

  const { name, abilities, height, weight, moves, stats, types, id } = pokemon;
  const description = species?.flavor_text_entries
    ?.find((entry) => entry.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ") || "No description available";
  const isFavorite = favorites.includes(id);

  return (
    <div className="w-full h-full overflow-auto bg-gradient-to-b from-red-500 via-red-400 to-yellow-100 p-6">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border-8 border-red-600 shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 flex items-center justify-between border-b-4 border-red-700">
          <button
            onClick={handlePreviousPokemon}
            disabled={getCurrentPokemonIndex() <= 0}
            className={`px-4 py-2 font-bold font-pokemon rounded border-2 transition ${
              getCurrentPokemonIndex() <= 0
                ? "border-gray-400 text-gray-400 cursor-not-allowed"
                : "border-white text-white hover:bg-red-700"
            }`}
          >
            ← Prev
          </button>

          <div>
            <p className="text-white text-sm font-pokemon">Pokémon #</p>
            <h1 className="text-4xl font-bold font-pokemon text-white capitalize drop-shadow-lg">
              {name}
            </h1>
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => toggleFavorite(id)}
              className={`text-5xl transition transform hover:scale-110 ${
                isFavorite ? "text-yellow-300" : "text-gray-300 hover:text-yellow-300"
              }`}
            >
              ★
            </button>
            <button
              onClick={handleNextPokemon}
              disabled={getCurrentPokemonIndex() >= pokemonList.length - 1}
              className={`px-4 py-2 font-bold font-pokemon rounded border-2 transition ${
                getCurrentPokemonIndex() >= pokemonList.length - 1
                  ? "border-gray-400 text-gray-400 cursor-not-allowed"
                  : "border-white text-white hover:bg-red-700"
              }`}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Pokemon ID and Stats Row */}
        <div className="bg-red-100 px-6 py-3 border-b-2 border-red-300 flex items-center justify-between font-pokemon">
          <span className="text-2xl font-bold text-red-600">
            #{String(id).padStart(3, "0")}
          </span>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-600">Height</p>
              <p className="font-bold text-gray-800">{(height / 10).toFixed(1)} m</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Weight</p>
              <p className="font-bold text-gray-800">{(weight / 10).toFixed(1)} kg</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Column - Image and Types */}
          <div className="space-y-4">
            {/* Image */}
            <div className="bg-gradient-to-b from-blue-200 to-blue-100 rounded-xl border-4 border-red-400 p-4 text-center">
              <PokemonImage
                src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
                name={name}
              />
            </div>

            {/* Types */}
            <div>
              <h3 className="text-lg font-bold font-pokemon text-red-600 mb-2">Type</h3>
              <Types types={types} />
            </div>

            {/* Description */}
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3">
              <h3 className="text-sm font-bold font-pokemon text-red-600 mb-2">Pokédex Entry</h3>
              <p className="text-sm text-gray-700 leading-relaxed font-mono italic">
                {description}
              </p>
            </div>
          </div>

          {/* Right Column - Stats and Abilities */}
          <div className="space-y-4">
            {/* Stats */}
            <div>
              <h3 className="text-lg font-bold font-pokemon text-red-600 mb-3">Base Stats</h3>
              <Stats stats={stats} />
            </div>

            {/* Abilities */}
            <div>
              <h3 className="text-lg font-bold font-pokemon text-red-600 mb-2">Abilities</h3>
              <Abilities abilities={abilities} />
            </div>
          </div>
        </div>

        {/* Evolution Chain */}
        {evolutions.length > 1 && (
          <div className="border-t-4 border-red-300 px-6 py-4 bg-gradient-to-r from-pink-50 to-red-50">
            <h3 className="text-lg font-bold font-pokemon text-red-600 mb-3">
              Evolution Chain
            </h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {evolutions.map((evo, index) => (
                <div key={evo} className="flex items-center gap-4">
                  <div className="bg-white border-2 border-red-400 rounded-lg px-4 py-2 text-center">
                    <p className="text-sm font-pokemon font-bold capitalize text-gray-800">
                      {evo}
                    </p>
                  </div>
                  {index < evolutions.length - 1 && (
                    <div className="text-red-600 text-2xl font-bold">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Moves */}
        <div className="border-t-4 border-red-300 px-6 py-4">
          <h3 className="text-lg font-bold font-pokemon text-red-600 mb-3">Moves</h3>
          <Moves moves={moves} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  favorites: state.pokemonList.favorites,
  pokemonList: state.pokemonList.pokemonList,
});

const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (id) => dispatch(toggleFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);
