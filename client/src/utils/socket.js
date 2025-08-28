// import { io } from "socket.io-client";

// let socket;

// // This function will create the connection
// export const initSocket = (token) => {
//   // Use the .env variable for the URL
//   const SERVER_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

//   socket = io(SERVER_URL, {
//     extraHeaders: {
//       Authorization: `Bearer ${token}`, // Correct header name
//     },
//   });
// };

// // This function will get the already created connection
// export const getSocket = () => socket;
import { io } from "socket.io-client";

let socket;

// This function will create the connection
export const initSocket = (token) => {
  // Use the .env variable for the URL
  const SERVER_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  socket = io(SERVER_URL, {
    extraHeaders: {
      Authorization: `Bearer ${token}`, // This part is perfect
    },
  });

  // --- RECOMMENDED ADDITION START ---
  // This handles what happens if the token is bad (e.g., expired)
  socket.on("connect_error", (err) => {
    console.error("Socket connection failed:", err.message);
    alert("Your session is invalid. Please log in again.");
    // Optionally, you could redirect to the login page here
    // window.location.href = "/login";
  });
  // --- RECOMMENDED ADDITION END ---
};

// This function will get the already created connection
export const getSocket = () => socket;