import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import TwitterLogin from 'react-twitter-login';
import './SocialAuth.css';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import {
    createAuthUserWithEmailAndPassword,
    siginInUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
} from './firebase/firebase.utils.js';
import logo from './Africa-NXT-Logo.png'

const SignupLogin = () => {
    const colors = [
        '#C3B091', '#808000', '#F4A460', '#654321', '#F5F5DC',
        '#228B22', '#483C32', '#8A9A5B', '#C19A6B', '#008080',
        '#E97451', '#9C9C7C', '#CC7722', '#C04000', '#E2725B',
        '#36454F', '#B2AC88'
    ];

    const [currentColor, setCurrentColor] = useState(colors[0]);


    const navigate = useNavigate()
    const handleGoogleSuccess = (response) => {
        console.log('Google Success:', response);
        // Process the response and authenticate the user
    };

    const handleGoogleFailure = (response) => {
        console.error('Google Failure:', response);
    };

    const handleLinkedInSuccess = (response) => {
        console.log('LinkedIn Success:', response);
        // Process the response and authenticate the user
    };

    const handleLinkedInFailure = (error) => {
        console.error('LinkedIn Failure:', error);
    };

    const handleTwitterSuccess = (response) => {
        console.log('Twitter Success:', response);
        // Process the response and authenticate the user
    };

    const handleTwitterFailure = (error) => {
        console.error('Twitter Failure:', error);
    };


    // const SignInWithGoogle = async () => {
    //     await signInWithGooglePopup();
    // };



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




    return (
        <div className="container-for-signin">
            <img src={logo} style={{ backgroundColor: currentColor, marginBottom: 30, width: '40% ' }} alt="logo" />
            <div className="social-auth">
                <p className='title' style={{ color: currentColor }}>Please Sign in</p>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_WebClientId}>
                    <GoogleLogin
                        className='g-signin'
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                    />
                </GoogleOAuthProvider>

                {/* <LinkedIn
                clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
                onFailure={handleLinkedInFailure}
                onSuccess={handleLinkedInSuccess}
                redirectUri={`${window.location.origin}/linkedin`}
            >
                <img src="https://image.flaticon.com/icons/png/512/174/174857.png" alt="Sign in with LinkedIn" style={{ maxWidth: '180px' }} />
            </LinkedIn>

            <TwitterLogin
                authCallback={handleTwitterSuccess}
                onFailure={handleTwitterFailure}
                consumerKey={process.env.REACT_APP_TWITTER_CLIENT_ID}
                consumerSecret={process.env.REACT_APP_TWITTER_CLIENT_SECRET}
                callbackUrl={`${window.location.origin}/twitter`}
            /> */}
                <button className="useEmail" onClick={() => navigate("/signinform", { state: 'signup' })}>
                    <div className='signup'>Signup With Email and Password</div>
                </button>
                <button className="useEmailLogin" onClick={() => navigate("/signinform", { state: 'login' })}>
                    <div className='signup' style={{ color: '#fff', backgroundColor: "#00caca" }}>Login With Email and Password</div>
                </button>
            </div>
        </div>
    );
};

export default SignupLogin;
