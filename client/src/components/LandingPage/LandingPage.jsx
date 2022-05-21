import React from "react";
import { Link } from "react-router-dom";
import imagen from "../../assets/salad-2068220_1920.jpg";
import video from "../../assets/Sizzling.mp4";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landing}>
      <video
        className={styles.videoc}
        src={video}
        type="video/mp4"
        autoplay="true"
        muted="true"
        loop="true"
      ></video>
      <div className={styles.overlay}> </div>
      <div>
        <h1 className={styles.title}>Happy Cooking!</h1>
        <div className={styles.buttonContainer}>
          <img
            className={styles.imageCard}
            src={imagen}
            alt="imagen de recetas"
          />
          <p className={styles.p}>The best recipes</p>
          <Link className={styles.button} to="/recipes">
            Welcome
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
