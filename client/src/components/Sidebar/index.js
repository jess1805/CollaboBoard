import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import styles from './index.module.css'; // Corrected CSS import
import { useNavigate, useParams } from 'react-router-dom';
import boardContext from '../../store/board-context';

const Sidebar = () => {
  const [canvases, setCanvases] = useState([]);
  const token = localStorage.getItem('whiteboard_user_token');
  const { canvasId, setCanvasId, isUserLoggedIn, setUserLoginStatus } = useContext(boardContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Gets current canvas id from URL

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Use environment variable for the API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Define handleCanvasClick first
  const handleCanvasClick = (id) => {
    navigate(`/${id}`);
  };

  // Corrected handleCreateCanvas: Updates state locally, avoids re-fetching
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


  // Corrected fetchCanvases: Defined before being used, no circular calls
  const fetchCanvases = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/canvas/list`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCanvases(response.data);

      if (response.data.length === 0) {
        // If the user has no canvases, create one for them.
        handleCreateCanvas();
      } else if (!id && response.data.length > 0) {
        // If user is not on a specific canvas URL, navigate to the first one.
        handleCanvasClick(response.data[0]._id);
      }
      
    } catch (error) {
      console.error('Error fetching canvases:', error);
    }
  }, [API_BASE_URL, token, id, handleCreateCanvas, navigate]);

  // This useEffect fetches the initial list of canvases when the user is logged in
  useEffect(() => {
    if (isUserLoggedIn) {
      fetchCanvases();
    }
  }, [isUserLoggedIn, fetchCanvases]);

  // Corrected handleDeleteCanvas: Updates state locally and navigates safely
  const handleDeleteCanvas = async (idToDelete) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/canvas/delete/${idToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const updatedCanvases = canvases.filter(canvas => canvas._id !== idToDelete);
      setCanvases(updatedCanvases);

      if (updatedCanvases.length > 0) {
        // Navigate to the first canvas in the updated list
        handleCanvasClick(updatedCanvases[0]._id);
      } else {
        // If no canvases are left, navigate to the welcome page
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
    try {
      setError("");
      setSuccess("");
      const response = await axios.put(
        `${API_BASE_URL}/api/canvas/share/${canvasId}`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(response.data.message);
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
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
            className={`${styles.canvasItem} ${canvas._id === id ? styles.selected : ''}`}
          >
            <span 
              className={styles.canvasName} 
              onClick={() => handleCanvasClick(canvas._id)}
            >
              {canvas._id}
            </span>
            <button className={styles.deleteButton} onClick={() => handleDeleteCanvas(canvas._id)}>
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
          disabled={!isUserLoggedIn}
        />
        <button className={styles.shareButton} onClick={handleShare} disabled={!isUserLoggedIn}>
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