import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, myOrders } from '../../Redux/actions/orderAction';
import Loader from './Loader';
import Box from '@mui/material/Box';
import './myOrder.css';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AlertComp from '../AlertComp';
function MyOrders() {

  const [openAlert, setOpenAlert] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.userOrders);
  const { user } = useSelector((state) => state.user);

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
        return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: 'itemQty',
      headerName: 'Item-Quantity',
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
      field: 'actions',
      headerName: 'Actions',
      type: 'number',
      width: 110,
      flex: 0.3,
      editable: true,
      renderCell: (params) => {
        return (<Link to={`/order/${params.getValue(params.id, 'orderId')}`}>
          GO TO
        </Link>);
      }
    },

  ];
  const rows = [
  ]
  orders && orders.forEach((items, index) => {
    rows.push({
      id: index + 1,
      orderId: items._id,
      itemQty: items.orderItems.length,
      status: items.orderStatus,
      amount: items.totalPrice,

    })
  });
  console.warn(orders);
  useEffect(() => {
    if (error) {

      setMsg(error);
      setMsgType("error");
      setOpenAlert(true);
      dispatch(clearErrors);
    }
    dispatch(myOrders());
  }, [error, dispatch]);
  return (
    <>

      {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
      {
        loading ? <Loader /> :
          <>
            <div className='container'>
              <Box sx={{ marginTop: "2rem", width: '80%', backgroundColor: "rgba(128, 128, 128, 0.101)" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  autoHeight
                  className='myOrderTable'
                />
                <h3 className='myOrderUserName'>{user && user.name}'s Orders</h3>
              </Box>
            </div>
          </>
      }
    </>

  )
}

export default MyOrders