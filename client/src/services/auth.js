import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginIn = async (email, password) => {
  try {
    const response = await api.post("api/login", {
      email,
      password,
    });

    return response.data;

  } catch (error) {
    {
      throw error;
    }
  }
};
