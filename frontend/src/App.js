import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/esm/Badge";
import Nav from "react-bootstrap/Nav";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import CartScreen from "./components/screens/CartScreen";
import SigninScreen from "./components/screens/SigninScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import ShippingAddressScreen from "./components/screens/ShippingAddressScreen";
import SignupScreen from "./components/screens/SignupScreen";
import PaymentMethodScreen from "./components/screens/PaymentMethodScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";
import OrderScreen from "./components/screens/OrderScreen";
import OrderHistoryScreen from "./components/screens/OrderHistoryScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import { Parallax } from "react-scroll-parallax";

function App() {
  const location = useLocation();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [night, setNight] = useState(false);
  const { cart, userInfo } = state;
  const [icon, setIcon] = useState("sun");

  const progressChangeHandler = (progress) => {
    console.log(progress);
    if (progress >= 0.8 && icon === "sun") {
      setIcon("moon");
      setNight(true);
    }
    if (progress <= 0.9 && icon === "moon") {
      setIcon("sun");
      setNight(false);
    }
    if (progress >= 0.5 && icon === "sun" && night) {
      setNight(false);
    }
    if (progress <= 0.5 && !night) {
      setNight(true);
    }
  };

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    <div
      className="d-flex flex-column site-container"
      style={night ? { backgroundColor: "#001220" } : {}}
    >
      <ToastContainer position="bottom-center" limit={1} />
      <header className="App-header">
        <Navbar
          className="navbar shadow-sm"
          fixed="top"
          style={{
            backgroundColor: "rgb(156, 216, 156)",
          }}
          variant="light"
          expand="lg"
        >
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Riverside</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto  w-100  justify-content-end">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      {location.pathname === "/" ? (
        <Parallax speed={50}>
          <div className="icon-container">
            <Parallax
              onProgressChange={(num) => progressChangeHandler(num)}
              rotate={[0, 220]}
              speed={-175}
              startScroll={-1000}
              endScroll={1200}
            >
              <div
                className={
                  icon === "sun" ? "fa-solid fa-sun" : "fa-solid fa-moon"
                }
              ></div>
            </Parallax>
          </div>

          <div className="bg2"></div>
          <section className="topBg">
            <Parallax speed={50} startScroll={-500} endScroll={500}>
              <div className="background-title">RiverSide</div>
            </Parallax>
          </section>
        </Parallax>
      ) : (
        ""
      )}

      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </Container>
        <div style={{ height: "100px" }}></div>
      </main>
    </div>
  );
}

export default App;
