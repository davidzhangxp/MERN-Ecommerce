import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { ProductScreen } from "./screens/ProductScreen";
import { LinkContainer } from "react-router-bootstrap";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { Store } from "./store";
import { CartScreen } from "./screens/CartScreen";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container fluid>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <h1>Lucy Store</h1>
                </Navbar.Brand>
              </LinkContainer>
              <Nav>
                <Link to="/cart">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container fluid>
            <Routes>
              <Route path="/" element={<HomeScreen />}></Route>
              <Route path="/product/:slug" element={<ProductScreen />}></Route>
              <Route path="/cart" element={<CartScreen />}></Route>
            </Routes>
          </Container>
        </main>
        <footer className="text-center">Copyright 2022</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
