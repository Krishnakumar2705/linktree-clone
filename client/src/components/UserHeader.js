import React from 'react';

const UserHeader = ({ username, avatar, bio, emoji }) => {
  return (
    <header className="userContainer">
      <div className="avatar-glow">
        <img className="avatarStyle" src={avatar} alt="user avatar"/>
        {emoji && <span className="profile-emoji-badge">{emoji}</span>}
      </div>
      <h2 className="username-title">{`@${username}`}</h2>
      {bio && <p className="user-bio">{bio}</p>}
      <div className="profile-badge">
        <span className="badge-icon">✨</span>
        <span className="badge-text">Verified Profile</span>
      </div>
    </header>
  )
}

export default UserHeader
