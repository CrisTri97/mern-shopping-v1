import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button style={{ padding: 10, marginTop: 20 }} onClick={handleClick}>
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
