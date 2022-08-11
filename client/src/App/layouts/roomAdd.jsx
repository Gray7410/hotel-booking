import React from "react";
import { useSelector } from "react-redux";
import AccessDenied from "../components/ui/accessDenied";
import CreateRoomForm from "../components/ui/createRoomForm";
import { getCurrentUserData, getIsLoggedIn } from "../store/users";

const RoomAdd = () => {
  const user = useSelector(getCurrentUserData());
  const isLoggedIn = useSelector(getIsLoggedIn());
  if (!isLoggedIn) {
    return <AccessDenied />;
  }
  return <>{user.role === "guest" ? <AccessDenied /> : <CreateRoomForm />}</>;
};

export default RoomAdd;
