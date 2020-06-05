import React, { useState } from 'react';
import Layout from "../core/Layout"
import {signup} from "../auth"
import {forgotPassword} from './apiUser'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot =()=>{
    const [ values, setValues] = useState({
        email: '',
        error:'',
        message:'',
        success:false,
        buttonText:'Sumbit'
    });
    
    
    const handleChange = name => event =>{
        setValues({...values, error:false, [name]:event.target.value});
    };

    const {email,success, error, buttonText, message} = values;

    const clickSubmit= (event)=>{
        event.preventDefault()
        setValues({...values, buttonText:"Requesting", error:false})
        forgotPassword({email})
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, success:false, buttonText:"Request Password Reset Link"});
                toast.error(data.error)
            } else{
                setValues({
                    ...values, 
                    email:'',
                    success:true,
                    message:data.message,
                    buttonText:"Requested"
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
           {message}
        </div>
    );

    const PasswordForgotForm = ()=>(
        <form>
            <div className="form-group">
                <label className="tex-muted">Email</label>
                <input type="text" className="form-control" onChange={handleChange('email')} value={email}/>
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
        {PasswordForgotForm()}
    </Layout>
    );

};
export default Forgot;