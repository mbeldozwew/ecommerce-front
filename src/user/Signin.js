import Layout from "../core/Layout"
import {API} from "../config"
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from "../auth/index"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Google from './Google'


const Signin =({})=> {
    const [ values, setValues] = useState({
        email: '',
        password:'',
        error:'',
        loading:false,
        redirectToReferrer:false
    });

    const handleChange = name => event =>{
        setValues({...values, error:false, [name]:event.target.value});
    };

    const {email,password, loading,error,redirectToReferrer} = values;
    const { user } = isAuthenticated();

    const clickSubmit= (event)=>{
        event.preventDefault()
        setValues({...values, error:false, loading:true})
        signin({email,password})
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, loading:false})
                
            } else{
               authenticate(data, ()=>{
                setValues({
                    ...values, 
                    redirectToReferrer:true
                });
               });
            }
        });
    };

    const informParent = data =>{
        authenticate(data, ()=>{
            setValues({
                    redirectToReferrer:true
            });
           });
    }

    const showError = ()=>(
        <div className="alert alert-danger" style ={{display: error? '':'none'}}>
            {error}

        </div>
    )
    const showLoading = () => (
        loading && (<div className="alert alert-info">
            <h2>Loading.....</h2>
        </div>)
    );

    const redirectUser = ()=>{
        if(redirectToReferrer){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard"/>
            }
            else{
                return <Redirect to="/user/dashboard"/>
            };
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }

    const SigninForm = ()=>(
        <form>
            <div className="form-group">
                <label className="tex-muted">Email</label>
                <input type="text" className="form-control" onChange={handleChange('email')} value={email}/>
            </div>

            <div className="form-group">
                <label className="tex-muted">Password</label>
                <input type="password" className="form-control"onChange={handleChange('password')} value={password}/>
            </div>
            <div >
            <button onClick={clickSubmit} type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="/auth/password/forgot">password?</a>
                </p>
            </div>
         
        </form>
    );

    return(
    <Layout title="Signup" description="Signup Ecommerce" className="container col-md-8 offset-md-2">
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        {showError()}
        {showLoading()}
        <Google informParent={informParent} />
        {SigninForm()}
        {redirectUser()}
    </Layout>
    );

};
export default Signin;