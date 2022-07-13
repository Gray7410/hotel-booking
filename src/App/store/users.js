import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import history from "../utils/history";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    dataLoaded: false,
    error: null,
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;

const { usersRequested, usersReceived, usersRequestFailed, userCreated } =
  actions;

const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");

export const loadusersList = () => async (dispatch, getState) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const createUser = (payload) => async (dispatch) => {
  console.log(payload);
  dispatch(userCreateRequested());
  try {
    const { content } = await userService.create(payload);
    console.log(content);
    dispatch(userCreated(content));
    dispatch(loadUsersList());
    history.push("/users");
  } catch (error) {
    dispatch(userCreateFailed(error.message));
  }
};

export const getUsersList = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export default usersReducer;
