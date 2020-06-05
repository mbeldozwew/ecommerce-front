import React, { useState } from 'react';
import Layout from "../core/Layout"
import {signup} from "../auth"
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup =()=>{
    const [ values, setValues] = useState({
        name:'',
        email: '',
        password:'',
        error:'',
        success:false
    });
    
    
    const handleChange = name => event =>{
        setValues({...values, error:false, [name]:event.target.value});
    };

    const {name,email,password, success, error} = values;

    const clickSubmit= (event)=>{
        event.preventDefault()
        setValues({...values, error:false})
        signup({name,email,password})
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, success:false});
                toast.error(data.error)
            } else{
                setValues({
                    ...values, 
                    name:'',
                    email:'',
                    password:'',
                    error:'',
                    success:true
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
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    const SignupForm = ()=>(
        <form>
            <div className="form-group">
                <label className="tex-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange('name')} value={name} />
            </div>

            <div className="form-group">
                <label className="tex-muted">Email</label>
                <input type="text" className="form-control" onChange={handleChange('email')} value={email}/>
            </div>

            <div className="form-group">
                <label className="tex-muted">Password</label>
                <input type="password" className="form-control"onChange={handleChange('password')} value={password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit </button>
            <p className="forgot-password text-right">
                    Already registered <a href="/signin">sign in?</a>
            </p>
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
        {SignupForm()}
    </Layout>
    );

};
export default Signup;