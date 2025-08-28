// src/components/About/index.js
import React, { useContext } from "react"; // Import useContext
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import boardContext from "../../store/board-context"; // Import your context

const About = () => {
  const { isUserLoggedIn } = useContext(boardContext); // Get login status

  return (
    <div className={styles.aboutContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>CollaboBoard</div>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navButton}>Home</Link>
          
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
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>The Real-Time Collaborative Whiteboard</h1>
        <p className={styles.heroSubtitle}>
          Your real-time digital whiteboard for teams, students, and creative minds.
        </p>
      </section>

      {/* Main Content Section */}
      <main className={styles.mainContent}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What You Can Do</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Real-time Collaboration</h3>
              <p className={styles.featureText}>
                Draw, write, and ideate with your team in real-time, no matter where you are. Our platform syncs every stroke instantly, making remote collaboration feel like you're in the same room.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Save and Download</h3>
              <p className={styles.featureText}>
                Effortlessly save your progress as you work and download your creations anytime to keep a personal copy of your projects.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Seamless Integration</h3>
              <p className={styles.featureText}>
                Access other canvases by their unique ID, and invite your team to collaborate by using their email address.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.howItWorksGrid}>
            <div className={styles.stepCard}>
              <h4 className={styles.stepTitle}>1. Register</h4>
              <p className={styles.stepText}>Create your free account in seconds.</p>
            </div>
            <div className={styles.stepCard}>
              <h4 className={styles.stepTitle}>2. Start a Board</h4>
              <p className={styles.stepText}>Create a new board and share your boards with teammates via email and access other canvases using their Canvas ID.</p>
            </div>
            <div className={styles.stepCard}>
              <h4 className={styles.stepTitle}>3. Collaborate Securely</h4>
              <p className={styles.stepText}>
                Begin drawing, brainstorming, and building together instantly, knowing that every canvas and every collaboration is protected with robust security measures
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            We believe in the power of visual thinking. Our mission is to provide a simple, powerful, and accessible platform that helps people turn their ideas into reality, together.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;

// import React from "react";
// import styles from "./index.module.css";
// import Navbar from "../Navbar"; // Import the new Navbar

// const About = () => {
//   return (
//     <div className={styles.aboutContainer}>
//       <Navbar /> {/* Use the new Navbar */}

//       {/* Hero Section */}
//       <section className={styles.heroSection}>
//         <h1 className={styles.heroTitle}>The Real-Time Collaborative Whiteboard</h1>
//         <p className={styles.heroSubtitle}>
//           Your real-time digital whiteboard for teams, students, and creative minds.
//         </p>
//       </section>

//       {/* Main Content Section */}
//       <main className={styles.mainContent}>
//         {/* ... All your other sections for the about page ... */}
//         <section className={styles.section}>
//           <h2 className={styles.sectionTitle}>What You Can Do</h2>
//           <div className={styles.featureGrid}>
//             <div className={styles.featureCard}>
//               <h3 className={styles.featureTitle}>Real-time Collaboration</h3>
//               <p className={styles.featureText}>
//                 Draw, write, and ideate with your team in real-time, no matter where you are. Our platform syncs every stroke instantly, making remote collaboration feel like you're in the same room.
//               </p>
//             </div>
//             <div className={styles.featureCard}>
//               <h3 className={styles.featureTitle}>Save and Download</h3>
//               <p className={styles.featureText}>
//                 Effortlessly save your progress as you work and download your creations anytime to keep a personal copy of your projects.
//                   </p>
//             </div>
//             <div className={styles.featureCard}>
//               <h3 className={styles.featureTitle}>Seamless Integration</h3>
//               <p className={styles.featureText}>
//                 Access other canvases by their unique ID, and invite your team to collaborate by using their email address.
//               </p>
//             </div>
//           </div>
//         </section>
//         {/* ... etc ... */}
//       </main>
//     </div>
//   );
// };

// export default About;