import { combineReducers } from "redux";
import pokemonListReducer from "./pokemonListReducer";

const rootReducer = combineReducers({
  pokemonList: pokemonListReducer,
});

export default rootReducer;
