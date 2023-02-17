import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Loader from '../../FrontEndUtils/Loader';
import { clearErrors, getOrderDetails, updateOrder } from '../../../Redux/actions/orderAction';
import SideBarForDashboard from './SideBarForDashboard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { Button } from '@mui/material';
import { UPDATE_ORDER_RESET } from '../../../Redux/constants/orderConstant';
import AlertComp from '../../AlertComp';

function ProcessOrder() {
    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const params = useParams();
    const [statusCategory, setStatusCategory] = useState("");
    const { order, error, loading } = useSelector(state => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector(state => state.order);
    const dispatch = useDispatch();
    const updateOrderProcessHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", statusCategory);

        dispatch(updateOrder(params.id, myForm));
    }
    useEffect(() => {
        if (error) {

            setMsg(error);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (updateError) {

            setMsg(updateError);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            // alert("Status Updated successfully");
            setMsg("Status Updated successfully");
            setMsgType("success");
            setOpenAlert(true);
            dispatch({ type: UPDATE_ORDER_RESET });

        }
        dispatch(getOrderDetails(params.id));
    }, [error, dispatch, params, isUpdated, updateError]);
    return (
        <>

            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
            <div className="container">
                <SideBarForDashboard />
                <div className='productsListContainer'>
                    {loading ? <Loader /> :
                        <Box sx={{ marginTop: "2rem", marginLeft: "2rem", width: '80%' }}>
                            <h1 className='orderIdNoCssInOrderDetails'>
                                Order #{order && order._id}
                            </h1>
                            <div className="processingOrder">
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
                                        <p className={order && order.orderStatus === 'Processing' ? "redColor" : order && order.orderStatus === 'Shipped' ? "blueColor" : "greenColor"}>{order && order.orderStatus}</p>
                                    </div>
                                </div>
                                <div className="processingOrderForm" style={{
                                    display: order && order.orderStatus === 'Delivered' ? "none" : "flex"
                                }}>
                                    <form onSubmit={updateOrderProcessHandler}>
                                        {/* <select name="" value={statusCategory} onChange={(e)=>setStatusCategory(e.target.value)} id="">
                                        <option value="">Choose Status</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="shipped">Shipped</option>
                                    </select> */}
                                        <FormControl className='formControl'>
                                            <InputLabel id="demo-simple-select-label">status</InputLabel>
                                            <Select

                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                className='processingSelect'
                                                value={statusCategory}
                                                label="status"
                                                onChange={(e) => setStatusCategory(e.target.value)}
                                            >
                                                {order && order.orderStatus === 'Processing' && <MenuItem value="Shipped" className='statusSelect'>Shipped</MenuItem>}
                                                {order && order.orderStatus === 'Shipped' && <MenuItem value="Delivered" className='statusSelect'>Delivered</MenuItem>}
                                            </Select>
                                            <Button type='submit' disabled={statusCategory === "" ? true : false}>{statusCategory === "" ? "Select to active" : "Create"}</Button>
                                        </FormControl>
                                    </form>
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
                        </Box>}
                </div>
            </div>
        </>
    )
}


export default ProcessOrder;