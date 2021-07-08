import * as axios from 'axios';

const instance = axios.create({
   // withCredentials: true,
   baseURL: 'https://pixabay.com/api/',
});

//https://pixabay.com/api/?key={ YOUR_KEY }&q=cats&image_type=all&per_page=100      example

export const pickerAPI = {
   getImageData(search = 'cats', image_type = 'all', per_page = 100, key = '22401842-d5b7a211319aed0fd2006f20b') {
      return instance.get(`?key=${key}&q=${search}&image_type=${image_type}&per_page=${per_page}`)
         .then(response => {
            return response.data;
         });
   }
}
