import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { Store } from "../Store";
import { useContext } from "react";

const Product = (props) => {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="product">
      <Link to={`/product/${product.slug}`}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body className="product-info">
        <Link className="text-decoration-none" to={`/product/${product.slug}`}>
          <Card.Title className="product-title">{product.name}</Card.Title>
        </Link>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item style={{ backgroundColor: "rgb(156, 216, 156)" }}>
          <Rating rating={product.rating} reviewsCount={product.reviewsCount} />
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text>
            <strong style={{ color: "rgb(85, 85, 85)" }}>
              ${product.price}
            </strong>
          </Card.Text>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body style={{ backgroundColor: "rgb(156, 216, 156)" }}>
        {product.InStockCount === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            className="shadow p-3 rounded border-0"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
