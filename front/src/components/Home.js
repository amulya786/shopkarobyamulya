import React from 'react'
import Product from '../components/FrontEndUtils/ProductCard'
import { CgMouse } from 'react-icons/cg';
import { getProduct } from '../Redux/actions/productActions'
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react';
import Loader from './FrontEndUtils/Loader';
import AlertComp from './AlertComp';

function Home({ shopLogo }) {

    const [openAlert, setOpenAlert] = React.useState(false);
    const [msgType, setMsgType] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.products);

    useEffect(() => {
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
                <div className="findbest" id="find"><p>Find some best items</p></div>
                <div className="container">
                    <div className="displayProducts">
                        {
                            product && product.map((product, i) => <Product key={i} product={product} />)
                        }
                    </div>
                </div></>
            }
        </>
    )
}

export default Home