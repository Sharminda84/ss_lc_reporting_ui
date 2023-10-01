import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

function Login(props) {
    const { loggedIn, logInError, triggerLogin } = props;
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    if (loggedIn) {
        return <Redirect to={'/'} />
    }

    return (
        !loggedIn &&
        <div className='LoginPanel'>
            <div className='LoginPanelTitle'>
                LOG IN
            </div>
            <div className='LoginPanelError'>
                {
                    logInError &&
                    <div>
                        Error logging in. Please make sure that email and password are correct.
                    </div>
                }
            </div>
            <input className='LoginPanelInput' type='text' placeholder='Email...' onChange={e => setUser(e.target.value)} />
            <input className='LoginPanelInput' type='password' placeholder='Password...' onChange={e => setPassword(e.target.value)} />
            <button className='LoginPanelButton' onClick={() => triggerLogin(user, password)}>Log In</button>
        </div>
    );
};

export default Login;