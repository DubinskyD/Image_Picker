import React from 'react';
import styles from './preloader.module.css';


const Preloader = (props) => {
   return (
      <div className={styles.loader}>
         Loading...
      </div>
   )
}

export default Preloader;