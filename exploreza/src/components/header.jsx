import React from "react";
import { FaShoppingBag } from "react-icons/fa"; // cart icon
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" bg-white fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center py-5 px-5">
        <div className="flex-shrink-0 ">
          <img src={logo} alt="Logo" className="h-7 w-auto" />
        </div>

        <nav>
          <ul className="flex justify-center space-x-8 text-base font-medium">
            <li className="cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Contact Us</li>
            <li className="cursor-pointer">Blog</li>
          </ul>
        </nav>

        <div className="relative flex items-center cursor-pointer">
          <FaShoppingBag className="text-xl" />
          <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            0
          </span>
          <span className="ml-2 text-base font-medium">Cart</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
