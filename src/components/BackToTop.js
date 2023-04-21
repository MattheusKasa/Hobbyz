import React, { useState, useEffect } from 'react';
import styles from '../styles/BackToTop.module.css';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 300) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <div
        className={`${styles.backToTop} ${visible ? styles.show : ''}`}
        onClick={scrollToTop}
      >
        <i className="fas fa-chevron-up"></i>
      </div>
    );
  };
  
  export default BackToTop;
  