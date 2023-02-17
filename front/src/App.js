import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/layout/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import './components/layout/style.css'
import ProductDetails from './components/FrontEndUtils/ProductDetails';
import Products from './components/Products';
import NavBar from './components/layout/NavBar';
import LoginSignUp from './components/layout/LoginSignUp';
import Account from './components/Account';
import { loadUser } from './Redux/actions/userAction';
import { useEffect } from 'react';
import store from './Redux/store'
import { useSelector } from 'react-redux';
import UserNavbar from "./components/FrontEndUtils/UserNavbar";
import shopLogo from '../src/shopLogo.png'
import ResetPasswordToken from "./components/FrontEndUtils/ResetPasswordToken";
import Cart from "./components/FrontEndUtils/Cart";
import { useState } from "react";
import Shipping from "./components/FrontEndUtils/Shipping";
import axios from "axios";
import MyOrders from "./components/FrontEndUtils/MyOrders";
import OrderDetails from "./components/FrontEndUtils/OrderDetails";
import DashBoard from "./components/layout/Admin/DashBoard";
import ProductList from "./components/layout/Admin/ProductList";
import NewProduct from "./components/layout/Admin/NewProduct";
import UpdateProduct from "./components/layout/Admin/UpdateProduct";
import OrderList from "./components/layout/Admin/OrderList";
import ProcessOrder from "./components/layout/Admin/ProcessOrder";
import UsersList from "./components/layout/Admin/UsersList";
import UpdateUser from "./components/layout/Admin/UpdateUser";
import ItemsReview from "./components/layout/Admin/ItemsReview";
import ErrorPage from "./components/ErrorPage";
function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  const categories = [
    "Laptop",
    "HeadPhone",
    "Watches",
    "Footwear",
    "Bottoms",
    "Tops",
    "Clothes",
    "Camera",
    "SmartPhone",
    "other"
];


  return (<>

    <BrowserRouter>
      {isAuthenticated && <UserNavbar user={user} loading={loading} cartitems={JSON.parse(localStorage.getItem("cartItems"))} />}
      <NavBar isAuth={isAuthenticated} />
      <Routes>
        <Route path='/' element={<Home shopLogo={shopLogo} />} />
        <Route path='*' element={<ErrorPage/>} />
        <Route exact path='/products/:id' element={<ProductDetails />} />
        <Route path='/product' element={<Products categories={categories} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/account' element={<Account user={user} loading={loading} />} />
        {/* <Route path='/updateProfile' element={<UpdateProfile />} /> */}
        <Route path='/reset/password/:id' element={<ResetPasswordToken />} />
        <Route path='/myorders' element={<MyOrders/>} />
        <Route path='/order/:id' element={<OrderDetails/>} />
        <Route path='/admin/dashboard' element={<DashBoard/>} />
        <Route path='/admin/products' element={<ProductList />} />
        <Route path='/admin/product' element={<NewProduct categories={categories} />} />
        <Route path='/admin/orders' element={<OrderList />} />
        <Route path='/admin/users' element={<UsersList />} />
        <Route path='/admin/user/:id' element={<UpdateUser />} />
        <Route path='/admin/processOrder/:id' element={<ProcessOrder/>} />
        <Route path='/admin/update/:id' element={<UpdateProduct categories={categories}/>} />
        <Route path='/admin/reviews' element={<ItemsReview/>} />
        <Route path='/cart' element={<Cart cartitems={JSON.parse(localStorage.getItem("cartItems"))} />} />
        {stripeApiKey && <Route path='/shipping' element={<Shipping apiKey={stripeApiKey}/>} />}
      </Routes>
      <Footer shopLogo={shopLogo} />
    </BrowserRouter>
  </>
  );
}

export default App;
