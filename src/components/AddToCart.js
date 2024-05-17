import React from 'react';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "./Style.css";


const AddToCart = ({ id }) => {
    const handleAddToCart = () => {
        console.log('Item added to cart!');
    };
    
    return (
        
        <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
            <Button
            onClick={handleAddToCart}
            className="add-to-cart-button"
        >
            Add to Cart
        </Button>
        </Link>  
        
    );
};

export default AddToCart;