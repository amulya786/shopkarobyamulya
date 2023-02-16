import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../layout/loginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { clearErrors, loadUser, resetPassword,} from '../../Redux/actions/userAction';
import Loader from './Loader';
import { useNavigate, useParams } from 'react-router-dom';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ResetPasswordToken() {
    const params =  useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading,success } = useSelector((state) => state.forgetPass);
    const [showPass, setShowPass] = useState(false);
    const [input, setInput] = useState({
        newPassword: "",
        confirmPassword: ""
    });


    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert("Password Updated successfully");
            dispatch(loadUser());
            navigate('/login'); 
        }
    }, [dispatch, error,navigate,success]);

    const update = (event) => {
        event.preventDefault();
        const myForm = new FormData();
        myForm.set("newPassword", input.newPassword);
        myForm.set("confirmPassword", input.confirmPassword);
        dispatch(resetPassword(params.id,myForm));
    }
    return (
        <>
        {loading?<Loader/>:<div className="container">
            <div className="LoginSignUpBox " style={{ height: "fit-content", padding: "1rem" }}>
                <h3 style={{ borderBottom: "3px solid tomato", padding: "0.3rem" }}>Forget Password</h3>
                <form onSubmit={update}>
                    <TextField onChange={(e) => setInput({ ...input, newPassword: e.target.value })} value={input.newPassword} required type={showPass ? "text" : "password"} label="New-Password" variant="standard" style={{ margin: "25px 15px", width: "90%" }} />
                    <TextField onChange={(e) => setInput({ ...input, confirmPassword: e.target.value })} value={input.confirmPassword} required type={showPass ? "text" : "password"} label="Confirm-Password" variant="standard" style={{ margin: "25px 15px", width: "90%" }} />
                    <FormControlLabel control={<Checkbox {...label} onClick={() => setShowPass(!showPass)} />} label="Show Password" />
                    <Stack direction="row" spacing={2} style={{ marginTop: "1rem" }}>
                        <Button variant="outlined" size='small' type="submit" color="success" style={{ margin: "auto" }}>
                            Change Password
                        </Button>
                    </Stack>
                </form>
            </div>
        </div>}
        </>
    )
}

export default ResetPasswordToken