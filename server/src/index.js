const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const app = express();

app.use(express.json());
app.use(cors());
//connect mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connect to database successful!"))
  .catch((e) => console.log("Connect database failed!: " + e));

//Router
app.get("/api", () => {
  return res.status(200).json("call api success");
});
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/auth", authRoute);
app.use("/api/checkout", stripeRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running!: " + PORT);
});
