import React, { useContext } from 'react'
import {StateContext} from "../DataProvider/DataProvider"
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import './Product.css'
import { Link } from 'react-router-dom';

import { Type } from '../../Utility/action.type';


const ProductCard = ({ product , flex, renderDetail,renderAdd }) => {
    const { dispatch } = useContext(StateContext);
    if (!product) return null;
    const { title, image, price, rating, description } = product || {};

    const addToCart = () => {
        dispatch({ type: Type.ADD_TO_BASKET, item: product });
    };

  return (
    <div
      className="product-card"
      style={{
        display: "flex",
        flexDirection: flex ? "row" : "column",
        gap: "20px",
        alignItems: "flex-start",
      }}
    >
      <div>
        <Link to={`/product/${product.id}`}>
          <img className="product-image" src={image} alt={title} />
        </Link>
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        {renderDetail && <p className="product-description">{description}</p>}
        <div className="product-rating-container">
          {/* {rating} */}
          <Rating value={rating.rate} precision={0.1} readOnly />
          {/* count*/}
          <small>{rating.count}</small>
          {/* <Rating name="read-only" value={product.rating} readOnly /> */}
          {/* <p>{numeral(product.price).format('$0,0.00')}</p> */}
        </div>
        <div className="product-price">
          {/* {price} */}
          <CurrencyFormat value={price} />
        </div>

        {renderAdd && (
          <button className="product-button" onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard