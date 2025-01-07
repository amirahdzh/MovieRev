import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/cast";

// Mendapatkan daftar cast
export const getCasts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching casts:", error);
    throw error;
  }
};

// Mendapatkan detail cast berdasarkan ID
export const getCastById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data; // Access the `data` property inside the response
  } catch (error) {
    console.error("Error fetching cast details:", error);
    throw error;
  }
};

// Menambahkan cast baru
export const addCast = async (castData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(API_URL, castData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Mengatur Content-Type untuk JSON
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.data);
    } else {
      console.error("Error adding cast:", error);
    }
    throw error;
  }
};

// Memperbarui cast berdasarkan ID
export const updateCast = async (id, castData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/${id}`, castData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Mengatur Content-Type untuk JSON
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.data);
    } else {
      console.error("Error updating cast:", error);
    }
    throw error;
  }
};

// Menghapus cast berdasarkan ID
export const deleteCast = async (id) => {
  try {
    const token = localStorage.getItem("token");
    
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting cast:", error);
    throw error;
  }
};

const CAST_MOVIE_API_URL = 'http://localhost:8000/api/v1/cast-movie';

export const addCastMovie = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(CAST_MOVIE_API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Server responded with error:', error.response.data);
    } else {
      console.error('Error adding cast to movie:', error);
    }
    throw error;
  }
};
