import * as actionTypes from "../actions/actionTypes";

const initialState = {
  pokemonList: [],
  loading: false,
  error: null,
  searchFilter: "",
  typeFilter: "",
  favorites: [],
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
    case actionTypes.SET_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: action.payload,
      };
    case actionTypes.SET_TYPE_FILTER:
      return {
        ...state,
        typeFilter: action.payload,
      };
    case actionTypes.TOGGLE_FAVORITE:
      const updatedFavorites = state.favorites.includes(action.payload)
        ? state.favorites.filter((id) => id !== action.payload)
        : [...state.favorites, action.payload];
      localStorage.setItem("pokemonFavorites", JSON.stringify(updatedFavorites));
      return {
        ...state,
        favorites: updatedFavorites,
      };
    case actionTypes.LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonListReducer;
