import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadRoomsList } from "../../../store/rooms";
import Loader from "../loader";

const RoomsLoader = ({ children }) => {
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dataStatus) dispatch(loadRoomsList());
  }, [dataStatus, dispatch]);
  if (!dataStatus) return <Loader />;
  return children;
};

export default RoomsLoader;
