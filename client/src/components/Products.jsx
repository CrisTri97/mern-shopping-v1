import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const backEndUrl = "https://backend-shopping-v1.onrender.com/api";
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  console.log("check19", backEndUrl);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `${backEndUrl}/products/?category=${cat}`
            : `${backEndUrl}/products`
        );

        setProducts(res.data);
      } catch (error) {
        setProducts([]);
        console.log(error);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].toLowerCase().includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  console.log("checkProductState", products);
  if (!products[0]?._id) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      {cat
        ? filteredProducts.map((item, index) => (
            <Product key={index} item={item} />
          ))
        : products
            .slice(0, products.length)
            ?.map((item, index) => <Product key={index} item={item} />)}
    </Container>
  );
};

export default Products;
