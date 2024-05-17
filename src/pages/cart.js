import { Link } from "react-router-dom";
import { Container, Button } from "@mui/material";
import CartPage from '../components/CartPage';
import '../components/Style.css'; 



function Cart() {
    return (
        <div className="cart-container">
            <h1 className="main-title-cart">SmoothShop</h1>
            
            <Link to="/shop">
                <Button className="shop-button">SHOP</Button>
            </Link>
            
            <Link to="/">
                <Button className="checkout-smooth-shop-button">SmoothShop</Button>
            </Link>
            
            <Container>
                <br />
                <CartPage />
                <br />
            </Container>
        </div>
    );
}

export default Cart;