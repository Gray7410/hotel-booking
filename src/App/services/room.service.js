import httpService from "./http.service";

const roomEndpoind = "room/";

const roomService = {
  get: async () => {
    const { data } = await httpService.get(roomEndpoind);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(roomEndpoind + payload._id, payload);
    return data;
  },
};

export default roomService;
