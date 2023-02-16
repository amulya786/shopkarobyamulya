import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetail, updateProduct } from '../../../Redux/actions/productActions'
import SideBarForDashboard from './SideBarForDashboard'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StorageIcon from '@mui/icons-material/Storage';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useNavigate, useParams } from 'react-router-dom'
import "./newProduct.css"
import { UPDATE_PRODUCT_RESET } from '../../../Redux/constants/productConstants'
import AlertComp from '../../AlertComp'

const UpdateProduct = ({ categories }) => {

    const [openAlert, setOpenAlert] = useState(false);
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const { id } = useParams();
    const dispatch = useDispatch();
    const { error: updateError, isUpdated, loading } = useSelector(state => state.product);
    const { product, error } = useSelector((state) => state.productDetail);
    const navigate = useNavigate();
    const [updating, setUpdating] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState();
    const [images, setImages] = useState([]);
    const [oldimages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const product_id = id;
    const formSubmitHandler = (e) => {
        e.preventDefault();
        setUpdating(true);
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append('images', image);
        });
        dispatch(updateProduct(product_id, myForm));
    }

    const updateProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
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
        if (!product) {
            dispatch(getProductDetail(product_id));
        }
        if (product && product._id !== product_id) {
            dispatch(getProductDetail(product_id));
        } else {
            product && setName(product.name);
            product && setDescription(product.description);
            product && setPrice(product.price);
            product && setCategory(product.category);
            product && setStock(product.stock);
            product && setOldImages(product.images);
        }
        if (error) {
            setUpdating(false);

            setMsg(error);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (updateError) {
            setUpdating(false);

            setMsg(updateError);
            setMsgType("error");
            setOpenAlert(true);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            setUpdating(false);
            alert("Product Updated Successfully");
            dispatch({ type: UPDATE_PRODUCT_RESET });
            navigate(`/products/${product_id}`);
        }
    }, [dispatch, error, navigate, isUpdated, product, product_id, updateError]);
    return (
        <>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
            <div className='container'>
                <SideBarForDashboard />
                <div className='dashboardContainer NewProductContainer'>
                    {updating ? <h1>Updating.....</h1> : <form action="" className='createProductForm' onSubmit={formSubmitHandler}>
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
                                onChange={updateProductImageChange}
                                multiple
                            />
                        </div>
                        <h3>old image</h3>
                        <div className='createProductFormImage'>
                            {
                                oldimages && oldimages.map((image, index) =>
                                    <img className='previewImage' key={index} src={image.url} alt="Old product Preview" />
                                )
                            }
                        </div>
                        <button
                            className='createProdcutBtn'
                            type='submit'
                            disabled={loading ? true : false}
                        >
                            Update
                        </button>

                        {imagesPreview && <h3>New Images</h3>}
                        <div className='createProductFormImage'>
                            {
                                imagesPreview.map((image, index) =>
                                    <img className='previewImage' key={index} src={image} alt="Updated Preview" />
                                )
                            }
                        </div>

                    </form>}
                </div>
            </div>
        </>
    )
}

export default UpdateProduct;