import React, { useState, useEffect } from 'react';
import Layout from "../core/Layout"
import {signup} from "../auth"
import {resetPassword} from './apiUser'
import {Link} from 'react-router-dom'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset =({match})=>{
    const [ values, setValues] = useState({
        name: '',
        token:'',
        newPassword:'',
        error:'',
        success:false,
        buttonText:'Reset Password'
    });

    const ResetPassword = (token)=>{
       let {name} = jwt.decode(token)
       if(token){
           setValues({...values, name, token})
       }
    }

    useEffect(()=>{
        ResetPassword(match.params.token)
    },[])
    
    
    const handleChange =  event =>{
        setValues({...values, error:false, newPassword:event.target.value});
    };

    const {name,token, newPassword, success, error, buttonText} = values;

    const clickSubmit= (event)=>{
        event.preventDefault()
        setValues({...values, buttonText:"Resetting Password", error:false})
        resetPassword( { resetPasswordLink:token, newPassword })
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, success:false, buttonText:"Reset Password"});
                toast.error(data.error)
            } else{
                setValues({
                    ...values, 
                    email:'',
                    success:true,
                    buttonText:"Done"
                })
                toast.success(data.message)
            }

        })
    };


    const showError = ()=>(
        <div className="alert alert-danger" style ={{display: error? '':'none'}}>
            {error}

        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Reset Password is done. Please <Link to="/signin">Signin</Link>
        </div>
    );

    const PasswordResetForm = ()=>(
        <form>
            <h1 className="p-5 text-center"> Hey {name}, Reset Your Password Here</h1>
            <div className="form-group">
                <label className="tex-muted">Password</label>
                <input type="text" className="form-control" onChange={handleChange} value={newPassword} type="password" placeholder="Type NewPassword" required/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">{buttonText} </button>
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
        {showSuccess()}
        {PasswordResetForm()}
    </Layout>
    );

};
export default Reset;