import React, { useEffect, useState } from 'react'
import './ProductDetail.css'
import LayOut from '../../components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endpoints' 
import ProductCard from '../../components/Product/ProductCard'  
import Loader from '../../loaders/loader.jsx'



const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${productUrl}/${productId}`);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return (
    <LayOut>
     { isLoading && <Loader />} 
        { error && <p className="error-message">{error}</p> }
        {!isLoading &&  product && (
      <ProductCard
        product={product}
        renderDetail={true}
        renderAdd={true}
        flex={true}
      />)}
    </LayOut>
  );
};

export default ProductDetail