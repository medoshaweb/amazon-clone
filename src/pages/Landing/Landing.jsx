import React from "react";
import LayOut from "../../components/LayOut/LayOut";
import Carousel from "../../components/Carousel/Carousel.jsx";
import Category from "../../components/Category/Category.jsx";
import Product from "../../components/Product/Product.jsx";

const Landing = () => {
  return (
    <LayOut>
      <div className="landing-wrapper">
        <div className="carousel-wrapper">
          <Carousel />
          <div className="carousel-fade-bottom"></div>
        </div>

        {/* Category overlay */}
        <Category />
      </div>
      <Product />
    </LayOut>
  );
};

export default Landing;
