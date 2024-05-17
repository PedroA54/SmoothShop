import {Card,CardContent,CardMedia,Typography,Grid,} from "@mui/material";
import React, { useEffect } from "react";
import AddToCart from "./AddToCart";


function Product({ product }) {
  return (
    <Grid item xs={12} sm={4} md={4} lg={4} xl={4} key={product.id}>
      <Card style={{ backgroundColor: "white" }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.title}
          style={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {product.category}
          </Typography>
          <Typography
            variant="h6"
            color="textPrimary"
            style={{ marginTop: "10px" }}
          >
            ${product.price}
          </Typography>
          <AddToCart id={product.id} />
        </CardContent>
      </Card>
    </Grid>
  );
}

function ProductList({ selectedProduct, productList, setProductList }) {

  useEffect(() => {
    fetch("https://fakestoreapi.com/products") // http request made to url
      .then((response) => response.json()) //once response recieved it is converted to json format
      .then((data) => {
        setProductList(data); //resulting data stored in product list using state setproductlist
      });
  }, );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Latest Arrivals
      </Typography>
      <Grid container spacing={3}>
        {selectedProduct ? (
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            key={selectedProduct.id}
          >
            <Card style={{ backgroundColor: "#FFDAB9" }}>
              <CardMedia
                component="img"
                height="200"
                image={selectedProduct.image}
                alt={selectedProduct.title}
                style={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="h6">{selectedProduct.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {selectedProduct.category}
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{ marginTop: "10px" }}
                >
                  ${selectedProduct.price}
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