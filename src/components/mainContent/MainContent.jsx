import React, { useState } from 'react';
import styles from './mainContent.module.scss';
import { debounced } from '../../utils/utils';


const MainContent = (
   { imageChunks, imagesData, likesSortDescending,
      likesSortAscending, commentsSortDescending,
      commentsSortAscending, tagFilter, tagFilterValue
   }) => {

   const [likesSortStatus, setLikesSortStatus] = useState(false)
   const [commentsSortStatus, setCommentsSortStatus] = useState(false)

   let sortImagesDescending = () => {
      likesSortDescending(imagesData);
      setLikesSortStatus(false);
   }
   let sortImagesAscending = () => {
      likesSortAscending(imagesData);
      setLikesSortStatus(true);
   }
   let sortCommentsDescending = () => {
      commentsSortDescending(imagesData);
      setCommentsSortStatus(false);
   }
   let sortCommentsAscending = () => {
      commentsSortAscending(imagesData);
      setCommentsSortStatus(true);
   }

   let onTagFilterChange = event => debounced(e => tagFilter(e.target.value, imagesData), 300)(event)

   return (
      <>
         <div className={styles.filterWrapper}>
            <input placeholder='Tag Filter' onKeyUp={onTagFilterChange}></input>

            <div className={styles.sortWrapper}>
               <span className={styles.sortTitle}>Sort by: </span>
               {likesSortStatus
                  ? <button onClick={sortImagesDescending}>Likes &#129043;</button>
                  : <button onClick={sortImagesAscending}>Likes &#129045; </button>
               }
               {commentsSortStatus
                  ? <button onClick={sortCommentsDescending}>Comments &#129043;</button>
                  : <button onClick={sortCommentsAscending}>Comments &#129045;</button>
               }
            </div>

         </div>
         <div className={styles.mainContentWrapper}>
            {imageChunks.map((chunk, idx) => (
               <div key={idx} className={styles.row}>
                  {chunk.map(image => (
                     <div key={image.id} className={styles.elementWrapper}>
                        <figure >
                           <div className={styles.imageWrapper}>
                              <a href={image.pageURL}>
                                 <img className={styles.image} src={image.webformatURL} alt="awsome cat" />
                              </a>
                           </div>
                           <figcaption>
                              <p><span>Likes: </span>{image.likes}</p>
                              <p><span>Comments: </span>{image.comments}</p>
                           </figcaption>
                           <p className={styles.tagWrapper}>
                              {image.tags.split(',').map(tag => (
                                 <span key={tag} className={styles.tag}>{tag}</span>
                              ))}
                           </p>
                        </figure>
                     </div>
                  ))}
               </div>
            ))}

         </div>

      </>
   )
}

export default MainContent;