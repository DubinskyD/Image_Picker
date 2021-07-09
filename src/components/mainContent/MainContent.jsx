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
            <input placeholder='tag filter' onKeyUp={onTagFilterChange}></input>
            {likesSortStatus
               ? <button onClick={sortImagesDescending}>Likes sort Descending</button>
               : <button onClick={sortImagesAscending}>Likes sort Ascending</button>
            }
            {commentsSortStatus
               ? <button onClick={sortCommentsDescending}>Comments sort Descending</button>
               : <button onClick={sortCommentsAscending}>Comments sort Ascending</button>
            }
         </div>
         {imageChunks.map(chunk => (
            <div className={styles.row}>
               {chunk.map(image => (
                  <div className={styles.imageWrapper}>
                     <figure className={styles.figureWrapper}>
                        <a href={image.pageURL}>
                           <img className={styles.image} src={image.webformatURL} alt="awsome cat" />
                        </a>
                        <figcaption>
                           <p>Likes - {image.likes}</p>
                           <p>Comments - {image.comments}</p>
                           <p className={styles.tagWrapper}>
                              {image.tags.split(',').map(tag => (

                                 <span className={styles.tag}>{tag}</span>

                              ))}
                           </p>
                        </figcaption>
                     </figure>
                  </div>
               ))}
            </div>
         ))}
      </>
   )
}

export default MainContent;