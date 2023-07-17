import { Testing, CartIcon } from "../icons";
import { useSelector } from "react-redux";
import React from "react";

const Navbar = () => {
  const { amount, cartItems } = useSelector((store) => store.cart);
  console.log(cartItems);
  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <Testing />
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
