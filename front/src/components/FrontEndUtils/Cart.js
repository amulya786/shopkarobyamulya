import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsToCart } from '../../Redux/actions/cartAction';
import { useNavigate } from 'react-router-dom';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export default function Cart() {
    const { isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return
        }
        dispatch(addItemsToCart(id, newQty))
    }
    const decreaseQuantity = (id, quantity, stock) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return
        }
        dispatch(addItemsToCart(id, newQty))
    }
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        let value = 0;
        cartItems.forEach(item => value += item.quantity * item.price);
        setGrandTotal(value);
    }, [cartItems]);

    const removeCart = (id) => {
        dispatch(removeItemsToCart(id));
    }

    const checkoutHandler = () => {
        isAuthenticated ? navigate("/shipping") : navigate("/login")
    }
    return (
        <>
            <div className="container">
                {/* {cartItems.length >= 1 ? cartItems && <TableContainer element={<Paper elevation={3} />} sx={{ margin: "5rem" }}>
                    <Table style={{ minWidth: 100 }}>
                        <TableHead >
                            <TableRow>
                                <StyledTableCell>Products</StyledTableCell>
                                <StyledTableCell align="right">Quantity</StyledTableCell>
                                <StyledTableCell align="right">SubTotal</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item, i) => (
                                <StyledTableRow key={i}>
                                    <StyledTableCell component="th" scope="row">
                                        <div className='cartImage'>
                                            <img src={item.image} alt="noImg" />
                                            <div>
                                                <h4>{item.name}</h4>
                                                <h5>Price:₹{item.price}</h5>
                                                <Button onClick={() => removeCart(item.product)}>remove</Button>
                                            </div>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell align="right"><span className='addSubButton'>
                                        <button onClick={() => decreaseQuantity(item.product, item.quantity, item.stock)}>-</button>
                                        <input readOnly type="number" value={item.quantity} />
                                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button></span>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{item.quantity * item.price}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="totalPrice">
                        <div className='grandTotal'>
                            <div className="recipt">
                                <h4>Grand Total</h4>
                                <h3>{grandTotal}</h3>
                            </div>
                            <div className="checkout">
                                <Button onClick={checkoutHandler}>Check out</Button>
                            </div>
                        </div>
                    </div>
                </TableContainer> : <div className='itemNotPresent'>
                    <h1><RemoveShoppingCartIcon /></h1>
                    <p>no item in cart</p>
                    <Button color='error' variant='outlined' sx={{}} onClick={() => navigate('/product')}>Veiw Products</Button>
                </div>} */}
                {cartItems.length >= 1 ? cartItems && <div className="cart">
                    <div className='cartItems'>
                        <div className="gridContainer">
                            <div className="cartImages productCart cartHeading">Product</div>
                            <div className="cartQuantity productCart cartHeading" style={{ paddingLeft: "30%" }}>Quantity</div>
                            <div className="cartPrice productCart cartHeading">Sub-Total</div>
                        </div>
                        {cartItems.map((item, i) => 
                            <div className="gridContainer" key={i}>
                                <div className="cartImages cartItems">
                                    <div className='cartImage'>
                                        <img src={item.image} alt="noImg" />
                                        <div>
                                            <h4>{item.name}</h4>
                                            <h5>Price:₹{item.price}</h5>
                                            <Button onClick={() => removeCart(item.product)}>remove</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="cartQuantity cartItems">
                                    <span className='addSubButton'>
                                        <button onClick={() => decreaseQuantity(item.product, item.quantity, item.stock)}>-</button>
                                        <input readOnly type="number" value={item.quantity} />
                                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button></span>
                                </div>
                                <div className="cartPrice productCart cartItems">{item.quantity * item.price}</div>
                            </div>
                        )}
                    </div>
                    <div className="totalPrice">
                        <div className='grandTotal'>
                            <div className="recipt">
                                <h4>Grand Total</h4>
                                <h3>{grandTotal}</h3>
                            </div>
                            <div className="checkout">
                                <Button onClick={checkoutHandler}>Check out</Button>
                            </div>
                        </div>
                    </div>
                </div> : <div className='itemNotPresent'>
                    <h1><RemoveShoppingCartIcon /></h1>
                    <p>no item in cart</p>
                    <Button color='error' variant='outlined' sx={{}} onClick={() => navigate('/product')}>Veiw Products</Button>
                </div>}
            </div>
        </>
    );
}