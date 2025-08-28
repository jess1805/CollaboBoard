/*import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './index.module.css';
import Navbar from '../Navbar';

const Canvases = () => {
  const [canvases, setCanvases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCanvases = async () => {
      const token = localStorage.getItem('whiteboard_user_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/canvas/list`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCanvases(response.data);
      } catch (error) {
        console.error('Error fetching canvases:', error);
      }
    };

    fetchCanvases();
  }, [navigate]);

  const handleCanvasClick = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.header}>
        <h1 className={styles.gradientTitle}>My Canvases</h1>
        <Link to="/new" className={styles.createButton}>
          + Create New Canvas
        </Link>
      </div>
      <div className={styles.canvasGrid}>
        {canvases.length > 0 ? (
          canvases.map(canvas => (
            <div 
              key={canvas._id} 
              className={styles.canvasCard} 
              onClick={() => handleCanvasClick(canvas._id)}
            >
              <p className={styles.canvasId}>Canvas {canvas._id.slice(-6)}</p>
            </div>
          ))
        ) : (
          <p>You don't have any canvases yet. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default Canvases;*/

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './index.module.css';

const Canvases = () => {
  const [canvases, setCanvases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCanvases = async () => {
      const token = localStorage.getItem('whiteboard_user_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/canvas/list`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCanvases(response.data);
      } catch (error) {
        console.error('Error fetching canvases:', error);
      }
    };

    fetchCanvases();
  }, [navigate]);

  const handleCanvasClick = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Canvases</h1>
        <Link to="/new" className={styles.createButton}>
          + Create New Canvas
        </Link>
      </div>
      <div className={styles.canvasGrid}>
        {canvases.length > 0 ? (
          canvases.map(canvas => (
            <div 
              key={canvas._id} 
              className={styles.canvasCard} 
              onClick={() => handleCanvasClick(canvas._id)}
            >
              <p className={styles.canvasId}>Canvas ID: {canvas._id}</p>
            </div>
          ))
        ) : (
          <p>You don't have any canvases yet. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default Canvases;