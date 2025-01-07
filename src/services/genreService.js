import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/genre';

export const getGenres = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

export const addGenre = async (genre) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, genre, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding genre:", error);
    throw error;
  }
};

export const updateGenre = async (id, genre) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, genre, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating genre:", error);
    throw error;
  }
};

export const deleteGenre = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting genre:", error);
    throw error;
  }
};

// Fetch a specific genre by ID
export const fetchGenre = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching genre:", error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/genre/${genreId}/movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

// export const getAllMovies = async () => {
//   try {
//     const response = await axios.get('http://localhost:8000/api/v1/movies'); // Adjust the endpoint if necessary
//     return response.data; // Make sure the response structure is correct
//   } catch (error) {
//     console.error("Error fetching all movies:", error);
//     throw error;
//   }
// };

