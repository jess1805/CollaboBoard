import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import boardContext from "../../store/board-context";

function Welcome() {
  const { isUserLoggedIn } = useContext(boardContext); 

  return (
    <div className={styles.homeContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>CollaboBoard</div>
        <div className={styles.navLinks}>
          <Link to="/about" className={styles.navButton}>About</Link>
          {isUserLoggedIn ? (
            <Link to="/canvases" className={styles.navButton}>MyCanvases</Link>
          ) : (
            <>
              <Link to="/login" className={styles.navButton}>Login</Link>
              <Link to="/register" className={styles.navButton}>Register</Link>
            </>
          )}
        </div>
      </nav>

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

          {isUserLoggedIn ? (
            <Link to="/canvases" className={styles.ctaButton}>
              Go to My Canvases
            </Link>
          ) : (
            <Link to="/login" className={styles.ctaButton}>
              Start Drawing
            </Link>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Welcome; 