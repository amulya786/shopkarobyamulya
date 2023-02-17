import React, { useEffect, useState } from 'react';
import SideBarForDashboard from './SideBarForDashboard';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import 'chart.js/auto';
import { Doughnut, Line } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminProduct } from '../../../Redux/actions/productActions';
import { getAllOrders } from '../../../Redux/actions/orderAction';
import { getAllUsers } from '../../../Redux/actions/userAction';
import AlertComp from '../../AlertComp';

function DashBoard({open, alertmsg}) {

    const [openAlert, setOpenAlert] = useState(open);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState(alertmsg);
    const dispatch = useDispatch();
    const { products, error } = useSelector(state => state.products);
    const { error: getOrders, orders } = useSelector(state => state.allOrders);
    const { users } = useSelector(state => state.allUser);
    let outOfStock = 0;
    products && products.forEach(item => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    });
    useEffect(() => {
        if (error) {
            setMsg(error);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (getOrders) {
            setMsg(getOrders);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [error, dispatch, getOrders]);

    let totalAmount = 0;

    orders && orders.forEach(item => {
        totalAmount += item.totalPrice;
    })

    const lineState = {
        labels: ["initial Amount", "Amount Earned"],
        datasets: [{
            label: "Total Amount",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["red"],
            data: [0, totalAmount]
        }]
    }
    const doughnutState = {
        labels: ["Out of stock", "In Stock"],
        datasets: [{
            backgroundColor: ["rgba(66, 189, 115, 0.653)", "rgba(7, 30, 131, 0.911)"],
            hoverBackgroundColor: ["red", "green"],
            data: [outOfStock, products && products.length - outOfStock]
        }]
    }
    return (
        <>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
            <div className='container'>
                <SideBarForDashboard />
                <div className='dashboardContainer'>
                    <h1>Dashboard</h1>
                    <div className="dashboardSummary">
                        <div>
                            <p>
                                Total Amount <br /> Rs {totalAmount}
                            </p>
                        </div>
                        <div className="dashboardSummaryBox">
                            <Link to="/product">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>{orders && orders.length}</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>{users && users.length}</p>
                            </Link>
                        </div>
                    </div>
                    <div className='lineChart'>
                        <Line data={lineState} />
                    </div>
                    <div className='doughnutChart'>
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard