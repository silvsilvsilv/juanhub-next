import axios, { AxiosResponse } from 'axios';

// Define the type for the login response
interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  message: string;
}

// Function to fetch CSRF token from Laravel
const getCsrfToken = async (): Promise<void> => {
  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });
    console.log('CSRF token fetched and set in cookies');
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    throw new Error('Unable to fetch CSRF token');
  }
};

// Function to log in a user
const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse | void> => {
  try {
    // Fetch the CSRF token first
    await getCsrfToken();

    // Send the login request
    const response: AxiosResponse<LoginResponse> = await axios.post(
      'http://localhost:8000/api/login',
      {
        email,
        password,
      },
      {
        withCredentials: true, // Ensure cookies (with CSRF token) are sent with the request
      }
    );

    console.log('User logged in successfully:', response.data);

    // Return the user and message
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
  }
};

export default loginUser;
