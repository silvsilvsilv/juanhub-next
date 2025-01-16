import axios, { AxiosResponse, AxiosError } from 'axios';

// Define the type for the login response
interface LoginResponse {
  user: {
    profile_image: string;
    id: number;
    name: string;
    email: string;
    is_admin:boolean
  };
  message: string;
}

// Function to fetch CSRF token from Laravel
const getCsrfToken = async (): Promise<void> => {
  try {
    await axios.get('https://ivory-llama-451678.hostingersite.com/sanctum/csrf-cookie', {
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
      'https://ivory-llama-451678.hostingersite.com/api/login',
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
  } catch (error:unknown) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      // Access the Axios-specific properties safely
      console.error('Login failed:', axiosError.response?.data || axiosError.message);
    } else if (error instanceof Error) {
      // Handle other types of errors (generic JS errors)
      console.error('Login failed:', error.message);
    } else {
      console.error('Unknown error occurred');
    }
  }
};

export default loginUser;
