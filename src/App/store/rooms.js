import { createAction, createSlice } from "@reduxjs/toolkit";
import roomService from "../services/room.service";

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
  },
});

const { reducer: roomsReducer, actions } = roomsSlice;

const { roomsRequested, roomsReceived, roomsRequestFailed, roomCreated } =
  actions;

const roomCreateRequested = createAction("rooms/roomCreateRequested");
const roomCreateFailed = createAction("rooms/roomCreateFailed");

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
  dispatch(roomCreateRequested());
  try {
    const { content } = await roomService.create(payload);
    dispatch(roomCreated(content));
  } catch (error) {
    dispatch(roomCreateFailed(error.message));
  }
};

export const getRoomsList = () => (state) => state.rooms.entities;
export const getRoomsLoadingStatus = () => (state) => state.rooms.isLoading;

export default roomsReducer;
