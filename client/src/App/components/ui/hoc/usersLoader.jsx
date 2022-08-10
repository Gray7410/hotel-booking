import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList } from "../../../store/users";
import Loader from "../loader";

const UsersLoader = ({ children }) => {
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, [dataStatus, dispatch]);
  if (!dataStatus) return <Loader />;
  return children;
};

export default UsersLoader;
