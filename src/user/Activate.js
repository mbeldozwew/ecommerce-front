import Layout from "../core/Layout"
import {API} from "../config"
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {signin, authenticate, isAuthenticated,activation} from "../auth/index"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import jwt from 'jsonwebtoken';



const Activate =({match})=> {
    const [ values, setValues] = useState({
        name: '',
        token:'',
        redirectToReferrer:false,
        show:true
    });


    const {name,token,email,password,loading,error,redirectToReferrer,show} = values;
    

    const lele = (token)=>{
        let { name } = jwt.decode(token);
        // console.log(token);
        if (token) {
            setValues({ ...values, name, token });
        }
    }

    useEffect(()=>{
        lele(match.params.token)
        },[]);

    const clickSubmit= (event)=>{
        event.preventDefault()
        setValues({...values, error:false, loading:true})
        activation({token})
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, loading:false})
                toast.error(data.error)
            } else{
                setValues({
                    ...values, 
                });
                toast.success(data.message)
               
            }
        });
    };

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

    

   
    const activationLink =()=>(
        <div>
            <h1 className="p-5 text-center"> Hey {name}, Ready to Activate Your Account?</h1>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>Activate Account</button>
        </div>
    )

    return(
    <Layout title="Signup" description="Signup Ecommerce" className="container col-md-8 offset-md-2">
        <ToastContainer/>
        {showError()}
        {showLoading()}
        {activationLink()}

    </Layout>
    );

};
export default Activate;