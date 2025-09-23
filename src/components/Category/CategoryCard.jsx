import React from "react";
import "./Category.css";
import { Link } from "react-router-dom";

const CategoryCard = ({ data }) => {
  return (
    <div className="category-card">
      <Link
        to={`/category/${encodeURIComponent(data.name)}`} // ✅ safely encode
        className="category-card__link"
      >
        <h2 className="category-card__title">{data.title}</h2>
        <img
          className="category-card__image"
          src={data.image}
          alt={data.title}
        />
        <p className="category-card__shop-now">Shop now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
