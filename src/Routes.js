import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from "./user/Signup";
import Signin from "./user/Signin"
import Home from './core/Home';
import Menu from "./core/Menu";
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/Admindashboard'
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Orders from './admin/Order'
import Profile from "./user/Profile"
import ManageProducts from "./admin/ManageProducts"
import UpdateProducts from "./admin/UpdateProduct"
import Activate from './user/Activate';
import Forgot from './user/Forgot';
import Reset from './user/Reset';

const Routes = ()=>{
    return (
        <div>
            <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/shop" exact component={Shop}/>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
                <PrivateRoute path="/profile/:userId" exact component={Profile}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminRoute path="/create/category" exact component={AddCategory}/>
                <AdminRoute path="/create/product" exact component={AddProduct}/>
                <Route path="/product/:productId" exact component={Product}/>
                <Route path="/cart" exact component={Cart}/>
                <Route path="/auth/activate/:token" exact component={Activate}/>
                <Route path="/auth/password/forgot" exact component={Forgot}/>
                <Route path="/auth/password/reset/:token" exact component={Reset}/>
                <AdminRoute path="/admin/orders" exact component={Orders}/>
                <AdminRoute path="/admin/products" exact component={ManageProducts}/>
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProducts}/>

            </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Routes;