import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { deleteProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer } from "./reducers/productReducers";
import { allUsersReducer, forgetPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, ordersReducer } from "./reducers/orderReducer";
import { alertStatus } from "./actions/alertAction";

const reducer = combineReducers({
    products:productReducer,
    productDetail:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgetPass:forgetPasswordReducer,
    cart: cartReducer,
    newOrder:newOrderReducer,
    userOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    product:deleteProductReducer,
    allOrders:allOrdersReducer,
    order:ordersReducer,
    allUser : allUsersReducer,
    userDetails:userDetailsReducer,
    alertStatus:alertStatus,
});

let initialState = {
    cart:{
        cartItems:localStorage.getItem("cartItems")?
        JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("shippingInfo")?
        JSON.parse(localStorage.getItem("shippingInfo")):{},
    }
}

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;