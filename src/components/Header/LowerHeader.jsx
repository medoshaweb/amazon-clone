import React from 'react'
import { IoIosMenu } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './Header.css'

const LowerHeader = () => {
  const navigate = useNavigate();

  const handleAllClick = () => {
    navigate('/');
  };

  return (
    <div className='lower-nav'>
      <ul>
        <li onClick={handleAllClick} style={{ cursor: "pointer" }}>
          <IoIosMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader