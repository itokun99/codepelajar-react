import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeaturePost from './containers/FeaturePost';
import PostContainer from './containers/PostContainer';
import SinglePostContainer from './containers/SinglePostContainer';
import SidebarPopularPost from './containers/SidebarPopularPost';
import FooterSocialIcon from './containers/FooterSocialIcon';
import GoogleSearchContainer from './containers/GoogleSearchContainer';

const Navigation = () => (
  <nav className="navigation">
    <ul className="navigation__list">
      <li><Link to="/" className="navigation__item">Home</Link></li>
      <li><Link to="/about" className="navigation__item">About</Link></li>
      <li><Link to="/contact" className="navigation__item">Contact</Link></li>
    </ul>
  </nav>
);

const AboutPage = () => (
  <div className="about-page">
    <h1>About Us</h1>
    <p>This is the about page.</p>
  </div>
);

const ContactPage = () => (
  <div className="contact-page">
    <h1>Contact Us</h1>
    <p>This is the contact page.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={
            <>
              <FeaturePost />
              <div className="main-wrapper">
                <SidebarPopularPost />
                <PostContainer />
              </div>
            </>
          } />
          <Route path="/post/:id" element={<SinglePostContainer />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={
            <div className="error-page">
              <h1>404 - Page Not Found</h1>
              <Link to="/">Back to Home</Link>
            </div>
          } />
        </Routes>
        <FooterSocialIcon />
        <GoogleSearchContainer />
      </div>
    </Router>
  );
}

export default App;
