import React, { useState } from 'react';
import styles from './mainContent.module.css';


const MainContent = ({ imageChunks, imagesData, likesSortDescending, likesSortAscending, commentsSortDescending, commentsSortAscending }) => {
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


   return (
      <>
         {likesSortStatus
            ? <button onClick={sortImagesDescending}>Likes sort Descending</button>
            : <button onClick={sortImagesAscending}>Likes sort Ascending</button>
         }
         {commentsSortStatus
            ? <button onClick={sortCommentsDescending}>Comments sort Descending</button>
            : <button onClick={sortCommentsAscending}>Comments sort Ascending</button>
         }

         {imageChunks.map(chunk => (
            <figure className={styles.row}>

               {chunk.map(image => (
                  <div className={styles.imageWrapper}>

                     <figure className={styles.figureWrapper}>
                        <a href={image.pageURL}>
                           <img className={styles.image} src={image.webformatURL} alt="awsome cat" />
                        </a>
                        <figcaption>
                           <p>Likes - {image.likes}</p>
                           <p>Comments - {image.comments}</p>
                           <p>Tags: {image.tags}</p>
                        </figcaption>
                     </figure>

                  </div>
               ))}

            </figure>
         ))}
      </>
   )
}

export default MainContent;