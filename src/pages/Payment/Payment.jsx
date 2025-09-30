



import React, { useContext, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import "./Payment.css";
import LayOut from "../../components/LayOut/LayOut";
import { StateContext } from "../../components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { state } = useContext(StateContext);
  const { user, basket } = state;

  const totalItem = basket.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce(
    (amount, item) => Number(item.price) * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardError(e.error ? e.error.message : "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!user?.uid) {
      setCardError("You must be logged in to make a payment.");
      return;
    }

    setProcessing(true);
    setCardError(null);

    try {
      // 1. Create Payment Intent
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );
      const clientSecret = response.data?.clientSecret;

      // 2. Confirm Card Payment
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (paymentIntent.status !== "succeeded") {
        throw new Error("Payment not successful");
      }

      // 3. Save Order in Firestore
      const ordersRef = collection(db, "users", user.uid, "orders");
      await addDoc(ordersRef, {
        basket: basket.map((item) => ({
          id: item.id,
          title: item.title,
          price: Number(item.price),
          amount: item.amount,
        })),
        amount: paymentIntent.amount,
        created: serverTimestamp(),
        paymentId: paymentIntent.id,
      });
      navigate("/order", {state:{msg:"You have placed new Order"}})

      alert("Payment successful!");
    } catch (error) {
      console.error("Payment error:", error);
      setCardError(error.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className="payment_header">Checkout ({totalItem}) items</div>

      <section className="payment">
        <div className="flex">
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || "Guest"}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        <div className="flex">
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        <div className="flex">
          <h3>Payment methods</h3>
          <div className="payment_card_container">
            <div className="payment_details">
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small className="carderror_small">{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className="payment_price">
                  <div>
                    <span>
                      Total Order | <CurrencyFormat value={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={!stripe || processing}>
                    {processing ? (
                      <div className="loading">
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
