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
                variant="contained"
                color="primary"
                sx={{
                        backgroundColor: '#D2B48C',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        cursor: 'pointer',
                        border: 'none',
                
                }}
                >
                Add to Cart
            </Button>
        </Link>  
        
    );
};

export default AddToCart;