import React, { useContext } from 'react'
import './Header.css'
import { SlLocationPin } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { DataContext } from '../DataProvider/DataProvider';
import LowerHeader from './LowerHeader';


const Header = () => {

  const [{basket}] = useContext(DataContext)
  

  return (
    
    <section className='fixed'>
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
            <span><SlLocationPin /></span>
            <div>
            <p className='header__optionText1'>Delivered to</p>
            <span className='header__optionText'>Ethiopia</span>
            </div>
          </div>
        </div>
        <div className="header__search">
          <select className="header__searchSelect" name="" id="">
            <option value="">All</option>
          </select>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search..."
            className="header__searchInput"
          />
          <FaSearch className="header__searchIcon" />
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
          <Link to="/login">
            <div className="header__option">
              <p className="header__optionText1">Sign In</p>
              <span className='header__optionText'>Account & Lists</span>
            </div>
          </Link>
          <Link to="/orders">
            <div className="header__option">
              <p className="header__optionText1">Returns</p>
              <span className='header__optionText'>& Orders</span>
            </div>
          </Link>
          <Link to="/cart" className="header__optionCart">
            
              <BiCart size={35} className='cart-icon'/>
              <span className='cart-count'>{basket.length}</span>
           
          </Link>
        </div>
      </section>
    <LowerHeader/>
    </section>
    
  );
}

export default Header

