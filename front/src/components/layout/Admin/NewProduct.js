import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createProduct } from '../../../Redux/actions/productActions'
import SideBarForDashboard from './SideBarForDashboard'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StorageIcon from '@mui/icons-material/Storage';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useNavigate } from 'react-router-dom'
import "./newProduct.css"
import { NEW_PRODUCT_RESET } from '../../../Redux/constants/productConstants'
import AlertComp from '../../AlertComp'
// import { alertStatus } from '../../../Redux/actions/alertAction'

const NewProduct = ({ categories}) => {
    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const { error, success, loading } = useSelector(state => state.newProduct);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState();
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const formSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append('images', image);
        });
        dispatch(createProduct(myForm));
    }

    const createProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    }
    useEffect(() => {
        if (error) {
            setMsg(error);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (success) {
            alert("Product Created Successfully");
            // open(true);
            // alertMsg("Product Created Successfully");
            dispatch({ type: NEW_PRODUCT_RESET });
            navigate("/admin/dashboard");
        }
    }, [dispatch, error, navigate, success]);
    return (
        <>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
            <div className='container'>
                <SideBarForDashboard />
                <div className='dashboardContainer NewProductContainer'>
                    <form action="" className='createProductForm' onSubmit={formSubmitHandler}>
                        <h3>Create Product</h3>
                        <div>
                            <SpellcheckIcon />
                            <input type="text"
                                placeholder='Product Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input type="number"
                                placeholder='Price'
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className='textAreaDiv'>
                            <DescriptionIcon />
                            <textarea
                                placeholder='discribe your product'
                                required
                                id='createFormTextArea'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => { setCategory(e.target.value) }}>
                                <option value="">Choose Category</option>
                                {
                                    categories.map((cate) =>
                                        <option key={cate} value={cate} >{cate}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input type="number"
                                placeholder='Stocks'
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div className='createProductFormFile'>
                            <input
                                type="file"
                                id='imageFile'
                                name='avatar'
                                accept='image/'
                                onChange={createProductImageChange}
                                multiple
                            />
                            <h6>file size is less then or 100kb</h6>
                        </div>
                        <button
                            className='createProdcutBtn'
                            type='submit'
                            disabled={loading ? true : false}
                        >
                            Create
                        </button>
                        <div className='createProductFormImage'>
                            {
                                imagesPreview.map((image, index) =>
                                    <img className='previewImage' key={index} src={image} alt="product Preview" />
                                )
                            }
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default NewProduct;