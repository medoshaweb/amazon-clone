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
      className={`product-card ${flex ? 'product-card--flex' : ''}`}
    >
      <div className="product-image-wrapper">
        <Link to={`/product/${product.id}`}>
          <img className="product-image" src={image} alt={title} />
        </Link>
      </div>
      <div className="product-info">
        <div className="product-info__top">
          <h3 className="product-title">{title}</h3>
          {renderDetail && <p className="product-description">{description}</p>}
          <div className="product-rating-container">
            <Rating value={rating?.rate || 0} precision={0.1} readOnly size="small" />
            <small>({rating?.count || 0})</small>
          </div>
          <div className="product-price">
            <CurrencyFormat value={price} />
          </div>
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