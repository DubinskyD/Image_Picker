import { pickerAPI } from "../../api/api";
import { chunkMaker, sortBy } from "../../utils/utils";

const SET_PICKER_DATA = 'SET_PICKER_DATA';
const SET_CHUNKS = 'SET_CHUNKS';
const SET_TAG_FILTER_VALUE = 'SET_TAG_FILTER_VALUE';

let initialState = {
   getJsonInStore: false,
   data: null,
   chunks: [],

   tagFilterValue: '',
   filterCooldown: false
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
      case SET_TAG_FILTER_VALUE:

         return {
            ...state,
            tagFilterValue: action.tagFilterValue
         }
      default:
         return state;
   }
}


//action creators
export const setPickerData = (data) => ({ type: SET_PICKER_DATA, data }) // save full data response 
export const setChunks = (chunks) => ({ type: SET_CHUNKS, chunks }) // chunk [[by 4 img Data in each]] 
export const setTagFilterValue = (tagFilterValue) => ({ type: SET_TAG_FILTER_VALUE, tagFilterValue })

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
export const tagFilter = (tagFilterValue, imagesData) => {
   let filteredImageData = imagesData.filter(item => item.tags.indexOf(tagFilterValue) !== -1)
   let chunks = chunkMaker(filteredImageData, 4)
   return (dispatch) => {
      dispatch(setTagFilterValue(tagFilterValue))

      setTimeout(() => {
         dispatch(setChunks(chunks))
      }, 300)

   }
}




export default pickerReducer;