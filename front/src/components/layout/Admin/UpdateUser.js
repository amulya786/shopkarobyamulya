import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBarForDashboard from './SideBarForDashboard'
import { useNavigate, useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import "./newProduct.css"
import { UPDATE_CLIENT_USER_RESET } from '../../../Redux/constants/userConstants'
import { getUserDetails, updateUser, clearErrors } from '../../../Redux/actions/userAction'
import Loader from '../../FrontEndUtils/Loader'
import { Button } from '@mui/material';
import AlertComp from '../../AlertComp';

const UpdateUser = () => {

    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const { id } = useParams();
    const dispatch = useDispatch();
    const { error, user, loading } = useSelector(state => state.userDetails);
    const { error: updateError, isUpdated, loading: updateLoading } = useSelector(state => state.profile);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const roles = ["admin", "user"];
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        dispatch(updateUser(id, myForm));
    }

    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            user && setName(user.name);
            user && setEmail(user.email);
            user && setRole(user.role);
        }
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
            alert("User Updeted Successfully");
            dispatch({ type: UPDATE_CLIENT_USER_RESET });
            navigate("/admin/users");
        }
    }, [dispatch, error, navigate, isUpdated, updateError, user, id])
    return (
        <>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
            <div className='container'>
                <SideBarForDashboard />
                <div className='dashboardContainer NewProductContainer'>
                    {loading ? <Loader /> :
                        <form action="" className='createProductForm' onSubmit={formSubmitHandler}>
                            <h3>Update User</h3>
                            <div>
                                <PersonIcon />
                                <input type="text"
                                    placeholder='Product Name'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <EmailIcon />
                                <input type="email"
                                    placeholder='email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <VerifiedUserIcon />
                                <select value={role} onChange={(e) => { setRole(e.target.value) }}>
                                    <option value="">Choose Role</option>
                                    {
                                        roles.map((cate) =>
                                            <option key={cate} value={cate} >{cate}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <h6>Current Role - {user && user.role}</h6>

                            <Button
                                className='createProdcutBtn'
                                type='submit'
                                disabled={updateLoading ? true : false || role === "" ? true : false}
                            >
                                Update
                            </Button>

                        </form>}
                </div>
            </div>
        </>
    )
}

export default UpdateUser