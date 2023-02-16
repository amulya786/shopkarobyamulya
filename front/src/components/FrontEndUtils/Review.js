import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

export default function Review() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const SubTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0.0);
  const shippingCharge = SubTotal<1000?200.0:0.0;
  const GST = SubTotal*0.18;
  const addresses = [shippingInfo.address, " Area Pin-" + shippingInfo.pinCode, shippingInfo.city, shippingInfo.state, shippingInfo.country];
  const total = SubTotal+shippingCharge+GST;
  const data={
    SubTotal,
    shippingCharge,
    GST,
    total
  }
  sessionStorage.setItem("orderInfo",JSON.stringify(data));

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((item) => (
          <ListItem key={item.name} sx={{ py: 1, px: 0 }}>
            <div className='cartImage'>
              <img src={item.image} alt="noImg" />
            </div>
            <ListItemText primary={item.name} />
            <Typography variant="body2"><span>{item.quantity}x{item.price}</span>=<strong>₹{item.quantity * item.price}</strong></Typography>
          </ListItem>
        ))}
        <hr />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText  secondary="Sub-Total" />
          <Typography variant="body2">₹{SubTotal}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText  secondary="Shipping Charge" />
          <Typography variant="body2">₹{shippingCharge}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText  secondary="GST 18%" />
          <Typography variant="body2">₹{GST}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          ₹{SubTotal+shippingCharge+GST}
          </Typography>
        </ListItem>
      </List>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{shippingInfo.firstName} {shippingInfo.lastName}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}