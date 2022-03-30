import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          Lucy's Store
        </Link>
      </div>
      <div>
        <Link to="/cart">Cart</Link>
        <Link to="/signin">Signin</Link>
      </div>
    </header>
  );
};
