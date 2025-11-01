import React, { useContext, useState } from "react";
import { StateContext } from "../DataProvider/DataProvider";
import "./Header.css";
import { SlLocationPin } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { auth } from "../../Utility/firebase";
import LowerHeader from "./LowerHeader";
import { categoryData } from "../Category/categoryFull";

const Header = () => {
  const { state } = useContext(StateContext);
  const { user, basket } = state;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const handleSearch = () => {
    if (selectedCategory) {
      // Navigate to selected category
      navigate(`/category/${encodeURIComponent(selectedCategory)}`);
    } else if (searchTerm.trim()) {
      // Navigate with search term as category
      navigate(`/category/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="fixed">
      <section className="header">
        <div className="header__logoContainer">
          <Link to="/">
            <img
              className="header__logo"
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo"
            />
          </Link>

          <span>
            <img src="../../assets/images/location white.png" alt="" />
          </span>
          <div className="header__optionLocation">
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p className="header__optionText1">Delivered to</p>
              <span className="header__optionText">Ethiopia</span>
            </div>
          </div>
        </div>
        <div className="header__search">
          <select 
            className="header__searchSelect" 
            name="category" 
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categoryData.map((category) => (
              <option key={category.id} value={category.name}>
                {category.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="header__searchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FaSearch 
            className="header__searchIcon" 
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="header__nav">
          <div className="header__optionLanguage">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
              className="flag"
              alt=""
            />
            <select className="header__optionLanguageSelect" name="" id="">
              <option value="">EN</option>
            </select>
          </div>
          <Link to={!user && "/auth"}>
            <div className="header__option">
              {user ? (
                <div className="header__option" onClick={() => auth.signOut()}>
                  <p className="header__optionText1">
                    Hello {user?.email?.split("@")[0]}
                  </p>
                  <span
                    className="header__optionText">
                    sign OUt
                  </span>
                </div>
              ) : (
                <Link to="/auth">
                  <div className="header__option">
                    <p className="header__optionText1">Hello, Sign In</p>
                    <span className="header__optionText">Account & Lists</span>
                  </div>
                </Link>
              )}
            </div>
            {/* <div className="header__option">
              <span className="header__optionText">Account & Lists</span>
            </div> */}
          </Link>
          <Link to="/orders">
            <div className="header__option">
              <p className="header__optionText1">Returns</p>
              <span className="header__optionText">& Orders</span>
            </div>
          </Link>
          <Link to="/cart" className="header__optionCart">
            <BiCart size={35} className="cart-icon" />
            <span className="cart-count">{totalItem}</span>
          </Link>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
