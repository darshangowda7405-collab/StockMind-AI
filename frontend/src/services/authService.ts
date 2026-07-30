import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// ----------------------------
// Register
// ----------------------------
export const registerUser = async (data: RegisterData) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

// ----------------------------
// Login
// OAuth2PasswordRequestForm expects:
// username
// password
// sent as x-www-form-urlencoded
// ----------------------------
export const loginUser = async (data: LoginData) => {
  const formData = new URLSearchParams();

  formData.append("username", data.email);
  formData.append("password", data.password);

  const response = await API.post(
    "/auth/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  localStorage.setItem(
    "token",
    response.data.access_token
  );

  return response.data;
};

// ----------------------------
// Logout
// ----------------------------
export const logout = () => {
  localStorage.removeItem("token");
};

// ----------------------------
// Get Token
// ----------------------------
export const getToken = () => {
  return localStorage.getItem("token");
};

export default API;