import axios from "axios";
import { useContext } from "react";
import { Badge, Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../store";
import Rating from "./Rating";

export const Product = (props) => {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("sorry product is out of stock");
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: quantity },
    });
  };
  return (
    <Card key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <Image src={product.image} alt={product.name} fluid />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/product/${product.slug}`}>
            <h2>{product.name}</h2>
          </Link>
        </Card.Title>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        {product.countInStock > 0 ? (
          <Button onClick={addToCartHandler} className="btn-primary">
            Add to cart
          </Button>
        ) : (
          <Badge bg="danger">Out of Stock</Badge>
        )}
      </Card.Body>
    </Card>
  );
};
