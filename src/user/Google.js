import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { FaGoogle } from 'react-icons/fa'
import {googlelogin} from '../auth/index'

const Google = ({ informParent = f => f }) => {

    const [ values, setValues] = useState({
        error:'',
    });

    const {error} = values;
    
    const responseGoogle = response => {
            googlelogin({idToken: response.tokenId})
            .then(data =>{
                if(data.error){
                    setValues({...values, error: data.error})
                    
                } else{
                    
                    informParent(data);
                }
            });
    }


    return (
        <div className="pb-3">
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="btn btn-danger btn-lg btn-block"
                    >
                        <FaGoogle className="fab"/> Login with Google
                    </button>
                )}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Google;