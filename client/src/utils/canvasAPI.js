import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/canvas`;

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