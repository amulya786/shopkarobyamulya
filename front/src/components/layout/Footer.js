import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
function Footer({shopLogo}) {
  return (
    <>
      <div className="footerBox">
        <div id='footer'>
          <div className="footercontainer">
                <h4> About Us</h4>
          <i style={{display:"block"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed voluptatum voluptatem eaque itaque minus nobis animi id fugit quam, delectus totam quae labore iste illum deserunt, tenetur laborum nam excepturi?</i> 
          <img src={shopLogo} alt="logo" className='logo' />
          </div>
          <div className="footercontainer1">
              <div className="footerPatter">
                <h4> Contact Info</h4>
                <Link to="/" ><h5 className='footerText'>Address:Shopkaro building banglore, India</h5></Link>
                <Link ><h5 className='footerText'>Phone :+8114170821</h5></Link>
                <Link ><h5 className='footerText'>shopkaro@gmail.com</h5></Link>
              </div>
              <div className="footerPatter">
                <h4 > Products</h4>
                <Link ><h5 className='footerText'>Electronics</h5></Link>
                <Link ><h5 className='footerText'>Chothes</h5></Link>
                <Link ><h5 className='footerText'>Home decor</h5></Link>
                <Link ><h5 className='footerText'>New gadgets</h5></Link>
                <Link ><h5 className='footerText'>Perfumes</h5></Link>
                <Link ><h5 className='footerText'>Kitchens</h5></Link>
                <Link ><h5 className='footerText'>Phone</h5></Link>
                <Link ><h5 className='footerText'>Laptop</h5></Link>

              </div>
              <div className="footerPatter">
                <h4> Important Link</h4>
                <Link ><h5 className='footerText'>Shopkaro Blogs</h5></Link>
                <Link ><h5 className='footerText'>Search Domain</h5></Link>
                <Link ><h5 className='footerText'>My Account</h5></Link>
                <Link ><h5 className='footerText'>Shopping Cart</h5></Link>
                <Link ><h5 className='footerText'>Our Shop</h5></Link>

              </div>
              <div className="footerPatter">
                <h4> NewsLetters</h4>
                <Link ><h6 className='footerText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, modi?</h6></Link>
              <div id='mailOnfooter'><input type="text" placeholder='Email Address' /><button><SendIcon/></button></div>
              </div>
          </div>
        </div>
        <div className='footerBottom'>
        <p className='copyRight'>Copyrights &#169; All Rights Reserved By Ecomm </p>
        <span>
              <FacebookIcon sx={{ margin: "5px" }} className="icon" />
              <TwitterIcon sx={{ margin: "5px" }} className="icon" />
              <AlternateEmailIcon sx={{ margin: "5px" }} className="icon" />
              <YouTubeIcon sx={{ margin: "5px" }} className="icon" />
              <LinkedInIcon sx={{ margin: "5px" }} className="icon" />
        </span>
        </div>
      </div>
    </>
  )
}

export default Footer