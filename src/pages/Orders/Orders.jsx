import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { StateContext } from "../../components/DataProvider/DataProvider";
import "./Orders.css";
import ProductCard from "../../components/Product/ProductCard";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const Orders = () => {
  const { state } = useContext(StateContext);
  const { user, basket } = state;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    //    if (!user) return;

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "users", user.uid, "orders");
        const q = query(ordersRef, orderBy("created", "desc"));
        const snapshot = await getDocs(q);

        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <LayOut>
      <section className="container">
        <div className="order_container">
          <h2>Your Orders</h2>

          {/* now orders is always defined */}
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <div>
              {orders.map((order) => (
                <div key={order.id} className="order">
                  <h3>Order ID: {order.id}</h3>
                  <p>Total: ${(order.amount / 100).toFixed(2)}</p>
                  <p>Date: {new Date(order.created * 1000).toLocaleString()}</p>

                  <div className="order-products">
                    {order.basket.map((product, idx) => (
                      <ProductCard
                        key={idx}
                        product={product}
                        renderAdd={false} // optional
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
