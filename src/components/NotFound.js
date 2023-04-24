import React from "react";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import { Image } from "react-bootstrap";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <div className={styles.imageContainer}>
        <figure>
        <Image
          src={NoResults}
          alt={`Nothing to see here!`}
          className={styles.placeholderImage}
          fluid
        />
        </figure>
      </div>
    </div>
  );
};

export default NotFound;
