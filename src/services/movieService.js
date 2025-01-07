import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/movie";
const CAST_MOVIE_API_URL = "http://localhost:8000/api/v1/cast-movie";

// Fungsi untuk mendapatkan header otorisasi
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMovies = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const addMovie = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      ...getAuthHeaders(),
      headers: {
        ...getAuthHeaders().headers,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.data);
    } else {
      console.error("Error adding movie:", error);
    }
    throw error;
  }
};

export const updateMovie = async (id, formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/${id}?_method=PUT`,
      formData,
      {
        ...getAuthHeaders(),
        headers: {
          ...getAuthHeaders().headers,
          // "Content-Type": "multipart/form-data",
          // Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.data);
    } else {
      console.error("Error updating movie:", error);
    }
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      ...getAuthHeaders(),
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

export const getCasts = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/cast", {
      ...getAuthHeaders(),
    });
    return response.data.data; // Sesuaikan dengan struktur data yang dikembalikan
  } catch (error) {
    console.error("Error fetching casts:", error);
    throw error;
  }
};

export const getCastsForMovie = async (movieId) => {
  try {
    const response = await axios.get(`${CAST_MOVIE_API_URL}/movie/${movieId}`, {
      ...getAuthHeaders(),
    });
    return response.data.data; // Sesuaikan dengan struktur data yang dikembalikan
  } catch (error) {
    console.error("Error fetching casts for movie:", error);
    throw error;
  }
};

export const addCastToMovie = async (data) => {
  try {
    const response = await axios.post(CAST_MOVIE_API_URL, data, {
      ...getAuthHeaders(),
      headers: {
        ...getAuthHeaders().headers,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.data);
    } else {
      console.error("Error adding cast to movie:", error);
    }
    throw error;
  }
};

export const getCastMovieId = async (movieId, castId) => {
  try {
    const response = await axios.get(`${API_URL}/cast-movie`);
    const castMovies = response.data.data;
    const castMovie = castMovies.find(
      (cm) => cm.movie_id === movieId && cm.cast_id === castId
    );
    return castMovie ? castMovie.id : null;
  } catch (error) {
    console.error("Error getting cast movie ID:", error);
    throw error;
  }
};

export const removeCastFromMovie = async (castMovieId) => {
  try {
    const response = await axios.post(
      `${CAST_MOVIE_API_URL}/${castMovieId}?_method=DELETE`,
      {},
      {
        ...getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing cast from movie:", error);
    throw error;
  }
};

export const submitMovieReview = async (critic, movieId, rating) => {
  try {
    const formData = new FormData();
    formData.append("critic", critic);
    formData.append("movie_id", movieId);
    formData.append("rating", rating);

    const headers = getAuthHeaders();
    console.log('Headers:', headers);

    const response = await axios.post(
      `http://localhost:8000/api/v1/review`,
      formData,
      {
        ...headers,
        headers: {
          ...headers.headers,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

