import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete'
import SideBarForDashboard from './SideBarForDashboard'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './productList.css';
import { } from '../../../Redux/constants/productConstants';
import { deleteOrder, getAllOrders, clearErrors } from '../../../Redux/actions/orderAction';
import { DELETE_ORDER_RESET } from '../../../Redux/constants/orderConstant';
import AlertComp from '../../AlertComp';
function OrderList() {
    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState(false);
    const { loading, orders, error } = useSelector(state => state.allOrders);
    const { isDeleted, error: deleteError } = useSelector(state => state.order);
    const deleteOrderHandler = (id) => {
        setDeleting(true);
        dispatch(deleteOrder(id));
    }
    useEffect(() => {
        if (deleteError) {
            setDeleting(false);

            setMsg(deleteError);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (error) {
            setDeleting(false);
            setMsg(error);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            setDeleting(false);
            alert("Order deleted successfully");
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [error, dispatch, navigate, isDeleted, deleteError]);
    const columns = [
        { field: 'id', headerName: 'No', flex: 0.1, width: 90 },
        { field: 'orderId', headerName: 'Order-ID', flex: 0.5, width: 90 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            flex: 0.3,
            editable: false,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : params.getValue(params.id, "status") === "Shipped" ? "blueColor" : "redColor";
            },
        },
        {
            field: 'itemQty',
            headerName: 'Total Items Order',
            width: 150,
            flex: 0.3,
            editable: true,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            width: 110,
            flex: 0.3,
            editable: true,
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
                        <Link to={`/admin/processOrder/${params.getValue(params.id, 'orderId')}`}><EditIcon /></Link>
                        <button onClick={() => deleteOrderHandler(params.getValue(params.id, 'orderId'))}>
                            <Delete />
                        </button>

                    </>
                )
            }
        },

    ];
    const rows = [];

    orders && orders.forEach((item, i) => {
        rows.push({
            id: i + 1,
            orderId: item._id,
            status: item.orderStatus,
            itemQty: item.orderItems.length,
            amount: item.totalPrice
        })
    });

    return (
        <>

            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
            <div className='container'>
                {!deleting ? <><SideBarForDashboard />
                    <div className='productsListContainer'>
                        <h1 >All Orders</h1>

                        {!loading ? <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className='productListTable'
                            autoHeight /> : <>
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box></>
                        }
                    </div></> : <h1>deleting</h1>}
            </div>
        </>
    )
}

export default OrderList;