import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../components/ui/loader";
import { logOut } from "../store/users";

const LogOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, [dispatch]);
  return <Loader />;
};

export default LogOut;
