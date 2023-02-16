import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete'
import SideBarForDashboard from './SideBarForDashboard'
import { DataGrid } from '@mui/x-data-grid'
import './productList.css';
import { deleteUser, getAllUsers, clearErrors } from '../../../Redux/actions/userAction';
import { DELETE_USER_RESET } from '../../../Redux/constants/userConstants';
import AlertComp from '../../AlertComp';
function UsersList() {

    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState(false);
    const { loading, error, users } = useSelector(state => state.allUser);
    const { isDeleted, error: deleteError, message } = useSelector(state => state.profile);
    const deleteUserHandler = (id) => {
        setDeleting(true);
        dispatch(deleteUser(id));
    }
    useEffect(() => {
        if (error) {
            setDeleting(false);

            setMsg(error);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (deleteError) {
            setDeleting(false);

            setMsg(deleteError);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            setDeleting(false);
            alert(message);
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers());
    }, [error, dispatch, navigate, isDeleted, deleteError, message]);
    const coloums = [
        { field: "sno", headerName: "No.", type: "number", minWidth: 10, flex: 0.1 },
        { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 50,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 200,
            flex: 0.1,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            sortable: false,
            minWidth: 150,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/user/${params.getValue(params.id, 'id')}`}><EditIcon /></Link>
                        <button onClick={() => deleteUserHandler(params.getValue(params.id, 'id'))}>
                            <Delete />
                        </button>

                    </>
                )
            }
        },
    ]
    const rows = [];

    users && users.forEach((item, i) => {
        rows.push({
            sno: i + 1,
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role
        })
    });

    return (
        <>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
            <div className='container'>
                {!deleting ? <><SideBarForDashboard />
                    <div className='productsListContainer'>
                        <h1 >All Users</h1>

                        {!loading && <DataGrid
                            rows={rows}
                            columns={coloums}
                            pageSize={10}
                            disableSelectionOnClick
                            className='productListTable'
                            autoHeight />
                        }
                    </div></> : <h1>deleting</h1>}
            </div>
        </>
    )
}


export default UsersList