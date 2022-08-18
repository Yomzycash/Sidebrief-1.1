import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <NavLink to="register">Register</NavLink>
      <NavLink to="signin">Sign In</NavLink>
    </div>
  );
};

export default Home;
