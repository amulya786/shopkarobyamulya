import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './navBar.css';
function NavBar({isAuth}) {
  const navShutter = useRef();
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    if (toggle) {
      navShutter.current.style.width = "0%";
    } else {
      navShutter.current.style.width = window.innerWidth<600?"100%":"25%";
    }
  }, [toggle]);
  const run = () => {
    setToggle(!toggle);
  }
  useEffect(()=>{
    // alert(isAuth);
  },[isAuth])
  return (
    <>
      <div id="myNav" ref={navShutter} className="overlay">
        <button className="closebtn" onClick={run}>&times;</button>
        <div className="overlay-content" onClick={run}>
          <img src="https://res.cloudinary.com/dzq6sixij/image/upload/v1676491324/ImagesUsed/logo192_rpgsix.png" alt="logo preview" />
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Your Cart</Link>
          {!isAuth && <Link to="/login">Login</Link>}
          {isAuth &&<Link to="/account">Account</Link>}
        </div>
      </div>
      <span  className="burger" onClick={run}>&#9776;</span>
    </>
  )
}

export default NavBar