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
import { Type } from "../../Utility/action.type";

const Payment = () => {
  const { state, dispatch } = useContext(StateContext);
  const { user, basket } = state;

  const totalItem = basket?.reduce((amount, item) => (item?.amount || 0) + amount, 0) || 0;
  const total = basket?.reduce(
    (amount, item) => Number(item?.price || 0) * (item?.amount || 0) + amount,
    0
  ) || 0;

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
      // Validate basket has items
      if (!basket || basket.length === 0) {
        setCardError("Your cart is empty. Please add items to checkout.");
        setProcessing(false);
        return;
      }

      // 1. Create Payment Intent
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );

      if (!response.data || !response.data.clientSecret) {
        throw new Error("Failed to create payment. Please try again.");
      }

      const clientSecret = response.data.clientSecret;

      // 2. Confirm Card Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // Check for errors in the result
      if (result.error) {
        throw new Error(result.error.message || "Payment failed");
      }

      // Handle different response structures from Stripe
      let paymentIntent = null;
      
      if (result.paymentIntent) {
        paymentIntent = result.paymentIntent;
      } else if (result.payment_intent) {
        paymentIntent = result.payment_intent;
      } else if (result.paymentIntent?.id) {
        paymentIntent = result.paymentIntent;
      }

      // Check if paymentIntent exists and has the expected structure
      if (!paymentIntent) {
        throw new Error("Payment confirmation failed. Please try again.");
      }

      // Check payment status
      if (!paymentIntent.status) {
        throw new Error("Payment status unknown. Please contact support.");
      }

      if (paymentIntent.status !== "succeeded") {
        throw new Error(
          `Payment status: ${paymentIntent.status}. Payment was not successful.`
        );
      }

      // 3. Save Order in Firestore
      const ordersRef = collection(db, "users", user.uid, "orders");
      await addDoc(ordersRef, {
        basket: basket.map((item) => ({
          id: item.id,
          title: item.title,
          price: Number(item.price),
          amount: item.amount,
          image: item.image,
          description: item.description,
          rating: item.rating || { rate: 0, count: 0 },
        })),
        amount: paymentIntent.amount || total * 100,
        created: serverTimestamp(),
        paymentId: paymentIntent.id,
      });

      // 4. Clear the basket after successful payment
      dispatch({ type: Type.EMPTY_BASKET });
      
      navigate("/orders", {state:{msg:"You have placed new Order"}});
    } catch (error) {
      console.error("Payment error:", error);
      let errorMessage = "Payment failed. Please try again.";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setCardError(errorMessage);
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
