import React from 'react'
import ProfileLogo from '../../profileLogo.png'
import Rating from '@mui/material/Rating';
function ProductReviews({ reviews }) {
    const option = { 
        readOnly:true,
        precision:0.5,
        size: window.innerWidth < 600 ? "larger" : "small",
        value:reviews.rating,
        style:{color:"tomato"},
    }
    return (
        <>
        <div className='reviewContainer'>
            <div className='profile'>
                <img src={ProfileLogo} alt="" className='reviewerProfileImg' />
                <h2>{ reviews.name}</h2>
                <h1 className='ratingStars'><Rating {...option} /></h1>
            </div>
            <p className='commentReviews'>{reviews.comment}</p>
        </div></>
    )
}

export default ProductReviews;