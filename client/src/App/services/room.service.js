import httpService from "./http.service";

const roomEndpoind = "rooms/";

const roomService = {
  get: async () => {
    const { data } = await httpService.get(roomEndpoind);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(roomEndpoind + "add", payload);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(roomEndpoind, payload);
    return data;
  },
  updateRoom: async (payload) => {
    console.log(payload);
    const { data } = await httpService.put(
      roomEndpoind + payload._id + "/edit",
      payload
    );
    return data;
  },
  updateAvailable: async (payload) => {
    const { data } = await httpService.patch(
      roomEndpoind + payload._id + "/available",
      payload
    );
    return data;
  },
  delete: async (payload) => {
    const { data } = await httpService.delete(roomEndpoind + payload, payload);
    return data;
  },
};

export default roomService;
