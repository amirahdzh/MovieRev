import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/cast-movie';

export const updateCastMovie = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cast-movie:", error);
    throw error;
  }
};
