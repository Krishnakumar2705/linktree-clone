import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHeader from './UserHeader';
import Link from './Link';
import NotFound from './NotFound';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaMoon, FaSun } from 'react-icons/fa';
import '../themes.css';

const UserLinkTree = (props) => {

  const [links, setLinks] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [theme, setTheme] = useState(1);
  const [userAvatar, setUserAvatar] = useState('');
  const [totalClicks, setTotalClicks] = useState(0);
  const [bio, setBio] = useState('');
  const [profileEmoji, setProfileEmoji] = useState('😊');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const getLinks = () => {
      axios.get(`/users/${props.match.params.username}`)
        .then(res => {
          setLinks(res.data.links);
          setUsername(res.data.username);
          setTheme(res.data.theme);
          setLoading(false);
          setUserAvatar(res.data.avatar);
          setBio(res.data.bio || '');
          setProfileEmoji(res.data.profileEmoji || '😊');
          
          // Calculate total clicks
          const total = res.data.links.reduce((sum, link) => sum + (link.clicks || 0), 0);
          setTotalClicks(total);
        })
        .catch(err => {
          console.log(err.response);
          setNotFound(true);
        })
    }
    getLinks();

  }, [props.match.params.username]);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle theme and save preference
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('themeMode', newMode ? 'dark' : 'light');
  };

  // Create animated particles
  const Particles = () => {
    return (
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>
    );
  };

  return ( 
    (loading && !notFound) ? <div className="green-container"><div className="loader"><ClipLoader sizeUnit={"px"} size={150} color={'rgb(31, 28, 28)'} loading={true}/></div></div>
    : (notFound) ? <NotFound /> 
    : (<div className={`${(theme === 1) ? 'green-container' : `theme-${theme}`} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Particles />
        
        {/* Theme Toggle Button */}
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        <UserHeader username={username} avatar={userAvatar} bio={bio} emoji={profileEmoji}/>
        
        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-number">{links.length}</div>
            <div className="stat-label">Links</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalClicks}</div>
            <div className="stat-label">Total Clicks</div>
          </div>
        </div>

        <div className="linksList">
          {(links.length > 0) ? (
            <>
              <div className="links-header">
                <h3>🔗 My Links</h3>
              </div>
              {links.map((link, index) => (
                <div key={link._id} className="link-wrapper" style={{animationDelay: `${index * 0.1}s`}}>
                  <Link link={link} username={username}/>
                </div>
              ))}
            </>
          ) : (
            <h1 className="empty-linktree">User's Linktree is empty!</h1>
          )}
        </div>

        {/* Footer with social icons */}
        <footer className="professional-footer">
          <div className="footer-container">
            <div className="footer-grid">
              {/* Company Section */}
              <div className="footer-section">
                <h4 className="footer-heading">LinkHub</h4>
                <p className="footer-description">
                  Connect your audience to all your content with one simple link.
                </p>
                <div className="footer-social">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaTwitter />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaGithub />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaInstagram />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaFacebook />
                  </a>
                </div>
              </div>

              {/* Product Section */}
              <div className="footer-section">
                <h4 className="footer-heading">Product</h4>
                <ul className="footer-list">
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#analytics">Analytics</a></li>
                  <li><a href="#integrations">Integrations</a></li>
                </ul>
              </div>

              {/* Company Section */}
              <div className="footer-section">
                <h4 className="footer-heading">Company</h4>
                <ul className="footer-list">
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>

              {/* Legal Section */}
              <div className="footer-section">
                <h4 className="footer-heading">Legal</h4>
                <ul className="footer-list">
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms of Service</a></li>
                  <li><a href="#cookies">Cookie Policy</a></li>
                  <li><a href="#security">Security</a></li>
                </ul>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
              <p className="footer-copyright">
                © {new Date().getFullYear()} LinkHub. All rights reserved.
              </p>
              <div className="footer-bottom-links">
                <a href="#sitemap">Sitemap</a>
                <span className="footer-divider">•</span>
                <a href="#accessibility">Accessibility</a>
                <span className="footer-divider">•</span>
                <a href="#status">Status</a>
              </div>
            </div>
          </div>
        </footer>
      </div>)
  )
}

export default UserLinkTree
