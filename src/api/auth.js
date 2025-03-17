import axios from "axios";

// const API_URL = "http://localhost:5001";
const API_URL = "https://tutorprosite-k22-1.onrender.com";
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: username,
      password,
    });
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
