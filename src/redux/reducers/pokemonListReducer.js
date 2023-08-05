import * as actionTypes from "../actions/actionTypes";

const initialState = {
  pokemonList: [],
  loading: false,
  error: null,
};

const pokemonListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POKEMON_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_POKEMON_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemonList: action.payload,
      };
    case actionTypes.FETCH_POKEMON_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonListReducer;
