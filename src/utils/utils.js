

export const chunkMaker = (arr, len) => {
   const chunks = [];
   let i = 0;
   while (i < arr.length) { chunks.push(arr.slice(i, i += len)) }
   return chunks;
}
export const sortBy = (field, method) => {
   if (method === 'Descending') { return (a, b) => a[field] > b[field] ? 1 : -1; }
   return (a, b) => a[field] < b[field] ? 1 : -1;
}

