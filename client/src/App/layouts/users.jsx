import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
  const params = useParams();
  const { edit } = params;
  return <UsersLoader>{edit ? <EditUserPage /> : <UserPage />}</UsersLoader>;
};

export default Users;
