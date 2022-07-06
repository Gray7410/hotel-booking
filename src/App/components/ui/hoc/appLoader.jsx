import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsLoadingStatus, loadRoomsList } from "../../../store/rooms";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const roomsStatusLoading = useSelector(getRoomsLoadingStatus());
  useEffect(() => {
    dispatch(loadRoomsList());
  }, [dispatch]);
  if (roomsStatusLoading) {
    return "Загрузка";
  }
  return children;
};

export default AppLoader;
