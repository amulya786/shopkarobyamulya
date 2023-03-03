import React from 'react'
import Product from '../components/FrontEndUtils/ProductCard'
import { CgMouse } from 'react-icons/cg';
import { getProduct } from '../Redux/actions/productActions'
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react';
import Loader from './FrontEndUtils/Loader';
import AlertComp from './AlertComp';
import MetaData from './FrontEndUtils/MetaData';
import Carousel from 'react-material-ui-carousel'
import { Button } from '@mui/material';
function Home({ shopLogo }) {

    const [openAlert, setOpenAlert] = React.useState(false);
    const [msgType, setMsgType] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.products);

    useEffect(() => {
        window.scrollTo({top:0});
        if (error) {
            setMsg(error);
            setMsgType("error");
            setOpenAlert(true);
        }
        dispatch(getProduct([0, 10000]));
    }, [dispatch, error]);

    // console.warn(product);

    return (
        <>
            <MetaData title="Shopkaro"/>
            <div id='home'></div>
            {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert}/>}
            {loading ? <Loader /> : <> <div className='welcomeBox'>
                <div className="box">
                    <div>
                        <h1>Welcome</h1>
                        <h5>to</h5>
                        <img style={{ width: "200px", margin: "1rem" }} src={shopLogo} alt="Logo" />
                        <a href="#find">
                            <button className='scrollBtn' >
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>
                </div>
            </div>
                <div className='displayCarosuel'>
                    <Carousel interval={window.innerWidth<600?10000:9000} duration={2000}>
                        <div className="bg C1">
                            <div className='C2 CarosDetails'>
                                <p>Womens collections</p>
                                <h1>New season {(new Date().getFullYear())}</h1>
                                <Button>ShopNow</Button>
                            </div>
                            <div className='C3 CarosImage'>
                                <img src="womensCollection.png" alt="img" className='imgCaros' />
                            </div>
                        </div>
                        <div className="bg C1">
                            <div className='C2 CarosDetails'>
                                <p>Electronics</p>
                                <h1>Mega Sale</h1>
                                <Button>ShopNow</Button>
                            </div>
                            <div className='C3 CarosImage'>
                                <img src="Electronics.png" alt="img" className='imgCaros' />
                            </div>
                        </div>
                        <div className="bg C1">
                            <div className='C2 CarosDetails'>
                                <p>Mens New Season</p>
                                <h1>Jackets & Coats</h1>
                                <Button>ShopNow</Button>
                            </div>
                            <div className='C3 CarosImage'>
                                <img src="mens.png" alt="img" className='imgCaros' />
                            </div>
                        </div>
                        {/* <div className="bg C2"></div> */}
                        {/* <div className="bg C3"></div> */}
                    </Carousel>
                </div>
                <div className="findbest" id="find"><p>Find some best items</p></div>
                <div className="container">
                    <div className="displayProducts">
                        {
                            product && product.map((product, i) =>  <Product key={i} product={product} />)
                        }
                    </div>
                </div></>
            }
        </>
    )
}

export default Home