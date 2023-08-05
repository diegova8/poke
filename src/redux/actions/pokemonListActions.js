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
      dispatch({
        type: actionTypes.FETCH_POKEMON_LIST_SUCCESS,
        payload: res.data.results,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_POKEMON_LIST_FAILURE,
        payload: err.message,
      });
    }
  };
};
