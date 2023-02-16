import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users`;

// Types
export type userRegistrationProps = {
  name: string, 
  email: string,  
  password: string, 
  confirmedPassword: string, 
};

export type userLoginProps = {
  email: string,  
  password: string, 
};

export type forgotPasswordProps = {
  email: string,
};

export type resetPasswordProps = {
  password: string,
  confirmedPassword: string,
};

export type profileUpdateProps = {
  name: string,
  phone: string,
  bio: string,
  avatar: string,
};

export type passwordUpdateProps = {
  oldPassword: string, 
  password: string, 
  confirmedPassword: string,
}

// Functionalities
const registerUser = async (userData: userRegistrationProps) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);

    if(response.statusText === "OK") {
      toast.success("User successfully registered!");
    }

    return response.data;
  } catch (error) {
    let message = "";

    if(error instanceof AxiosError) {
      message = (error.response && error.response.data && error.response.data.message) || 
      error.message ||
      error.toString();
    }

    toast.error(message);    
  }
};

const loginUser = async (userData: userLoginProps) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);

    if(response.statusText === "OK") {
      toast.success("Login successful!");
    }

    return response.data;
  } catch (error) {
    let message = "";

    if(error instanceof AxiosError) {
      message = (error.response && error.response.data && error.response.data.message) || 
      error.message ||
      error.toString();
    }

    toast.error(message);    
  }
};

const logoutUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`);

    if(response.statusText === "OK") {
      toast.success("Logout successful!");
    }

    return response.data;
  } catch (error) {
    let message = "";

    if(error instanceof AxiosError) {
      message = (error.response && error.response.data && error.response.data.message) || 
      error.message ||
      error.toString();
    }

    toast.error(message);    
  }
};

const forgotPassword = async (userData: forgotPasswordProps) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, userData);

    toast.success(response.data.message);
  } catch (error) {
    let message = "";

    if(error instanceof AxiosError) {
      message = (error.response && error.response.data && error.response.data.message) || 
      error.message ||
      error.toString();
    }

    toast.error(message);    
  }
};

const resetPassword = async (userData: resetPasswordProps, resetToken: string) => {
  try {
    const response = await axios.put(`${API_URL}/reset-password/${resetToken}`, userData);

    return response.data;
  } catch (error) {
    let message = "";

    if(error instanceof AxiosError) {
      message = (error.response && error.response.data && error.response.data.message) || 
      error.message ||
      error.toString();
    }

    toast.error(message);    
  }
};

const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/login-status`);

    return response.data;
  } catch (error) {
    let message = "";

    if(error instanceof AxiosError) {
      message = (error.response && error.response.data && error.response.data.message) || 
      error.message ||
      error.toString();
    }

    toast.error(message);    
  }
};

const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-user`);

    return response.data;
  } catch (error) {
    let message = "";

    if(error instanceof AxiosError) {
      message = (error.response && error.response.data && error.response.data.message) || 
      error.message ||
      error.toString();
    }

    toast.error(message);    
  }
};

const updateProfile = async (formData: profileUpdateProps) => {
  try {
    const response = await axios.patch(`${API_URL}/update-profile`, formData);

    return response.data;
  } catch (error) {
    let message = "";

    if(error instanceof AxiosError) {
      message = (error.response && error.response.data && error.response.data.message) || 
      error.message ||
      error.toString();
    }

    toast.error(message);    
  }
};

const updatePassword = async (formData: passwordUpdateProps) => {
  try {
    const response = await axios.patch(`${API_URL}/update-password`, formData);

    return response.data;
  } catch (error) {
    let message = "";

    if(error instanceof AxiosError) {
      message = (error.response && error.response.data && error.response.data.message) || 
      error.message ||
      error.toString();
    }

    toast.error(message);    
  }
};

const validateEmail = (email: string) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export { 
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getLoginStatus,
  validateEmail,
  getUser,
  updateProfile,
  updatePassword,
};
