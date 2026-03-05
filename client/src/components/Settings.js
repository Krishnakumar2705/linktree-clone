import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import Theme from './Theme';
import defaultAvatar from '../imgs/default.png';
import Modal from './Modal';

const Settings = ({ username, avatar }) => {

  const [userAvatar, setUserAvatar] = useState();
  const [profileEmoji, setProfileEmoji] = useState('😊');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ['😊', '😎', '🚀', '💼', '🎯', '⭐', '🔥', '💡', '🎨', '🎮', '🎵', '📚', '💻', '🌟', '🏆', '❤️', '👋', '✨', '🌈', '🦄', '🐱', '🐶', '🦊', '🐼', '🦁', '🐯', '🐸', '🦋', '🌺', '🌸', '🍕', '🍔', '🍰', '☕', '🎂', '🍿'];

  const token = localStorage.getItem('auth-token');
  const config = {
    headers: {'auth-token': token}
  }

  const removeAvatar = () => {
    axios.patch(`/users/${username}/defaultAvatar`, {}, config)
    .then(res => {
      setUserAvatar(defaultAvatar);
    })
    .catch(err => {
      console.log(err.response);
    })
  }

  const updateEmoji = (emoji) => {
    axios.patch(`/users/${username}/emoji`, { emoji }, config)
      .then(res => {
        setProfileEmoji(emoji);
        setShowEmojiPicker(false);
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  const [newTheme, setNewTheme] = useState(0);

  const rerender = (theme) => {
    setNewTheme(theme);
  }

  const rerenderAvatar = (avatar) => {
    setUserAvatar(avatar);
  }

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const config = {
      headers: {'auth-token': token}
    }

    const getTheme = () => {
      axios.get(`/users/admin`, config)
        .then(res => {
          setNewTheme(res.data.theme);
          setUserAvatar(res.data.avatar);
          setProfileEmoji(res.data.profileEmoji || '😊');
        })
        .catch(err => {
          console.log(err);
        })
    }
    getTheme();
  }, [newTheme, avatar])

  return (
    <>
      <AdminHeader settings={'active'}/>
      <div className="settings-container">
        <div className="avatar-container">
          <div className="avatar">
            <Modal username={username} avatar={userAvatar} rerender={rerenderAvatar}/>
          </div>
          <div className="avatar-form">
            <div className="remove-button" onClick={removeAvatar}>Remove</div>
          </div>
        </div>

        {/* Emoji Picker Section */}
        <div className="emoji-picker-container">
          <h5>Profile Emoji</h5>
          <div className="current-emoji-display">
            <span className="current-emoji">{profileEmoji}</span>
            <button 
              className="change-emoji-btn" 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {showEmojiPicker ? 'Close' : 'Change Emoji'}
            </button>
          </div>
          {showEmojiPicker && (
            <div className="emoji-grid">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  className={`emoji-option ${profileEmoji === emoji ? 'selected-emoji' : ''}`}
                  onClick={() => updateEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="color-container">
          <h5>Theme</h5>
          <div className="themes-container">
            <Theme activeTheme={newTheme} username={username} theme={1} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={2} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={3} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={4} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={5} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={6} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={7} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={8} rerender={rerender}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
