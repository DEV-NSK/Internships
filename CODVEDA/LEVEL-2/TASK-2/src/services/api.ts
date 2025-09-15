import axios from "axios";

const API_URL = "https://api.example.com/search"; // Replace with your chosen public REST API

export const fetchData = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
