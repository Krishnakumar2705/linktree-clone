import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaFacebook, FaGlobe, FaEnvelope, FaPhone, FaEllipsisV } from 'react-icons/fa';

const Link = ({ link, username }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const formatURL = () => {
    const substring = "//";
    if (link.url.includes(substring)) {
      return link.url;
    } else {
      const newURL = `//${link.url}`;
      return newURL;
    }
  }

  const handleClick = () => {
    // Track click
    axios.post(`/users/${username}/click/${link._id}`)
      .catch(err => console.log(err));
  }

  // Get icon based on URL
  const getIcon = () => {
    const url = link.url.toLowerCase();
    if (url.includes('github')) return <FaGithub />;
    if (url.includes('linkedin')) return <FaLinkedin />;
    if (url.includes('twitter') || url.includes('x.com')) return <FaTwitter />;
    if (url.includes('instagram')) return <FaInstagram />;
    if (url.includes('youtube')) return <FaYoutube />;
    if (url.includes('facebook')) return <FaFacebook />;
    if (url.includes('mailto:')) return <FaEnvelope />;
    if (url.includes('tel:')) return <FaPhone />;
    return <FaGlobe />;
  }

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  const handleCopyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(formatURL());
    alert('Link copied to clipboard!');
    setShowMenu(false);
  }

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: link.linkTitle,
        url: formatURL()
      }).catch(err => console.log(err));
    } else {
      alert('Share feature not supported on this browser');
    }
    setShowMenu(false);
  }

  return (
    <div className="link">
      <a 
        className="linkContainer" 
        href={formatURL()} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <span className="link-icon">{getIcon()}</span>
        <span className="link-text">{link.linkTitle}</span>
        {link.clicks > 0 && <span className="link-clicks">{link.clicks} clicks</span>}
        
        {/* Three-dot menu */}
        <div className="link-menu-container" ref={menuRef}>
          <button 
            className="link-menu-button" 
            onClick={handleMenuClick}
            aria-label="Link options"
          >
            <FaEllipsisV />
          </button>
          
          {showMenu && (
            <div className="link-dropdown-menu">
              <button onClick={handleCopyLink} className="menu-item">
                📋 Copy Link
              </button>
              <button onClick={handleShare} className="menu-item">
                🔗 Share
              </button>
              <a 
                href={formatURL()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="menu-item"
                onClick={(e) => e.stopPropagation()}
              >
                🚀 Open in New Tab
              </a>
            </div>
          )}
        </div>
      </a>
    </div>
  )
}

export default Link
