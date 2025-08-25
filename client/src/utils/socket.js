import { io } from "socket.io-client";

let socket;

// This function will create the connection
export const initSocket = (token) => {
  // Use the .env variable for the URL
  const SERVER_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  socket = io(SERVER_URL, {
    extraHeaders: {
      Authorization: `Bearer ${token}`, // Correct header name
    },
  });
};

// This function will get the already created connection
export const getSocket = () => socket;