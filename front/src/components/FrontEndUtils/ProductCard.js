import React from 'react'
import "./product.css"
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
function ProductCard({ product }) {

    const options = {
        readOnly:true,
        precision:0.5,
        size: window.innerWidth < 600 ? "larger" : "small",
        style:{color:"tomato"},
        value: product.ratings,

    }
    return (
            <Link className='productCard' to={`/products/${product._id}`}>
                <img src={product.images[0].url} alt={product.name} />
                <p>{product.name}</p>
                <div>
                    <Rating {...options} /><span>({product.numOfReviews} reviews)</span>
                </div>
                <h4>₹{product.price}</h4>
            </Link>
    )
}

export default ProductCard