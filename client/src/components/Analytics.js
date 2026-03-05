import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import ClipLoader from 'react-spinners/ClipLoader';
import { FiTrendingUp, FiMousePointer, FiLink, FiCalendar } from 'react-icons/fi';

const Analytics = ({ username }) => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const config = {
      headers: {'auth-token': token}
    }

    axios.get(`/users/${username}/analytics`, config)
      .then(res => {
        setAnalytics(res.data);
        const total = res.data.reduce((sum, link) => sum + link.clicks, 0);
        setTotalClicks(total);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }, [username]);

  // Get most clicked link
  const mostClickedLink = analytics.length > 0 
    ? analytics.reduce((prev, current) => (prev.clicks > current.clicks) ? prev : current)
    : null;

  // Get click trend (last 7 days)
  const getClickTrend = () => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      let clicksOnDay = 0;
      analytics.forEach(link => {
        if (link.recentClicks) {
          link.recentClicks.forEach(click => {
            const clickDate = new Date(click.timestamp);
            if (clickDate.toDateString() === date.toDateString()) {
              clicksOnDay++;
            }
          });
        }
      });
      
      last7Days.push({ date: dateStr, clicks: clicksOnDay });
    }
    
    return last7Days;
  };

  const clickTrend = getClickTrend();
  const maxClicks = Math.max(...clickTrend.map(d => d.clicks), 1);

  return (
    loading ? (
      <div className="green-container">
        <div className="loader">
          <ClipLoader sizeUnit={"px"} size={150} color={'rgb(31, 28, 28)'} loading={true}/>
        </div>
      </div>
    ) : (
      <>
        <AdminHeader analytics={'active'}/>
        <div className="analytics-container">
          <div className="analytics-header">
            <h2>📊 Analytics Dashboard</h2>
            <div className="total-clicks">
              <h3>Total Clicks</h3>
              <div className="click-count">{totalClicks}</div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="stats-overview">
            <div className="stat-box">
              <div className="stat-icon"><FiLink /></div>
              <div className="stat-value">{analytics.length}</div>
              <div className="stat-name">Total Links</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><FiMousePointer /></div>
              <div className="stat-value">{totalClicks}</div>
              <div className="stat-name">Total Clicks</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><FiTrendingUp /></div>
              <div className="stat-value">{analytics.length > 0 ? Math.round(totalClicks / analytics.length) : 0}</div>
              <div className="stat-name">Avg per Link</div>
            </div>
          </div>

          {/* Click Trend Chart */}
          {totalClicks > 0 && (
            <div className="chart-container">
              <h3><FiCalendar /> Click History (Last 7 Days)</h3>
              <div className="bar-chart">
                {clickTrend.map((day, index) => (
                  <div key={index} className="bar-wrapper">
                    <div className="bar-label">{day.clicks}</div>
                    <div 
                      className="bar" 
                      style={{ height: `${(day.clicks / maxClicks) * 200}px` }}
                    >
                      <div className="bar-fill"></div>
                    </div>
                    <div className="bar-date">{day.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Most Clicked Link */}
          {mostClickedLink && mostClickedLink.clicks > 0 && (
            <div className="most-clicked-section">
              <h3>🏆 Most Clicked Link</h3>
              <div className="most-clicked-card">
                <div className="most-clicked-title">{mostClickedLink.linkTitle}</div>
                <div className="most-clicked-url">{mostClickedLink.url}</div>
                <div className="most-clicked-clicks">{mostClickedLink.clicks} clicks</div>
              </div>
            </div>
          )}
          
          {/* Links Grid */}
          <h3 className="section-title">📈 All Links Performance</h3>
          <div className="analytics-grid">
            {analytics.length > 0 ? (
              analytics.map(link => (
                <div key={link._id} className="analytics-card">
                  <div className="analytics-card-header">
                    <h4>{link.linkTitle}</h4>
                    <div className="click-badge">{link.clicks} clicks</div>
                  </div>
                  <div className="analytics-url">{link.url}</div>
                  {link.recentClicks && link.recentClicks.length > 0 && (
                    <div className="recent-clicks">
                      <h5>Recent Activity</h5>
                      {link.recentClicks.slice(-5).reverse().map((click, index) => (
                        <div key={index} className="click-item">
                          {new Date(click.timestamp).toLocaleString()}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <h3 className="empty-analytics">No links yet. Add some links to see analytics!</h3>
            )}
          </div>
        </div>
      </>
    )
  );
}

export default Analytics;
