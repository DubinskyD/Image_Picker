import * as axios from 'axios';

const instance = axios.create({ baseURL: process.env.REACT_APP_API });

export const pickerAPI = {
   getImageData(search = 'cats', image_type = 'all', per_page = 100, key = process.env.REACT_APP_API_KEY) {
      return instance.get(`?key=${key}&q=${search}&image_type=${image_type}&per_page=${per_page}`)
         .then(response => {
            return response.data;
         });
   }
}
