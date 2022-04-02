import React, { useState, useEffect, useReducer } from "react";
import { Product } from "../components/Product";
import axios from "axios";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { Col, Row } from "react-bootstrap";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: false,
    products: [],
  });
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  useEffect(() => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const fetchData = async () => {
        const { data } = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      };
      fetchData();
    } catch (error) {
      dispatch({ type: "FETCH_FAIL" });
    }
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
