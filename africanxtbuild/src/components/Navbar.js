import React from 'react';
import './navbar.styles.scss';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="/" className="navbar-logo">Build.Africanxt</a>
            </div>
            <div className="navbar-links">
                <a href="/feed" className="navbar-link">Feed</a>
                <a href="/memos" className="navbar-link">Memos</a>
                <a href="/contribute" className="navbar-link">Contribute</a>
                <a href="/profile" className="navbar-link">Profile</a>

            </div>
            <div className="navbar-socials">
                <a href="https://facebook.com" className="navbar-social-link"><FaFacebook /></a>
                <a href="https://twitter.com" className="navbar-social-link"><FaTwitter /></a>
                <a href="https://instagram.com" className="navbar-social-link"><FaInstagram /></a>
                <a href="https://linkedin.com" className="navbar-social-link"><FaLinkedin /></a>
            </div>
        </nav>
    );
};

export default Navbar;
