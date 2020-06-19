import React, { useState } from 'react';
import Modal from 'react-modal';
import './Login.css';

Modal.setAppElement(document.getElementById('root'));

function Login(props) {
    const { loggedIn, logInError, triggerLogin } = props;
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const dialogStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

  return (
      <div>
          <Modal
              className='login'
              isOpen={!loggedIn}
              contentLabel='Log Innn'
              style={dialogStyle}
          >
              <label className='title'>LOG IN</label>
              <label className='user'>User</label>
              <input className='userInput' type='text' name='user' onChange={e => setUser(e.target.value)} />
              <label className='password'>Password</label>
              <input className='passwordInput' type='password' name='password' onChange={e => setPassword(e.target.value)} />
              {
                  logInError && <label className='loginErrorMessage'>Error logging in. Please try again...</label>
              }
              <button className='loginButton' onClick={() => triggerLogin(user, password)}>Log In</button>
          </Modal>
      </div>
  );
};

export default Login;