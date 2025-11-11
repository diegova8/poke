/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getPokemonList,
  setSearchFilter,
  setTypeFilter,
  loadFavoritesFromStorage,
  toggleFavorite,
} from "../../redux/actions/pokemonListActions";

const PokeList = ({
  pokemonList,
  loading,
  error,
  searchFilter,
  favorites,
  getPokemonList,
  setSearchFilter,
  setTypeFilter,
  loadFavoritesFromStorage,
  toggleFavorite,
}) => {
  const { pokemonId } = useParams();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    getPokemonList();
    loadFavoritesFromStorage();
  }, [getPokemonList, loadFavoritesFromStorage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-red-500">
        <div className="text-white text-2xl font-pokemon">Loading Pokedex...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-red-500">
        <div className="text-white text-2xl font-pokemon">Error: {error}</div>
      </div>
    );
  }

  const filteredList = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchFilter.toLowerCase());
    const matchesFavorites = showFavoritesOnly
      ? favorites.includes(pokemon.id)
      : true;
    return matchesSearch && matchesFavorites;
  });

  return (
    <div className="flex flex-col h-screen w-full bg-red-500 border-8 border-red-600">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 border-b-4 border-red-700">
        <h1 className="text-4xl text-center font-bold font-pokemon text-white drop-shadow-lg">
          POKÉDEX
        </h1>
        <p className="text-center text-white text-sm font-pokemon mt-2">
          Version 1.0 - Generation I
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-red-400 p-4 border-b-4 border-red-600 space-y-3">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="w-full px-4 py-2 border-4 border-red-600 rounded font-pokemon bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-yellow-300"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex-1 px-3 py-2 border-4 rounded font-pokemon font-bold transition ${
              showFavoritesOnly
                ? "bg-yellow-300 border-yellow-600 text-red-600"
                : "bg-white border-red-600 text-red-600 hover:bg-gray-100"
            }`}
          >
            ★ Favorites ({favorites.length})
          </button>
        </div>
      </div>

      {/* Pokemon Grid */}
      <div className="flex-1 overflow-auto bg-red-400">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
          {filteredList.map((pokemon) => (
            <Link to={`pokemon/${pokemon.name}`} key={pokemon.id}>
              <div
                className={`relative bg-white rounded-lg border-4 p-3 cursor-pointer transition transform hover:scale-105 hover:shadow-lg ${
                  pokemonId === pokemon.name
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-red-500 hover:border-yellow-400"
                }`}
              >
                {/* Star for Favorite */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(pokemon.id);
                  }}
                  className={`absolute top-1 right-1 text-xl transition ${
                    favorites.includes(pokemon.id)
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  ★
                </button>

                {/* Pokemon Image */}
                <div className="flex justify-center mb-2 h-24">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="h-full object-contain"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/96?text=?";
                    }}
                  />
                </div>

                {/* Pokemon Info */}
                <div className="text-center">
                  <p className="text-xs font-pokemon text-gray-600">
                    #{String(pokemon.id).padStart(3, "0")}
                  </p>
                  <p className="text-sm font-bold font-pokemon text-gray-800 capitalize">
                    {pokemon.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filteredList.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-white text-lg font-pokemon">No Pokémon found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemonList: state.pokemonList.pokemonList,
  loading: state.pokemonList.loading,
  error: state.pokemonList.error,
  searchFilter: state.pokemonList.searchFilter,
  favorites: state.pokemonList.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  getPokemonList: () => dispatch(getPokemonList()),
  setSearchFilter: (term) => dispatch(setSearchFilter(term)),
  setTypeFilter: (type) => dispatch(setTypeFilter(type)),
  loadFavoritesFromStorage: () => dispatch(loadFavoritesFromStorage()),
  toggleFavorite: (id) => dispatch(toggleFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokeList);
