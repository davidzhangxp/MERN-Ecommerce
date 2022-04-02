import React, { useContext } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Store } from "../store";
import { MessageBox } from "../components/MessageBox";
import { Link } from "react-router-dom";
import axios from "axios";

export const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateToCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("sorry product is out of stock");
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: quantity },
    });
  };
  const removeCartItem = (item) => {
    dispatch({
      type: "REMOVE_CART_ITEM",
      payload: item,
    });
  };
  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox variant="danger">
              Cart is empty <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={1}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        thumbnail
                        rounded
                      ></Image>{" "}
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        onClick={() => {
                          updateToCartHandler(item, item.quantity - 1);
                        }}
                        disabled={item.quantity === 1}
                      >
                        <i className="fa fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        onClick={() => {
                          updateToCartHandler(item, item.quantity + 1);
                        }}
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fa fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => {
                          removeCartItem(item);
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Total Items: {cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                  Items
                </ListGroup.Item>
                <ListGroup.Item>
                  Total Price:{" "}
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button variant="primary" disabled={cartItems.length === 0}>
                      Proceed to checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
