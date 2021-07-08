import React from 'react';
import styles from './preloader.module.scss';


const Preloader = (props) => {
   return (
      <div className={styles.loader}>
         Loading...
      </div>
   )
}

export default Preloader;