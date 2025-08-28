import axios from 'axios';

// 1. Define the base URL once using your .env variable
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/canvas`;

// API call to create a new canvas and return its data
export const createNewCanvas = async ({ token }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating canvas:', error);
    return null;
  }
};

// API call to get the list of all canvases for a user
export const getCanvasesList = async ({ token }) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/list`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching canvases:', error);
    return [];
  }
};

// 2. The getCanvasData function has been REMOVED.
// The initial loading of a canvas's drawing elements should ONLY be done
// through the `loadCanvas` Socket.IO event to prevent bugs.

// API call to delete a canvas
export const deleteCanvas = async ({ token, canvasId }) => {
  try {
    await axios.delete(
      `${API_BASE_URL}/delete/${canvasId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return true;
  } catch (error) {
    console.error('Error deleting canvas:', error);
    return false;
  }
};