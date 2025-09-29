import React, { useContext } from 'react'
import { StateContext } from '../../components/DataProvider/DataProvider';
import './Cart.css'
import LayOut from '../../components/LayOut/LayOut'
import { Type } from "../../Utility/action.type"
import ProductCard from '../../components/Product/ProductCard';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Cart = () => {
    const {state, dispatch} = useContext(StateContext);
    const { basket } = state;
    const total = basket.reduce((amount,item)=>
        Number(item.price)* item.amount + amount, 0)
    
    const increment =(item)=>{
      dispatch({
        type:Type.ADD_TO_BASKET,
        item
      })
    }
    const decrement =(id)=>{
      dispatch({
        type:Type.REMOVE_FROM_BASKET,
        id
      })
    }
  return (
    <LayOut>
      <section className="container">
        <div className="cart-container">
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>oops ! No item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className="cart-product" key={item.id || i}>
                  <div>
                  <ProductCard
                    product={item}
                    renderDetail={true}
                    renderAdd={false}
                    flex={true}
                  />
                 </div>
                  <div className="button-container">
                    <button className="btn" onClick={() => increment(item)}>
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button className="btn" onClick={() => decrement(item.id)}>
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        <div>
          {basket?.length !== 0 && (
            <div className="subtotal">
              <div>
                <span>Subtotal ({basket?.length} items):</span>{" "}
                <CurrencyFormat value={total} />
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to="/payment" className="payment-link">
                Continue to checkout
              </Link>
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Cart