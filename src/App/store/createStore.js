import { combineReducers, configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./rooms";

const rootReducer = combineReducers({
  rooms: roomsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
