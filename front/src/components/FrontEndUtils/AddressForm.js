import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Country, State } from 'country-state-city'
import FormControl from '@mui/material/FormControl';
import { useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSelector,useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { saveShippingInfo } from '../../Redux/actions/cartAction';
export default function AddressForm({ enableBtn }) {
    const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [countryCode, setcountryCode] = useState("IN");
  const [info, setInfo] = useState({
    firstName: shippingInfo.firstName ? shippingInfo.firstName : "",
    lastName: shippingInfo.lastName ? shippingInfo.lastName : "",
    address: shippingInfo.address ? shippingInfo.address : "",
    city: shippingInfo.city ? shippingInfo.city : "",
    state: shippingInfo.state ? shippingInfo.state : "",
    country: shippingInfo.country ? shippingInfo.country : "",
    pinCode: shippingInfo.pinCode ? shippingInfo.pinCode : "",
    phoneNo: shippingInfo.phoneNo ? shippingInfo.phoneNo : "",
  });
  const [validation, setValidation] = useState({
    firstName: true,
    address: true,
    city: true,
    state: true,
    country: true,
    pinCode: true,
    phoneNo: true
  });
  const changeHandler = (e) => {
    if (!(e.target.name === 0)) // this will run when the first time run 
      setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const submit = () => {
    // let validate = true;
    // if (info.firstName === "" || info.firstName.length < 3) {
    //   alert("check");
    //   setValidation({ ...validation, firstName: false });
    //   validate = false;
    // }
    // alert(JSON.stringify(validation));
    // if (info.address === "" || info.address === "") {
    //   validate = false;
    //   setValidation({ ...validation, address: false });
    // }
    // if (info.city==="" || info.city === "") {
    //   validate = false;
    //   setValidation({ ...validation, city: false });
    // }
    // if (info.state==="" ||  info.state === "") {
    //   validate = false;
    //   setValidation({ ...validation, state: false });
    // }
    // if (info.country==="" ||  info.country === "") {
    //   validate = false;
    //   setValidation({ ...validation, country: false });
    // }
    // if (info.pinCode==="" ||  info.pinCode.length > 6) {
    //   validate = false;
    //   setValidation({ ...validation, pinCode: false });
    // }
    // if (info.phoneNo==="" ||  info.phoneNo.length < 10) {
    //   validate = false;
    //   setValidation({ ...validation, phoneNo: false });
    // }
    enableBtn(true);
    dispatch(saveShippingInfo(info));
    // if (validate) {
    // } else {
    //   alert(JSON.stringify(validation));
    // }
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address {countryCode}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            error={!validation.firstName}
            autoComplete="given-name"
            variant="standard"
            onChange={changeHandler}
            value={info.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={changeHandler}
            value={info.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address"
            label="Address line 1"
            fullWidth
            error={!validation.address}
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={changeHandler}
            value={info.address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ m: 0.5, minWidth: "100%" }} size="small">
            <InputLabel id="country">Country</InputLabel>
            <Select
              required
              labelId="demo-select-small"
              id="demo-select-small"
              name="country"
              label="Country"
              fullWidth
              error={!validation.country}
              autoComplete="shipping country"
              value={info.country}
              defaultValue=""
              onChange={(e) => {setInfo({ ...info, country: e.target.value })}}
            >
              {Country && Country.getAllCountries().map((item) =>
                <MenuItem value={item.isoCode} key={item.isoCode} v={item.isoCode}>{item.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ m: 0.5, minWidth: "100%" }} size="small">
            <InputLabel id="state">State</InputLabel>
            <Select
              required
              id="state"
              name="state"
              label="State"
              fullWidth
              error={!validation.state}
              autoComplete="shipping state"
              value={info.state}
              defaultValue=""
              onChange={(e) => setInfo({ ...info, state: e.target.value })}
            >
              {State && State.getStatesOfCountry(info.country).map((item) =>
                <MenuItem value={item.name} key={item.isoCode}>{item.name}</MenuItem>
              )}

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            error={!validation.city}
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={changeHandler}
            value={info.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="pinCode"
            label="Zip / Postal code"
            fullWidth
            error={!validation.pinCode}
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={changeHandler}
            value={info.pinCode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneNo"
            name="phoneNo"
            label="Phone Number"
            fullWidth
            type="Number"
            error={!validation.phoneNo}
            autoComplete="phoneNo"
            variant="standard"
            onChange={changeHandler}
            value={info.phoneNo}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
          <div className="submitAddBtn">
            <Button color="secondary" name="saveAddress" value="yes" onClick={submit} >Submit</Button>
          </div>
          {/* <FormControlLabel
            control={}
            label="Given details are correct"
          /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}