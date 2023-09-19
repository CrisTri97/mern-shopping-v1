import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import shopping from "../images/shopping-logo.png";

const KEY =
  "pk_test_51LlOJeHqATeXA76rXmnJnoutHHZMRk2okLZyMOKZhrOIHUas2xxKqfSePW3oJ3YAYuSd3Ay4bFKUxki3WfHDtX1Y00Vhlef5uC";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          `${process.env.BACKEND_URL}/checkout/payment`,
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );

        navigate("/success");
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {stripeToken ? (
        <span>Processing. Please wait ....</span>
      ) : (
        <StripeCheckout
          name="Shopping Go"
          image={shopping}
          billingAddress
          shippingAddress
          description="Your total is $20"
          amount={2000}
          token={onToken}
          stripeKey={KEY}>
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}>
            Pay Now
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
