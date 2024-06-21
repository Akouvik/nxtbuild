import { Provider } from 'react-redux';
import store from './components/redux/store';
import Home from './components/Home';
import About from './components/About';
import Questionaire from './components/questionaire/Questionaire';
import NotFound from './components/NotFound';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MultiStepForm from './components/MultiStepForm';
import SignupLogin from './components/SignupLogin';
import SignInForm from './components/SignIn'
import Profile from './components/Profile'
import Feed from './components/Feed';
import './App.css';


function App() {

  const user = {
    avatar: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp',
    name: 'Davido BigHeadMan',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac sagittis quam.',
    bio: 'Experienced software engineer with a passion for developing innovative programs. Skilled in various programming languages and tools.',
    goals: 'To lead a team of developers in creating cutting-edge software solutions.',
    peers: ['Jane Smith', 'Michael Johnson', 'Emily Davis'],
    education: 'B.S. in Computer Science from XYZ University',
    badges: ['Developer', 'Designer', 'Photographer'],
    email: 'john.doe@example.com',
    phone: '+1234567890',
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    },
    projects: [
      {
        name: 'Project One',
        company: 'Company A',
        image: 'https://via.placeholder.com/250x150',
        description: 'Description of project one.',
        link: '#'
      },
      {
        name: 'Project Two',
        company: 'Company B',
        image: 'https://via.placeholder.com/250x150',
        description: 'Description of project two.',
        link: '#'
      },
      {
        name: 'Project Three',
        company: 'Company C',
        image: 'https://via.placeholder.com/250x150',
        description: 'Description of project three.',
        link: '#'
      },
      {
        name: 'Project Three',
        company: 'Company C',
        image: 'https://via.placeholder.com/250x150',
        description: 'Description of project three.',
        link: '#'
      }
      // Add more projects as needed
    ]
  };


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MultiStepForm />} />
        <Route path="/signinform" element={<SignInForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/questionaire" element={<Questionaire />} />
        <Route path="/signuplogin" element={<SignupLogin />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path='/feed' element={<Feed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
