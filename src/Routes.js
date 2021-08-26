import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Signup from "./user/Signup"
import Signin from "./user/Signin" 
import Home from "./core/Home" 
import PrivateRoute from "./auth/PrivateRoute"
import Dashboard from "./user/UserDashboard"
import AdminRoute from "./auth/AdminRoute"
import AdminDashboard from "./user/AdminDashboard"
import AddCategory from "./Admin/AddCategory"
import AddProduct from "./Admin/AddProduct"
import Shop from "./core/Shop"
import Product from "./core/Product"
import Cart from "./core/Cart"
import ManageProducts from "./Admin/ManageProducts"
import UpdateProducts from "./Admin/UpdateProducts"
import Profile from "./user/Profile"
import Orders from "./Admin/Orders"
import { helmet } from "react-helmet"



// import Checkout from "./core/Checkout"

const Routes =()=>{
	return(
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/shop" exact component={Shop} />
				<Route path="/cart" exact component={Cart} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={Signin} />
				<PrivateRoute path="/user/dashboard" exact component={Dashboard} />
				<AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
				<AdminRoute path="/create/category" exact component={AddCategory} />
				<AdminRoute path="/create/product" exact component={AddProduct} />
				<Route path="/product/:productId" exact component={Product} />
				<AdminRoute path="/admin/products" exact component={ManageProducts} />
				<AdminRoute path="/admin/product/update/:productId" exact component={UpdateProducts} />
				<PrivateRoute path="/profile/:userId" exact component={Profile} />
				<AdminRoute path="/admin/orders" exact component={Orders} />
			</Switch>
		</BrowserRouter>
	)

}





export default Routes