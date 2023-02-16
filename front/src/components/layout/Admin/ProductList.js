import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import { clearErrors, getAdminProduct, deleteProduct } from '../../../Redux/actions/productActions'
import Delete from '@mui/icons-material/Delete'
import SideBarForDashboard from './SideBarForDashboard'
import { DataGrid } from '@mui/x-data-grid'
import './productList.css';
import { DELETE_PRODUCT_RESET } from '../../../Redux/constants/productConstants';
import AlertComp from '../../AlertComp';
function ProductList() {

    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState(false);
    const { loading, products, error } = useSelector(state => state.products);
    const { isDeleted, error: deleteError } = useSelector(state => state.product);
    const deleteProductHandler = (id) => {
        setDeleting(true);
        dispatch(deleteProduct(id));
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
            alert("item deleted successfully");
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminProduct());
    }, [error, dispatch, navigate, isDeleted, deleteError]);
    const coloums = [
        { field: "sno", headerName: "No.", type: "number", minWidth: 10, flex: 0.2 },
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 50,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 200,
            flex: 0.5,
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
                        <Link to={`/admin/update/${params.getValue(params.id, 'id')}`}><EditIcon /></Link>
                        <button onClick={() => deleteProductHandler(params.getValue(params.id, 'id'))}>
                            <Delete />
                        </button>

                    </>
                )
            }
        },
    ]
    const rows = [];

    products && products.forEach((item, i) => {
        rows.push({
            sno: i + 1,
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name
        })
    });

    return (
        <>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
            <div className='container'>
                {!deleting ? <><SideBarForDashboard />
                    <div className='productsListContainer'>
                        <h1 >All products</h1>

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

export default ProductList