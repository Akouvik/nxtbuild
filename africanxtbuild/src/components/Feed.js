import React from 'react';
import './feed.styles.scss';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
import Navbar from './Navbar';

const posts = [
    {
        avatar: 'https://via.placeholder.com/50',
        name: 'John Doe',
        title: 'Software Engineer at XYZ',
        content: 'Had a great time working on the new project!',
        image: 'https://via.placeholder.com/600x300',
    },
    {
        avatar: 'https://via.placeholder.com/50',
        name: 'Jane Smith',
        title: 'Product Manager at ABC',
        content: 'Excited to announce the launch of our new product.',
    },
];
// const Feed = ({ posts }) => {
const Feed = () => {
    return (
        <>
            <Navbar />
            <div className="feed-container">
                {posts.map((post, index) => (
                    <div key={index} className="feed-item">
                        <div className="feed-header">
                            <img src={post.avatar} alt="User Avatar" className="feed-avatar" />
                            <div className="feed-user-info">
                                <h3 className="feed-user-name">{post.name}</h3>
                                <p className="feed-user-title">{post.title}</p>
                            </div>
                        </div>
                        <div className="feed-content">
                            <p>{post.content}</p>
                            {post.image && <img src={post.image} alt="Post" className="feed-image" />}
                        </div>
                        <div className="feed-actions">
                            <button className="action-button"><FaThumbsUp /> Like</button>
                            <button className="action-button"><FaComment /> Comment</button>
                            <button className="action-button"><FaShare /> Share</button>
                        </div>
                    </div>
                ))}
            </div>
        </>

    );
};

export default Feed;
