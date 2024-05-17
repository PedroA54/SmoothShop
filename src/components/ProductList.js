import React, { useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid} from "@mui/material";
import AddToCart from "./AddToCart";

function Product({ product }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={product.id}>
      <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent className="cardContent" style={{ flexGrow: 1, height: '100%' }}>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {product.category}
          </Typography>
          <Typography variant="body2" color="textPrimary" style={{ marginTop: 8 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <AddToCart id={product.id} />
        </CardContent>
      </Card>
    </Grid>
  );
}

function ProductList({ selectedProduct, productList, setProductList }) {
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProductList(data);
      });
  },[] );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Latest Arrivals
      </Typography>
      <Grid container spacing={2}>
        {selectedProduct ? (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={selectedProduct.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={selectedProduct.image}
                alt={selectedProduct.title}
                sx={{ objectFit: 'contain', padding: 1 }}
              />
              <CardContent>
                <Typography variant="h6">{selectedProduct.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {selectedProduct.category}
                </Typography>
                <Typography variant="body2" color="textPrimary" style={{ marginTop: 8 }}>
                  ${selectedProduct.price.toFixed(2)}
                </Typography>
                <AddToCart id={selectedProduct.id} />
              </CardContent>
            </Card>
          </Grid>
        ) : (
          productList.map((product) => <Product product={product} key={product.id} />)
        )}
      </Grid>
    </div>
  );
}

export default ProductList;
