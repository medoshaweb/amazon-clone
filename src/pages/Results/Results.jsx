import React from 'react'
import { useState, useEffect } from 'react'
import './Results.css'
import LayOut from '../../components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endpoints'
import Product from '../../components/Product/Product'
import ProductCard from '../../components/Product/ProductCard'
import Loader from '../../loaders/loader.jsx'

const Results = () => {
    const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  

 useEffect(() => {
    setIsLoading(true);
   const fetchCategoryData = async () => {
     try {
       const decoded = decodeURIComponent(categoryName); 
       const res = await axios.get(`${productUrl}/category/${decoded}`);
       setResults(res.data);
         setIsLoading(false);
     } catch (err) {
       console.error("Error fetching category data:", err);
       setIsLoading(false);
     }
   };
   fetchCategoryData();
 }, [categoryName]);



  return (
    <LayOut>
        {isLoading ? (<Loader />) : (
    <section>
        <h1 style={{padding: "20px"}}>Results </h1>
        <p style={{padding: "20px"}}>Category: {categoryName}</p>
        <p style={{padding: "20px"}}>Found {results.length} results</p>
        <hr />
        
        <div className="product-container">
            {results?.map(product => (
                
                    <ProductCard key={product.id} product={product} renderDetail={false} renderAdd={true}/>
                    
                
            ))}
        </div>
    </section>
        )}
    </LayOut>
  )
}

export default Results
 