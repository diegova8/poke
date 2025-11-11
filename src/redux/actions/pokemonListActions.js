import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getPokemonList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_POKEMON_LIST_REQUEST,
      });
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );

      // Enhance pokemon data with ID and image
      const enhancedPokemon = res.data.results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
      }));

      dispatch({
        type: actionTypes.FETCH_POKEMON_LIST_SUCCESS,
        payload: enhancedPokemon,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_POKEMON_LIST_FAILURE,
        payload: err.message,
      });
    }
  };
};

export const setSearchFilter = (searchTerm) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_SEARCH_FILTER,
    payload: searchTerm,
  });
};

export const setTypeFilter = (type) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_TYPE_FILTER,
    payload: type,
  });
};

export const toggleFavorite = (pokemonId) => (dispatch) => {
  dispatch({
    type: actionTypes.TOGGLE_FAVORITE,
    payload: pokemonId,
  });
};

export const loadFavoritesFromStorage = () => (dispatch) => {
  const favorites = localStorage.getItem("pokemonFavorites");
  dispatch({
    type: actionTypes.LOAD_FAVORITES,
    payload: favorites ? JSON.parse(favorites) : [],
  });
};
