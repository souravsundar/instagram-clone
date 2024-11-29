import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostD.scss';

const PostD = ({ setUser, setProfile }) => {
  const value = localStorage.getItem('Auth');
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setData] = useState({ photos: [], description: '', postDate: '', postTime: '' });

  useEffect(() => {
    postDetails();
  }, []);

  const postDetails = async () => {
    if (value !== null) {
      try {
        const res = await axios.get(`http://localhost:3000/api/postdetails/${id}`, {
          headers: { Authorization: `Bearer ${value}` },
        });
        if (res.status === 200) {
          setUser(res.data.username);
          setProfile(res.data.profile);
          setData(res.data.post || {});
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.log('Error:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="PostD">
      <div className="left">
        {post.photos?.length > 0 ? (
          <img src={post.photos[0]} alt="post" />
        ) : (
          <p>No photos available</p>
        )}
      </div>
      <div className="right">
        <label htmlFor="desc">Description:</label>
        <h3 id="desc">{post.description}</h3>
        <label htmlFor="date">Date:</label>
        <h3 id="date">{post.postDate}</h3>
        <label htmlFor="time">Time:</label>
        <h3 id="time">{post.postTime}</h3>
      </div>
    </div>
  );
};

export default PostD;
