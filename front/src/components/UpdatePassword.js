import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../components/layout/loginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updatePassword } from '../Redux/actions/userAction';
import Loader from './FrontEndUtils/Loader';
import { UPDATE_USER_RESET } from '../Redux/constants/userConstants';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AlertComp from './AlertComp';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function UpdatePassword({ setTogg,alertmsg, open  }) {
  const [openAlert, setOpenAlert] = useState(true);
  const [msgType, setMsgType] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [showPass, setShowPass] = useState(false);
  const [input, setInput] = useState({
    oldpassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const val = () => {
    setTogg(false);
    alertmsg("Password Updated Successfully");
    open(true);
};
  useEffect(() => {
    if (error) {
      setMsg(error);
      setMsgType("error");
      setOpenAlert(true);
      dispatch(clearErrors());
    }
    if (isUpdated) {

      setOpenAlert(true);
      setMsg("Updated Successfully");
      setMsgType("success");
      
      dispatch(loadUser());
      dispatch({
        type: UPDATE_USER_RESET
      });
    }
  }, [dispatch, error, isUpdated]);

  if (isUpdated) {
    val();
  }
  const update = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("oldpassword", input.oldpassword);
    myForm.set("newPassword", input.newPassword);
    myForm.set("confirmPassword", input.confirmPassword);
    dispatch(updatePassword(myForm));
  }
  return (
    <>

      {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
      {loading ? <Loader /> :
        <div className='profile container'>
          <form onSubmit={update}>
            <TextField onChange={(e) => setInput({ ...input, oldpassword: e.target.value })} value={input.oldpassword} required type={showPass ? "text" : "password"} label="Old-Password" variant="standard" style={{ margin: "25px 15px", width: "90%" }} />
            <TextField onChange={(e) => setInput({ ...input, newPassword: e.target.value })} value={input.newPassword} required type={showPass ? "text" : "password"} label="New-Password" variant="standard" style={{ margin: "25px 15px", width: "90%" }} />
            <TextField onChange={(e) => setInput({ ...input, confirmPassword: e.target.value })} value={input.confirmPassword} required type={showPass ? "text" : "password"} label="Confirm-Password" variant="standard" style={{ margin: "25px 15px", width: "90%" }} />
            <FormControlLabel control={<Checkbox {...label} onClick={() => setShowPass(!showPass)} />} label="Show Password" />
            <Stack direction="row" spacing={2} style={{ marginTop: "1rem" }}>
              <Button variant="outlined" size='small' type="submit" color="success" style={{ margin: "auto" }}>
                Update
              </Button>
              <Button variant="outlined" onClick={val} color="secondary" style={{ margin: "auto" }}>
                Cancel
              </Button>
            </Stack>
          </form>
        </div>}
    </>
  )
}

export default UpdatePassword