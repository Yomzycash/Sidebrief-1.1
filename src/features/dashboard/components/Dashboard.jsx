import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
      <p>Dashboard</p>
    </div>
  );
};

export default Dashboard;
