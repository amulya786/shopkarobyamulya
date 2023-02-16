import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardCvcElement, CardNumberElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from 'axios';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { clearErrors, createOrder } from '../../Redux/actions/orderAction';
import AlertComp from '../AlertComp';

export default function PaymentForm({ Step }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [msg, setMsg] = useState("");
  const [paybtn, setPaybtn] = useState(false);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);


  const paymentData = {
    amount: Math.round(orderInfo && orderInfo.total * 100), //*100 is lliye kyuki useStripe amount ko paise me leta h
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.SubTotal,
    taxPrice: orderInfo.GST,
    shippingPrice: orderInfo.shippingCharge,
    totalPrice: orderInfo.total
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    setPaybtn(true)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };
      const { data } = await axios.post("/api/v1/payment/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) {
        setMsg("Please enter the correct input field");
        setMsgType("error");
        setOpenAlert(true);
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo && shippingInfo.address,
              city: shippingInfo && shippingInfo.city,
              state: shippingInfo && shippingInfo.state,
              postal_code: shippingInfo && shippingInfo.pinCode,
              country: shippingInfo && shippingInfo.country
            }
          }
        }
      }
      );
      if (result.error) {
        setPaybtn(false);
        setMsg(result.error.message);
        setMsgType("error");
        setOpenAlert(true);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          };
          Step(3);
          dispatch(createOrder(order));
          // navigate("/success");
          // alert("payment success");
        } else {
          setMsg("their is an error while payment");
          setMsgType("error");
          setOpenAlert(true);
        }
      }
    } catch (error) {
      setPaybtn(false);

      setMsg(error.response.data.message);
      setMsgType("error");
      setOpenAlert(true);
    }
  }
  useEffect(() => {
    if (error) {
      setMsg(error);
      setMsgType("error");
      setOpenAlert(true);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  return (
    <>

      {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <form onSubmit={(e) => submitHandler(e)}>
          <Grid container justifyContent="center" paddingLeft="20%" rowSpacing={4} direction="column">
            <Grid item xs={12} md={6} justifyContent="center">
              <div className='cardTextContainer'><CreditCardIcon /><CardNumberElement className='paymentInput' /></div>
              <p className='cardNoTest'>Use this Test Card No: 4000000000003220</p>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className='cardTextContainer'><EventIcon /><CardExpiryElement className='paymentInput' /></div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className='cardTextContainer'><VpnKeyIcon /><CardCvcElement className='paymentInput' /></div>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              type="submit"
              disabled={paybtn}
              sx={{ mt: 3, ml: 1 }}
            >
              Pay -  ₹{orderInfo && orderInfo.total}
            </Button>
          </Box>
        </form>
      </React.Fragment>
    </>
  );
}