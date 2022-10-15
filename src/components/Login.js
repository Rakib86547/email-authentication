import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app)
const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const handleLogInButton = (event) => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmailAndPassword(auth, email, password)
        .then((result => {
            const user = result.user;
            setSuccess(true)
            form.reset()
            console.log(user)
        }))
        .catch(error => {
            setError(error.message)
        })
    }
    const handleEmailForget = (event) => {
        const email = event.target.value;
        setUserEmail(email)
    }
    const handleForgetPassword = () => {
        if(!userEmail){
            setError('please give email')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(() => {
            alert('please check email and give your new password')
        })
        .catch(error => {
            console.error('error :', error)
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Please Log In Here</h1>
            <Form onSubmit={handleLogInButton}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmailForget} name='email' type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{error}</p>
                {
                    success && <p className='text-success'>Login Successfully</p>
                }
                <Button variant="primary" type="submit">
                    Log In
                </Button>
                <p><small>Don`t have account? Please</small><Link to='/'>Register</Link></p>
                <p>Forget Password? <button onClick={handleForgetPassword} className='btn btn-primary'>Reset</button></p>

            </Form>
        </div>
    );
};

export default Login;