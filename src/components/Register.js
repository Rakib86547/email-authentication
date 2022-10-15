import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const auth = getAuth(app)

const Register = () => {
    const facebookProvider = new FacebookAuthProvider()
    const [passwordError, setPasswordError] = useState('');
    const [verify, setVerify] = useState('');
    const [success, setSuccess] = useState(false);
    const handleSubmitButton = (event) => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('please at least two capital latter')
            return;
        }
        if (password.length < 6) {
            setPasswordError('password must be 6 character');
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setPasswordError('please give special character');
            return;
        }
        if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setPasswordError('please give one number');
            return;
        }

        setPasswordError('')
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setSuccess(true)
                verifyEmail()
                form.reset()
                console.log(user)
            })
            .catch(error => {
                console.error('error :', error)
                setPasswordError(error.message)
            })

    }
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // alert('please cheack your email')
                setVerify('please check your email and verify')
            })
    }

    const handleFacebookButton = () => {
            signInWithPopup(auth, facebookProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
            })
            .catch(error => {
                console.error('error', error)
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Please Registration Here</h1>
            <Form onSubmit={handleSubmitButton}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" />
                </Form.Group>
                <p><small className='text-danger'>{passwordError}</small></p>
                <p><small className='text-primary'>{verify}</small></p>
                {
                    success && <p className='text-success'>Registration Successfully</p>
                }
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <p><small>Already have an account! Please</small><Link to='/login'>Login</Link></p>

            </Form>
            <div>
                <button onClick={handleFacebookButton} className='btn btn-primary'>Sign in with Facebook</button>
                {/* <FontAwesomeIcon icon={['fab', 'apple']} />
                <FontAwesomeIcon icon={['fab', 'microsoft']} />
                <FontAwesomeIcon icon="fa-brands fa-google" />
                <FontAwesomeIcon icon="fa-brands fa-facebook-f" /> */}
            </div>
        </div>
    );
};

export default Register;