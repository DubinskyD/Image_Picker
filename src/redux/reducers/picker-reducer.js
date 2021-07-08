import { pickerAPI } from "../../api/api";

const SET_PICKER_DATA = 'SET_PICKER_DATA';
const SET_CHUNKS = 'SET_CHUNKS';

let initialState = {
   getJsonInStore: false,
   data: null,
   chunks: []
}
const chunkMaker = (arr, len) => {
   const chunks = [];
   let i = 0;
   while (i < arr.length) { chunks.push(arr.slice(i, i += len)) }
   return chunks;
}
const sortBy = (field, method) => {
   if (method === 'Descending') {
      return (a, b) => a[field] > b[field] ? 1 : -1;
   }
   return (a, b) => a[field] < b[field] ? 1 : -1;
}

const pickerReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_PICKER_DATA:
         return {
            ...state,
            data: { ...action.data },
            getJsonInStore: true
         }
      case SET_CHUNKS:
         return {
            ...state,
            chunks: [...action.chunks]
         }
      default:
         return state;
   }
}

export const setPickerData = (data) => ({ type: SET_PICKER_DATA, data }) // save full data response 
export const setChunks = (chunks) => ({ type: SET_CHUNKS, chunks }) // chunk [[by 4 img Data in each]] 

export const getPickerData = () => {
   return async (dispatch) => {
      let response = await pickerAPI.getImageData();
      let data = response;
      dispatch(setPickerData(data))
      let chunks = chunkMaker(data.hits, 4)
      dispatch(setChunks(chunks))
   }
}

export const likesSortDescending = (imagesData) => {
   let sortedImageData = imagesData.sort(sortBy('likes',))
   let chunks = chunkMaker(sortedImageData, 4)
   return (dispatch) => {
      dispatch(setChunks(chunks))
   }
}

export const likesSortAscending = (imagesData) => {
   let sortedImageData = imagesData.sort(sortBy('likes', 'Descending'))
   let chunks = chunkMaker(sortedImageData, 4)
   return (dispatch) => {
      dispatch(setChunks(chunks))
   }
}

export const commentsSortDescending = (imagesData) => {
   let sortedImageData = imagesData.sort(sortBy('comments',))
   let chunks = chunkMaker(sortedImageData, 4)
   return (dispatch) => {
      dispatch(setChunks(chunks))
   }
}

export const commentsSortAscending = (imagesData) => {
   let sortedImageData = imagesData.sort(sortBy('comments', 'Descending'))
   let chunks = chunkMaker(sortedImageData, 4)
   return (dispatch) => {
      dispatch(setChunks(chunks))
   }
}





export default pickerReducer;