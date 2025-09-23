import React, { useEffect, useState} from 'react'
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import './Product.css'
import Loader from '../../loaders/loader.jsx';



const Product = () => {
    const[products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        setIsLoading(true);
      const fetchData = async () => {
        try {
          const res = await axios.get("https://fakestoreapi.com/products");
          console.log(res.data);
          setProducts(res.data);
            setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
            setIsLoading(false);
        }
      };

      fetchData(); // call the async function
    }, []);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="product-list">
          {products.map((singleProduct) => (
            <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
          ))}
        </section>
      )}
    </>
  );
}



export default Product
