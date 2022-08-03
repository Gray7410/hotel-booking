import { createAction, createSlice } from "@reduxjs/toolkit";
import roomService from "../services/room.service";
import history from "../utils/history";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    entities: null,
    isLoading: true,
    dataLoaded: false,
    error: null,
  },
  reducers: {
    roomsRequested: (state) => {
      state.isLoading = true;
    },
    roomsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    roomsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    roomCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    roomUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((r) => r._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const { reducer: roomsReducer, actions } = roomsSlice;

const {
  roomsRequested,
  roomsReceived,
  roomsRequestFailed,
  roomCreated,
  roomUpdated,
} = actions;

const roomCreateRequested = createAction("rooms/roomCreateRequested");
const roomCreateFailed = createAction("rooms/roomCreateFailed");
const roomUpdateFailed = createAction("rooms/roomUpdateFailed");
const roomUpdateRequested = createAction("rooms/roomUpdaterequested");

export const loadRoomsList = () => async (dispatch, getState) => {
  dispatch(roomsRequested());
  try {
    const { content } = await roomService.get();
    dispatch(roomsReceived(content));
  } catch (error) {
    dispatch(roomsRequestFailed(error.message));
  }
};

export const createRoom = (payload) => async (dispatch) => {
  console.log(payload);
  dispatch(roomCreateRequested());
  try {
    const { content } = await roomService.create(payload);
    console.log(content);
    dispatch(roomCreated(content));
    dispatch(loadRoomsList());
    history.push("/rooms");
  } catch (error) {
    dispatch(roomCreateFailed(error.message));
  }
};

export const getRoomById = (roomId) => (state) => {
  if (state.rooms.entities) {
    return state.rooms.entities.find((r) => r._id === roomId);
  }
};

export const getRoomAvailableStatus = (roomId) => (state) => {
  const room = state.rooms.entities.find((r) => r._id === roomId);
  return room.available;
};

export const updateRoom = (payload) => async (dispatch) => {
  dispatch(roomUpdateRequested());
  try {
    await roomService.updateRoom(payload);
    dispatch(roomUpdated(payload));
  } catch (error) {
    dispatch(roomUpdateFailed(error.message));
  }
};

export const getRoomsList = () => (state) => state.rooms.entities;
export const getRoomsLoadingStatus = () => (state) => state.rooms.isLoading;
export const getDataStatus = () => (state) => state.rooms.dataLoaded;

export default roomsReducer;
