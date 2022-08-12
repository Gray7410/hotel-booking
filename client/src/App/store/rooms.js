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
    roomAvailableUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((r) => r._id === action.payload._id)
      ].available = action.payload.available;
    },
    roomDeleted: (state, action) => {
      state.entities.filter((r) => r._id === action.payload);
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
  roomAvailableUpdated,
  roomDeleted,
} = actions;

const roomCreateRequested = createAction("rooms/roomCreateRequested");
const roomCreateFailed = createAction("rooms/roomCreateFailed");
const roomUpdateFailed = createAction("rooms/roomUpdateFailed");
const roomUpdateRequested = createAction("rooms/roomUpdaterequested");
const roomAvailableUpdateRequested = createAction(
  "rooms/roomAvailableUpdateRequested"
);
const roomAvailableUpdateFailed = createAction(
  "rooms/roomAvailableUpdateFailed"
);
const roomDeleteRequested = createAction("rooms/roomDeleteRequested");
const roomDeleteFailed = createAction("rooms/roomDeleteFailed");

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
  console.log("createRoom", payload);
  dispatch(roomCreateRequested());
  try {
    const { content } = await roomService.create(payload);
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

export const updateAvailable = (payload) => async (dispatch) => {
  dispatch(roomAvailableUpdateRequested());
  try {
    await roomService.updateAvailable(payload);
    dispatch(roomAvailableUpdated(payload));
  } catch (error) {
    dispatch(roomAvailableUpdateFailed(error.message));
  }
};

export const updateRoom = (payload) => async (dispatch) => {
  dispatch(roomUpdateRequested());
  try {
    await roomService.updateRoom(payload);
    dispatch(roomUpdated(payload));
    history.push(`/rooms/${payload._id}`);
  } catch (error) {
    dispatch(roomUpdateFailed(error.message));
  }
};

export const deleteRoom = (payload) => async (dispatch) => {
  dispatch(roomDeleteRequested());
  try {
    await roomService.delete(payload);
    dispatch(roomDeleted(payload));
    dispatch(loadRoomsList());
    history.push(`/rooms`);
  } catch (error) {
    dispatch(roomDeleteFailed());
  }
};

// export const getBookingRooms = () => (state)=>{
//   state.rooms.entities.filter((r)=>)
// }

export const getRoomsList = () => (state) => state.rooms.entities;
export const getRoomsLoadingStatus = () => (state) => state.rooms.isLoading;
export const getDataStatus = () => (state) => state.rooms.dataLoaded;

export default roomsReducer;
