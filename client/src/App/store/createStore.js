import { combineReducers, configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./rooms";
import usersReducer from "./users";

const rootReducer = combineReducers({
  rooms: roomsReducer,
  users: usersReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
