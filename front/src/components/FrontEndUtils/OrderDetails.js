import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import { getOrderDetails, clearErrors } from '../../Redux/actions/orderAction'
import Loader from './Loader';
import './orderDetails.css';
import AlertComp from '../AlertComp';
function OrderDetails() {

    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const params = useParams();

    const { order, error, loading } = useSelector(state => state.orderDetails);
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            setMsg(error);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [error, dispatch, params]);
    return (
        <>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
            {
                loading ? <Loader /> : <div className="container">
                    <Box sx={{ marginTop: "2rem", marginLeft: "2rem", width: '80%' }}>
                        <h1 className='orderIdNoCssInOrderDetails'>
                            Order #{order && order._id}
                        </h1>
                        <div className="orderDetails">
                            <h3 className='orderDetailsHeading'>
                                Shipping Information
                            </h3>
                            <div className="Details">
                                <p>Name : {order && order.shippingInfo.firstName} {order && order.shippingInfo.lastName}</p>
                                <p>Phone No. : {order && order.shippingInfo.phoneNo}</p>
                                <p>Address : {order && order.shippingInfo.address},{order && order.shippingInfo.city},{order && order.shippingInfo.state}</p>
                            </div>
                        </div>
                        <div className="orderDetails">
                            <h3 className='orderDetailsHeading'>
                                Payment
                            </h3>
                            <div className="Details">
                                <span> Status : </span><span className={order && order.paymentInfo.status === 'succeeded' ? "greenColor" : "redColor"}>{order && order.paymentInfo.status === 'succeeded' ? "PAID" : "NOT PAID"}</span>
                                <p>Amount : {order && order.paymentInfo.status === 'succeeded' ? order && order.totalPrice : null}</p>
                            </div>
                        </div>
                        <div className="orderDetails">
                            <h3 className='orderDetailsHeading'>
                                Order Status
                            </h3>
                            <div className='Details'>
                                <p className={order && order.orderStatus === 'Processing' ? "redColor" : "greenColor"}>{order && order.orderStatus}</p>
                            </div>
                        </div>
                        <hr />
                        <h3 className='orderDetailsHeading'>
                            Order Items:
                        </h3>
                        {order && order.orderItems.map((item, i) =>
                            <>
                                <div className="orderedItems">
                                    {/* <div> */}
                                    <img src={item.image} alt="img not loaded" />
                                    <h6>{item.name}</h6>
                                    {/* </div> */}
                                    <p>{item.price}x{item.quantity}={item.price * item.quantity}</p>
                                </div>
                            </>
                        )}
                        <hr />
                    </Box>

                </div>
            }
        </>
    )
}

export default OrderDetails