import React, { useState, useEffect } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./loginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgetPassword } from '../../Redux/actions/userAction';
import Loader from '../FrontEndUtils/Loader';
import AlertComp from '../AlertComp';

function ForgetPassword() {

    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: ""
    });

    const { loading, error, message } = useSelector((state) => state.forgetPass);

    useEffect(() => {
        if (error) {
            setMsg(error);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (message) {
            setMsg(message);
            setMsgType("info");
            setOpenAlert(true);
        }
    }, [dispatch, error, message]);

    const forgetPassSubmit = (event) => {
        event.preventDefault();
        const form = new FormData();
        form.set("email", input.email);
        dispatch(forgetPassword(form));
    }

    return (
        <>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
            {loading ? <Loader /> : <div className="LoginSignUpBox" style={{ height: "fit-content", padding: "1rem" }}>
                <h3 style={{ borderBottom: "3px solid tomato", padding: "0.3rem" }}>Forget Password</h3>
                <div>
                    <form onSubmit={forgetPassSubmit}>
                        <TextField required onChange={(e) => setInput({ ...input, email: e.target.value })} value={input.email} InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>) }} type="email" label="Email" variant="standard" style={{ margin: "25px 15px", width: "90%" }} />
                        <Stack direction="row" spacing={2} style={{ marginTop: "1rem" }}>
                            <Button variant="outlined" type='submits' color="primary" style={{ margin: "auto" }}>
                                send Mail
                            </Button>
                        </Stack>
                    </form>
                </div>
            </div>}
        </>
    )
}

export default ForgetPassword