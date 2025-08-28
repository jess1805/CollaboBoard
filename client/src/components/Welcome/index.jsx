import React, { useContext } from "react"; // 👈 1. Import useContext
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import boardContext from "../../store/board-context"; // 👈 2. Import your context

function Welcome() { // 👈 3. Renamed component to Welcome
  const { isUserLoggedIn } = useContext(boardContext); // 👈 4. Get the login status

  return (
    <div className={styles.homeContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>CollaboBoard</div>
        <div className={styles.navLinks}>
          <Link to="/about" className={styles.navButton}>About</Link>
          
          {/* --- DYNAMIC LINKS START --- */}
          {isUserLoggedIn ? (
            <Link to="/canvases" className={styles.navButton}>MyCanvases</Link>
          ) : (
            <>
              <Link to="/login" className={styles.navButton}>Login</Link>
              <Link to="/register" className={styles.navButton}>Register</Link>
            </>
          )}
          {/* --- DYNAMIC LINKS END --- */}

        </div>
      </nav>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.textSection}>
          <h1 className={styles.title}>
            Create. Draw.{" "}
            <span className={styles.gradientText}>Collaborate.</span>
          </h1>
          <p className={styles.description}>
            A modern and interactive whiteboard platform where ideas come alive. 
            Sketch, brainstorm, and collaborate seamlessly — from anywhere, anytime.
          </p>

          {/* --- DYNAMIC CTA BUTTON START --- */}
          {isUserLoggedIn ? (
            <Link to="/canvases" className={styles.ctaButton}>
              Go to My Canvases
            </Link>
          ) : (
            <Link to="/login" className={styles.ctaButton}>
              Start Drawing
            </Link>
          )}
          {/* --- DYNAMIC CTA BUTTON END --- */}
          
        </div>
      </div>
    </div>
  );
}

export default Welcome; // 👈 5. Renamed export to Welcome

// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './index.module.css';
// import Navbar from '../Navbar'; // Import the new Navbar
// import boardContext from '../../store/board-context'; // Import context

// function Welcome() {
//   const { isUserLoggedIn } = useContext(boardContext); // Get login status

//   return (
//     <div className={styles.homeContainer}>
//       <Navbar /> {/* Use the new Navbar */}

//       {/* Hero Section */}
//       <div className={styles.hero}>
//         <div className={styles.textSection}>
//           <h1 className={styles.title}>
//             Create. Draw.{" "}
//             <span className={styles.gradientText}>Collaborate.</span>
//           </h1>
//           <p className={styles.description}>
//             A modern and interactive whiteboard platform where ideas come alive. 
//             Sketch, brainstorm, and collaborate seamlessly — from anywhere, anytime.
//           </p>

//           {/* This button is now dynamic */}
//           {isUserLoggedIn ? (
//             <Link to="/canvases" className={styles.ctaButton}>
//               Go to My Canvases
//             </Link>
//           ) : (
//             <Link to="/login" className={styles.ctaButton}>
//               Start Drawing
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Welcome;