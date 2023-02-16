import React, { useRef, useState, useEffect } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./loginSignUp.css";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from '../../Redux/actions/userAction';
import Loader from '../FrontEndUtils/Loader';
import ForgetPassword from './ForgetPassword';
import AlertComp from '../AlertComp';

function LoginSignUp() {
    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const switcherTab = useRef(null);
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const [forgetToggle, setForgetToggle] = useState(false);
    const [input, setInput] = useState({
        email: "",
        pass: ""
    });
    const [avatar, setAvatar] = useState('/profile.jpg');
    const [avatarPreview, setAvatarPreview] = useState('/profile.jpg');
    const [cpass, setpass] = useState("");
    const { loading, error, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            setMsg(error);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate("/account");
        }
    }, [dispatch, error, navigate, isAuthenticated]);


    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => { // ye function tabhi call hoga jab isme file add hogi uske liye niche readAsDataURL set kar de toh error remove
                if (reader.readyState === 2) { // baically iski 3 state hoti h 0 -> initial  1 -> processing 2 -> done     
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = user;


    const loginSubmit = (event) => {
        event.preventDefault();
        dispatch(login(input.email, input.pass));
    }

    const registerSubmit = (event) => {
        event.preventDefault();
        console.warn("user is ", user);
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm))
    }


    const switchersTab = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");

        }
    };
    
    return (
        <>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert}/>}
            <div className="container">
                {loading ? <Loader /> : <div className="LoginSignUpContainer">
                    {forgetToggle ? <ForgetPassword /> : <div className="LoginSignUpBox">
                        <div>
                            <div className="login_signUp_toggle">
                                <p onClick={(e) => switchersTab(e, "login")}>Login</p>
                                <p onClick={(e) => switchersTab(e, "register")}>Register</p>
                            </div>
                            <div className='btnShift' ref={switcherTab} style={{ margin: "0rem" }}></div>
                        </div>
                        <div className="formContainer">
                            <div className="loginForm" ref={loginTab}>
                                <form onSubmit={loginSubmit}>
                                    <TextField required onChange={(e) => setInput({ ...input, email: e.target.value })} value={input.email} InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>) }} type="email" label="Email" variant="filled" style={{ margin: "25px 15px", width: "90%" }} />
                                    <TextField onChange={(e) => setInput({ ...input, pass: e.target.value })} value={input.password} required type="password" label="Password" variant="filled" style={{ margin: "25px 15px", width: "90%" }} />
                                    <p id='forgetPassword' onClick={()=>setForgetToggle(true)}>Forget password ?</p>
                                    <Stack direction="row" spacing={2} style={{ marginTop: "1rem" }} className="loginBtn">
                                        <Button variant="outlined" type='submits' color="primary" style={{ margin: "auto" }}>
                                            Login
                                        </Button>
                                    </Stack>
                                </form>
                            </div>
                            <div className="registerForm" ref={registerTab}>
                                <form onSubmit={registerSubmit}>
                                    <TextField name='name' onChange={registerDataChange} InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>) }} size={window.innerWidth < 700 ? "small" : "medium"} type="text" label="Name*" variant="filled" style={{ margin: "5px 15px", width: "90%" }} />
                                    <TextField name='email' onChange={registerDataChange} required InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>) }} size={window.innerWidth < 700 ? "small" : "medium"} type="email" label="Email*" variant="filled" style={{ margin: "5px 15px", width: "90%" }} />
                                    <TextField name='password' onChange={registerDataChange} size={window.innerWidth < 700 ? "small" : "medium"} type="password" label="password*" variant="filled" style={{ margin: "5px 15px", width: "90%" }} />
                                    <TextField name='confirmPassword' onChange={(e) => setpass(e.target.value)} value={cpass} size={window.innerWidth < 700 ? "small" : "medium"} type="password" label="Confirm Password*" variant="filled" style={{ margin: "5px 15px", width: "90%" }} />
                                    {/* <TextField size={window.innerWidth < 700 ? "small" : "small"} className="registerImg" type="file" style={{ margin: "5px 15px", width: "90%"}} /> */}
                                    <div className='chooseFileAvatar'>
                                        <img src={avatarPreview} alt="" />
                                        <div>
                                            <input name='avatar' onChange={registerDataChange} type="file" style={{ margin: "5px 15px", width: "90%" }} className="registerImg" />
                                        </div>
                                    </div>
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="outlined" color="primary" style={{ margin: "-5px auto" }} type="submit">
                                            Register
                                        </Button>
                                    </Stack>
                                </form>
                            </div>
                        </div>
                    </div>}
                </div>}
            </div>
        </>
    )
}

export default LoginSignUp