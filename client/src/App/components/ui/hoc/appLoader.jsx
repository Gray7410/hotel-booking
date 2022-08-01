import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsLoadingStatus, loadRoomsList } from "../../../store/rooms";
import { getUsersLoadingStatus, loadUsersList } from "../../../store/users";
import Loader from "../loader";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const roomsStatusLoading = useSelector(getRoomsLoadingStatus());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    dispatch(loadRoomsList());
    dispatch(loadUsersList());
  }, [dispatch]);
  if (roomsStatusLoading || usersStatusLoading) {
    return <Loader />;
  }
  return children;
};

export default AppLoader;
