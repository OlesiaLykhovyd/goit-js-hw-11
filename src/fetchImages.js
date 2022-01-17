const axios = require('axios');

export async function fetchQuery(query, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=25229894-13820056b4acb6f2fee7ed633&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
  );
  return response.data;
}

// async function fetchQuery(query, page) {
//   const response = await fetch(
//     `https://pixabay.com/api/?key=25229894-13820056b4acb6f2fee7ed633&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
//   );
//   const data = await response.json();
//   return data;
// }
