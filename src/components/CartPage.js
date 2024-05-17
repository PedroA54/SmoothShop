import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, CircularProgress, Box } from '@mui/material';



function CartPage() {
    const { id } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Load cart items from local storage
    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (savedCartItems) {
            setCartItems(savedCartItems);
        }
    }, []);
    
    // Check if itemId (id) is valid and avoid automatically adding items
    useEffect(() => {
        if (id) {
            setLoading(true);
            fetchItemDetails(id)
                .then((item) => {
                    // Check if item already exists in the cart
                    if (!cartItems.some(cartItem => cartItem.id === item.id)) {
                        const newCartItems = [...cartItems, item];
                        setCartItems(newCartItems);
                        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching item details:', error);
                    setLoading(false);
                });
        }
    }, [id, cartItems]);
    
    const fetchItemDetails = async (itemId) => {
        const response = await fetch(`https://fakestoreapi.com/products/${itemId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch item details');
        }
        const data = await response.json();
        return data;
    };

    const removeFromCart = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const CartItem = ({ item, index }) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.title}
                    sx={{ objectFit: 'contain', padding: 1 }}
                />
                <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Price: ${item.price.toFixed(2)}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeFromCart(index)}
                        >
                            Remove
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );

    const calculateTotalPrice = () => {
        // Calculate total price of cart items
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    return (
        <Container sx={{ paddingTop: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Items in Cart
            </Typography>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {cartItems.map((item, index) => (
                        <CartItem key={index} item={item} index={index} />
                    ))}
                </Grid>
            )}
            <Box sx={{ marginTop: 4, padding: 2, border: '1px solid lightgray', borderRadius: 4 }}>
                <Typography variant="h6">Total Price: ${calculateTotalPrice()}</Typography>
            </Box>
        </Container>
    );
}

export default CartPage;