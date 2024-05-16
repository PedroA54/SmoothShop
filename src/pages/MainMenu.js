import { Container, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import Search from "../components/Search";
import NewProduct from "../components/NewProduct";



    function MainMenu() {
    const [productList, setProductList] = useState([]);
    
    // Function to add a new product to the product list
    const addProduct = (formData) => {
        // Append the new product to the existing product list
        setProductList([...productList, formData]);
    };
    
    return (
        <div className="Home">
            <h1 className="main-title-menu">SmoothShop</h1>
            
            <Link to="/product/:id">
                <Button className="shop-button">Checkout</Button>
            </Link>
            
            <Link to="/">
                <Button className="smooth-shop">SmoothShop</Button>
            </Link>
            
            <Container>
                <br />
                <Search />
                <br />
                <ProductList productList={productList} setProductList={setProductList} />
                <br />
                <NewProduct addProduct={addProduct} />
            </Container>
        </div>
    );
}


export default MainMenu;