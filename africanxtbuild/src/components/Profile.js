import React, { useState, useEffect } from 'react';
import './profile.styles.scss';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaStar, FaMusic, FaTeamspeak, FaFileAudio, FaRecordVinyl } from 'react-icons/fa';
import ProjectList from './ProjectList.js';
import AudioPlayer from './audio/AudioPlayer';
import Navbar from './Navbar';
import './audio/audiostyles.css';
import logo from './Africa-NXT-Logo.png'
import AudioRecorder from './audio/AudioRecorder'


const PersonalProfile = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [liveUsers, setLiveUsers] = useState(0);
    const [showPlayer, setShowPlayer] = useState(true)
    const [showAudioRecorder, setShowAudioRecorder] = useState(true)

    // const audio = new Audio('path/to/your/music/file.mp3');

    useEffect(() => {
        // Simulate live user count
        const interval = setInterval(() => {
            setLiveUsers(Math.floor(Math.random() * 100));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleRatingClick = (index) => setRating(index);

    const handleReviewChange = (e) => setReview(e.target.value);

    const handleSubmit = () => {
        console.log({ review, rating });
        closeModal();
    };

    const toggleMusic = () => {
        setShowPlayer(!showPlayer)
        setShowAudioRecorder(false)

    };

    const toggleAudio = () => {
        setShowAudioRecorder(!showAudioRecorder)
        setShowPlayer(false)
    };

    return (
        <>
            <Navbar />
            <div className='profile-bg-container'>
                <div className="profile-container">
                    {showAudioRecorder &&
                        <div className="audio-section">
                            <AudioPlayer />
                            <AudioRecorder />
                        </div>
                    }

                    <div className="profile-header">
                        <div className="live-counter">Currently live: {liveUsers}</div>
                        <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
                        <h1 className="profile-name">{user.name}</h1>
                        <p className="profile-about">{user.about}</p>

                        <div className="music-buttons">
                            <button className="music-button" onClick={toggleAudio}>
                                <FaMusic />
                                <FaRecordVinyl />
                            </button>
                        </div>
                    </div>

                    <div className="profile-badges">
                        <div className='badge-count'>
                            <p style={{ fontWeight: "bolder" }}>Top badges</p>
                            {/* <p style={{ fontWeight: "bolder" }}>3 badges</p> */}
                        </div>
                        <div>
                            {user.badges.map((badge, index) => (
                                <span key={index} className="profile-badge">{badge}</span>
                            ))}
                        </div>
                    </div>

                    <div className="profile-content">
                        <section className="profile-section">
                            <h2 className="section-title">Bio</h2>
                            <p className="profile-bio">{user.bio}</p>
                        </section>
                        <section className="profile-section">
                            <h2 className="section-title">Goals</h2>
                            <p className="profile-goals">{user.goals}</p>
                        </section>
                        <section className="profile-section">
                            <h2 className="section-title">Peers</h2>
                            <ul className="profile-peers">
                                {user.peers.map((peer, index) => (
                                    <li key={index} className="peer-item">{peer}</li>
                                ))}
                            </ul>
                        </section>
                        <section className="profile-section">
                            <h2 className="section-title">Education</h2>
                            <p className="profile-education">{user.education}</p>
                        </section>
                        <section className="profile-section">
                            <h2 className="section-title">Projects</h2>
                            <ProjectList projects={user.projects} />
                        </section>
                        <div className="profile-contact">
                            <div className="contact-item">
                                <FaEnvelope /> <span>{user.email}</span>
                            </div>
                            <div className="contact-item">
                                <FaPhone /> <span>{user.phone}</span>
                            </div>
                        </div>
                        <div className="profile-socials">
                            <a href={user.socials.facebook} className="social-link"><FaFacebook /></a>
                            <a href={user.socials.twitter} className="social-link"><FaTwitter /></a>
                            <a href={user.socials.instagram} className="social-link"><FaInstagram /></a>
                            <a href={user.socials.linkedin} className="social-link"><FaLinkedin /></a>
                        </div>
                        <button className="connect-button">Connect</button>
                        <button className="review-button" onClick={openModal}>Leave a Review</button>
                    </div>
                    {isModalOpen && (
                        <div className="modal-overlay" onClick={closeModal}>
                            <div className="modal-content" onClick={e => e.stopPropagation()}>
                                <h2 className="modal-title">Leave a Review</h2>
                                <textarea
                                    className="review-textarea"
                                    placeholder="Write your review..."
                                    value={review}
                                    onChange={handleReviewChange}
                                />
                                <div className="rating-container">
                                    {[1, 2, 3, 4, 5].map(index => (
                                        <FaStar
                                            key={index}
                                            className={`star ${rating >= index ? 'selected' : ''}`}
                                            onClick={() => handleRatingClick(index)}
                                        />
                                    ))}
                                </div>
                                <button className="submit-button" onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>



    );
};

export default PersonalProfile;

