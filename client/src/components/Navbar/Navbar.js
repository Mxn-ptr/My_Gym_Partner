import React from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <Link to="/home">
          <img src="./img/logo-banniere.png" alt="logo" height="80px" />
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/home">
          <h2>Home</h2>
        </Link>
        <Link to="/profile">
          <h2>Profile</h2>
        </Link>
        <Logout />
      </div>
    </nav>
  );
}
