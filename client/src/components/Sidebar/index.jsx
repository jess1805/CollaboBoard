import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import boardContext from '../../store/board-context';

const Sidebar = () => {
  const [canvases, setCanvases] = useState([]);
  const token = localStorage.getItem('whiteboard_user_token'); 
  const { canvasId, setCanvasId, isUserLoggedIn, setUserLoginStatus } = useContext(boardContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleCanvasClick = (canvasId) => {
    navigate(`/${canvasId}`); 
  };

  const handleCreateCanvas = useCallback(async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/canvas/create`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newCanvas = { _id: response.data.canvasId };
      setCanvases(prevCanvases => [...prevCanvases, newCanvas]);
      handleCanvasClick(newCanvas._id); 
    } catch (error) {
      console.error('Error creating canvas:', error);
    }
  }, [API_BASE_URL, token, navigate]);

  const fetchCanvases = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/canvas/list`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCanvases(response.data);

      if (response.data.length === 0) {
        handleCreateCanvas();
      } else if (!id && response.data.length > 0) {
        handleCanvasClick(response.data[0]._id); 
      }
      
    } catch (error) {
      console.error('Error fetching canvases:', error);
    }
  }, [API_BASE_URL, token, id, handleCreateCanvas]);

  useEffect(() => {
    if (isUserLoggedIn) {
      fetchCanvases();
    }
  }, [isUserLoggedIn, fetchCanvases]);

  const handleDeleteCanvas = async (idToDelete) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/canvas/delete/${idToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const updatedCanvases = canvases.filter(canvas => canvas._id !== idToDelete); 
      setCanvases(updatedCanvases);

      if (updatedCanvases.length > 0) {
        handleCanvasClick(updatedCanvases[0]._id); 
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting canvas:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('whiteboard_user_token'); 
    setCanvases([]);
    setUserLoginStatus(false);
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  
  const handleShare = async () => {
    if (!email.trim()) {
      setError("Please enter an email.");
      return;
    }
    

    if (!id) {
      setError("No canvas selected to share.");
      return;
    }

    try {
      setError("");
      setSuccess("");
      console.log('Sharing canvas:', id, 'with email:', email);
      
      const response = await axios.put(
        `${API_BASE_URL}/api/canvas/share/${id}`, 
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess(response.data.message);
      setEmail(""); 
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      console.error('Share error:', err);
      setError(err.response?.data?.error || "Failed to share canvas.");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className={styles.sidebar}>
      <button 
        className={styles.createButton} 
        onClick={handleCreateCanvas} 
        disabled={!isUserLoggedIn}
      >
        + Create New Canvas
      </button>
      
      <ul className={styles.canvasList}>
        {canvases.map(canvas => (
          <li 
            key={canvas._id} 
            className={`${styles.canvasItem} ${canvas._id === id ? styles.selected : ''}`} // ✅ Fixed template literal and underscore
          >
            <span 
              className={styles.canvasName} 
              onClick={() => handleCanvasClick(canvas._id)} 
            >
              {canvas._id} 
            </span>
            <button 
              className={styles.deleteButton} 
              onClick={() => handleDeleteCanvas(canvas._id)} 
            >
              del
            </button>
          </li>
        ))}
      </ul>
      
      <div className={styles.shareContainer}>
        <input
          type="email"
          placeholder="Enter user email to share"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isUserLoggedIn || !id} 
        />
        <button 
          className={styles.shareButton} 
          onClick={handleShare} 
          disabled={!isUserLoggedIn || !id} 
        >
          Share
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}
      </div>

      {isUserLoggedIn ? (
        <button className={styles.authButton} onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className={styles.authButton} onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default Sidebar;
