import { io } from "socket.io-client";

let socket;

export const initSocket = (token) => {
  const SERVER_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  socket = io(SERVER_URL, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection failed:", err.message);
    alert("Your session is invalid. Please log in again.");
  });
};

export const getSocket = () => socket;