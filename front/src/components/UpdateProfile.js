import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../components/layout/loginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from '../Redux/actions/userAction';
import Loader from './FrontEndUtils/Loader';
import { UPDATE_USER_RESET } from '../Redux/constants/userConstants';
import AlertComp from './AlertComp';

function UpdateProfile({ userData, setTogg, alertmsg, open }) {
    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("info");
    const [msg, setMsg] = useState("");


    const dispatch = useDispatch();
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [input, setInput] = useState({
        email: userData.email,
        name: userData.name
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState('/profile.jpg');

    const val = () => {

        setTogg(false);
        alertmsg("Profile Updated Successfully");
        open(true);
    };

    useEffect(() => {
        if (error) {
            setMsgType("error");
            setMsg(error);
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            // setMsg("Profile updated successfully");
            // setMsgType("warning");
            // setOpenAlert(true);
            dispatch(loadUser());
            dispatch({
                type: UPDATE_USER_RESET
            });
        }
    }, [dispatch, error, isUpdated]);

    if (isUpdated) {
        val();
    }

    const reset = () => {
        setInput({
            name: userData.name,
            email: userData.email
        })
        setAvatarPreview("/profile.jpg");
        setAvatar("");
    }

    const changeHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => { // ye function tabhi call hoga jab isme file add hogi uske liye niche readAsDataURL set kar de toh error remove
            if (reader.readyState === 2) { // baically iski 3 state hoti h 0 -> initial  1 -> processing 2 -> done     
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);

    }

    const update = (event) => {
        event.preventDefault();
        const myForm = new FormData();
        myForm.set("name", input.name);
        myForm.set("email", input.email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    }

    return (
        <>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
            {loading ? <Loader /> :
                <div>
                    <form onSubmit={update}>
                        <TextField onChange={(e) => setInput({ ...input, name: e.target.value })} value={input.name} required type="text" label="Name" variant="standard" style={{ margin: "25px 15px", width: "90%" }} />
                        <TextField onChange={(e) => setInput({ ...input, email: e.target.value })} value={input.email} required type="text" label="email" variant="standard" style={{ margin: "25px 15px", width: "90%" }} />
                        <div className='chooseFileAvatar'>
                            <img src={avatarPreview} alt="" />
                            <input name='avatar' onChange={changeHandler} type="file" style={{ margin: "5px 15px", width: "50%" }} className="registerImg" />
                        </div>
                        <Stack direction="row" spacing={2} style={{ marginTop: "1rem" }}>
                            <Button variant="outlined" type="submit" color="primary" style={{ margin: "auto" }}>
                                Update
                            </Button>
                            <Button variant="outlined" onClick={reset} color="primary" style={{ margin: "auto" }}>
                                Reset
                            </Button>
                        </Stack>
                    </form>
                </div>}
        </>
    )
}

export default UpdateProfile