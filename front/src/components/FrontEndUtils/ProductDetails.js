import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetail, newReview } from '../../Redux/actions/productActions';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import Loader from './Loader';
import "./productDetails.css";
import ProductReviews from './ProductReviews';
import { addItemsToCart } from '../../Redux/actions/cartAction';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { NEW_REVIEW_RESET } from '../../Redux/constants/productConstants';
import AlertComp from '../AlertComp';
import MetaData from './MetaData';

const ProductDetails = (props) => {
    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [quantity, setquantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetail);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const options = {
        readOnly: true,
        value: product && product.ratings,
        precision: 0.5,
        size: window.innerWidth < 600 ? "large" : "small",
        style: { color: "tomato" },
    }
    const increase = () => {
        if (product && product.stock <= quantity) return;
        setquantity(quantity + 1);
    }
    const decrease = () => {
        if (1 >= quantity) return;
        setquantity(quantity - 1);
    }
    useEffect(() => {
        if (error) {
            setMsg(error);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (reviewError) {
            setMsg(reviewError);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (success) {
            setMsg("Review submitted SuccessFully");
            setMsgType("info");
            setOpenAlert(true);
            dispatch({ type: NEW_REVIEW_RESET });
            // dispatch(getProductDetail(id))
        }
        dispatch(getProductDetail(id));
    }, [dispatch, id, error, reviewError, success]);

    const addToCartItems = () => {
        dispatch(addItemsToCart(id, quantity));
        setMsgType("success");
        setMsg("Item added to cart successfully");
        setOpenAlert(true);

    }
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }
    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
        dispatch(newReview(myForm));
        setOpen(false);

    }
    return (
        <>  
            <MetaData title="products"/>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert}/>}
            {loading ? <Loader /> : <div className='productDetailContainer'>
                <div className='productImages'>
                    <Carousel className='carosel' sx={{ zIndex: 0 }}>
                        {
                            product && product.images.map((items, i) =>
                                <img
                                    key={i}
                                    src={items.url}
                                    alt={`${i} Slide`}
                                />
                            )
                        }
                    </Carousel>
                </div>
                <div className='productDetail' >
                    <h2>{product && product.name}</h2>
                    <h6>Product-id ({product && product._id})</h6>
                    <hr />
                    <div className='rating'><Rating {...options} /> <span>({product && product.numOfReviews} Reviews)</span>
                        <button className='submitReviews' onClick={submitReviewToggle}>Submit Reviews</button>
                    </div>
                    <hr />
                    <h1 className='price'>₹{product && product.price}</h1>
                    <span className='addSubButton'><button onClick={decrease}>-</button><input readOnly type="number" value={quantity} onChange={(e) => setquantity(e.target.value)} /><button onClick={increase}>+</button></span>
                    {/* <Stack spacing={2} direction="row"> */}
                    <span className="btn">
                        <Button sx={{ color: "tomato", marginRight: "1rem" }} disabled={product && product.stock < 1 ? true : false} className='addtocartBtn' onClick={addToCartItems}>Add to Cart</Button>
                        <Button sx={{ color: "tomato", marginRight: "1rem" }} className='addtocartBtn' onClick={() => navigate('/cart')}>Check Out</Button>
                    </span>
                    {/* </Stack> */}
                    <hr />
                    <span>Status:<span className={(product && product.stock < 1) ? "outStocks" : "inStocks"}>{product && product.stock < 1 ? <span>Out of Stocks</span> : <span>InStocks</span>}</span></span>
                    <hr />
                    <h4 className='discription'>Discription</h4>
                    <p className='discriptionPara'>{product && product.description}</p>

                </div>
            </div>}
            <hr />
            <h1 className='reviews'>Reviews</h1>
            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
            >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className='submitDialog'>
                    <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                    />
                    <textarea className='submitDialogTextArea' value={comment} onChange={e => setComment(e.target.value)} cols="30" rows="5"></textarea>
                    <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                        <Button onClick={reviewSubmitHandler}>Submit</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <div className='reviewCont'>
                {product && (product.reviews.length > 0) ?
                    product.reviews.map((item, i) =>
                        <ProductReviews reviews={item} key={i} loading={loading} />
                    )
                    : <h2 className='whenNothingPreview'>no reviews</h2>}
            </div>
        </>
    )
}

export default ProductDetails