import axios from 'axios';

const API_BASE_URL = 'http://your-api-url.com';

export const requestPhoneOTP = async (phoneNumber) => {
  const response = await axios.post(`${API_BASE_URL}/request-phone-otp`, { phoneNumber });
  return response.data;
};

export const verifyPhoneOTP = async (phoneNumber, otp) => {
  const response = await axios.post(`${API_BASE_URL}/verify-phone-otp`, { phoneNumber, otp });
  return response.data;
};

export const requestEmailOTP = async (email) => {
  const response = await axios.post(`${API_BASE_URL}/request-email-otp`, { email });
  return response.data;
};

export const verifyEmailOTP = async (email, otp) => {
  const response = await axios.post(`${API_BASE_URL}/verify-email-otp`, { email, otp });
  return response.data;
};
