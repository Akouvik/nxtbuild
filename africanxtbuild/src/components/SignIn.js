import React, { useState, useEffect } from 'react';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    siginInUserWithEmailAndPassword
} from './firebase/firebase.utils.js';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';
import { useLocation } from 'react-router-dom';
import logo from './Africa-NXT-Logo.png'

import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};
const SignUpForm = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { state } = location;
    const [currState, setCurrState] = useState(state)
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFBD33',
        '#33FFBD', '#8D33FF', '#FF8333', '#FF33D4', '#33D4FF',
        '#8DFF33', '#D433FF', '#33FFA8', '#FFA833', '#33A8FF',
        '#A833FF', '#FF338D'
    ];
    const [currentColor, setCurrentColor] = useState(colors[0]);



    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    useEffect(() => {
        const changeColor = () => {
            setCurrentColor(prevColor => {
                const currentIndex = colors.indexOf(prevColor);
                const nextIndex = (currentIndex + 1) % colors.length;
                return colors[nextIndex];
            });
        };

        const intervalId = setInterval(changeColor, 3000); // 30000ms = 30 seconds

        return () => clearInterval(intervalId);
    }, [colors]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // confirm password match
        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            // const user = undefined
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
            } else {
                alert('User creation encountered an error ', error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleLogin = async () => {
        try {
            // await siginInUserWithEmailAndPassword(email, password);
            navigate('/profile');
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle login error (e.g., show error message to user)
        }
    };
    return (
        <div className="container-for-signin">
            <img src={logo}
                style={{ backgroundColor: currentColor, }}
            />

            <div className="sign-up-container">
                {currState == 'signup' ?
                    (<> <h2>Sign up with email and password</h2>
                        <form onSubmit={handleSubmit}>
                            <FormInput
                                label="Display Name"
                                type="text"
                                required
                                onChange={handleChange}
                                name="displayName"
                                value={displayName}
                                autoComplete="on"
                            />

                            <FormInput
                                label="Email"
                                type="email"
                                required
                                onChange={handleChange}
                                name="email"
                                value={email}
                                autoComplete="on"
                            />

                            <FormInput
                                label="Password"
                                type="password"
                                required
                                onChange={handleChange}
                                name="password"
                                value={password}
                                autoComplete="on"
                            />

                            <FormInput
                                label="Password"
                                type="password"
                                required
                                onChange={handleChange}
                                name="confirmPassword"
                                value={confirmPassword}
                                autoComplete="on"
                            />

                            <Button type="submit" style={{ backgroundColor: currentColor }}>Submit</Button>
                        </form>
                        {/* <button onClick={() => setCurrState('signup')}>Login</button> */}

                    </>) : (<>
                        <div className="sign-in-container">
                            <h2>Sign in with email and password</h2>
                            <form onSubmit={handleLogin}>
                                <FormInput
                                    label="Email"
                                    type="email"
                                    required
                                    onChange={handleChange}
                                    name="email"
                                    value={email}
                                    autoComplete="on"
                                />

                                <FormInput
                                    label="Password"
                                    type="password"
                                    required
                                    onChange={handleChange}
                                    name="password"
                                    value={password}
                                    autoComplete="on"
                                />
                                <div className="buttons-container">
                                    <Button type="submit" style={{ backgroundColor: currentColor }}>Sign in</Button>
                                </div>

                            </form>
                            {/* <button onClick={() => console.log(currState)}>forgot password</button>
                            <button onClick={() => console.log(currState)}>SignUp</button> */}
                        </div>
                    </>)}
            </div>
        </div>
    );
};

export default SignUpForm;
