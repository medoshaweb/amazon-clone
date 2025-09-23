import React, { useContext } from 'react'
import { StateContext } from '../../components/DataProvider/DataProvider';
import './Cart.css'
import LayOut from '../../components/LayOut/LayOut'

import ProductCard from '../../components/Product/ProductCard';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';

const Cart = () => {
    const {state} = useContext(StateContext);
    const { basket } = state;
    const total = basket.reduce((amount,item)=>
        item.price + amount, 0)
    
  return (
    <LayOut>
      <section className='container'>
        <div className='cart-container'>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Opps ! No item in your cart</p>
          ) : (
            basket?.map((item, i) => (
              <ProductCard
                key={i}
                product={item}
                renderDesc={true}
                renderAdd={false}
                flex={true}
              />
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className='subtotal'>
            <div>
              <p>Subtotal ({basket?.length}items)</p>
              <CurrencyFormat amount={total}/>
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to ="/payments">
              Continue to checkout
            </Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart