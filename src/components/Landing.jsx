import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../services/Auth";

const Landing = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) return <Navigate to="/home" />;
  else return <Navigate to="/login" />;
};

export default Landing;
