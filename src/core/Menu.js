import React, { Fragment } from "react";
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from "../auth/index"
import { FaBars, FaCartPlus } from "react-icons/fa";
import styled from "styled-components";
import {itemTotal} from "./cartHelpers"


const isActive = (history, path) =>{
    if(history.location.pathname === path){
        return {color: "#ff9900"};
    }
    else{
        return{color:"#ffffff"};
    }
}


const Menu = ({history})=>(
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-items">
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>

            
            <li className="nav-items">
                <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">Shop</Link>
            </li>

            <li className="nav-cart">
                <Link 
                className="nav-link" 
                style={isActive(history, "/cart")} 
                to="/cart"
                > <FaCartPlus className="nav-icon"/> <sup><small className="cart-items">{itemTotal()}</small></sup></Link>
            </li>


           {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}


            {!isAuthenticated()&&(
                <Fragment>
                    <li className="nav-items">
                    <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Signin</Link>
                    </li>
                    <li className="nav-items">
                    <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Signup</Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated()&& (
                <Fragment>
                    <li className="nav-items">
                    <span className="nav-link" style={{cursor:'pointer', color:"#ffffff"}} onClick={()=>signout(()=>{history.push("/")})}>Signout</span>
                    </li>
                </Fragment>
            )}
            
        </ul>
    </div>
);

const NavWrapper = styled.nav`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0.6rem 1.5rem;
  background: var(--mainGrey);
  border-bottom: 3px solid var(--primaryColor);
  z-index: 1;
  .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1170px;
    margin: 0 auto;
  }
  .nav-icon {
    font-size: 1.5rem;
    cursor: pointer;
  }
  .nav-cart {
    position: relative;
  }
  .cart-items {
    background: var(--primaryColor);
    color: var(--mainWhite);
    font-size: 0.85rem;
    position: absolute;
    top: -8px;
    right: -8px;
    padding: 0 5px;
    border-radius: 50%;
  }
`;



export default withRouter(Menu);