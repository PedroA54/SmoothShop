import { Card, CardMedia, CardContent, Typography, CircularProgress, Alert, Button, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddToCart from './AddToCart';
import './Style.css';

function Search() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [searchedProduct, setSearchedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Error fetching products.');
                setLoading(false);
            });
    }, []);

    const searchProduct = () => {
        if (selectedProduct) {
            const product = products.find(product => product.id === parseInt(selectedProduct));
            if (product) {
                setSearchedProduct(product);
            } else {
                alert('Product not found.');
            }
        } else {
            alert('Please select a product from the dropdown.');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <label htmlFor="product-select" style={{ marginRight: '10px' }}>Select a product:</label>
                <select
                    id="product-select"
                    value={selectedProduct}
                    onChange={e => setSelectedProduct(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginRight: '10px',
                        fontSize: '14px',
                        width: '200px',
                    }}
                >
                    <option value="">Select a product...</option>
                    {products.map(product => (
                        <option
                            key={product.id}
                            value={product.id}
                            style={{
                                backgroundColor: selectedProduct === product.id ? 'white' : 'transparent',
                            }}
                        >
                            {product.title}
                        </option>
                    ))}
                </select>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={searchProduct}
                    className="search-button"
                >
                    Search
                </Button>
            </div>
            {searchedProduct && (
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <Card sx={{ backgroundColor: 'white', p: 2 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={searchedProduct.image}
                                alt={searchedProduct.title}
                                sx={{ objectFit: 'contain', p: 1 }}
                            />
                            <CardContent className="cardContent-search">
                                <Typography variant="h6">{searchedProduct.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {searchedProduct.category}
                                </Typography>
                                <Typography variant="h6" color="textPrimary" sx={{ mt: 1 }}>
                                    ${searchedProduct.price}
                                </Typography>
                                <AddToCart id={searchedProduct.id} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default Search;
