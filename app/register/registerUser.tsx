import axios, { AxiosResponse, AxiosError } from 'axios';

// Define the type for the user registration response (adjust according to your Laravel API response)
interface RegisterResponse {
  token: string; // Assuming the API returns a token on successful registration
  user: {
    id: number;
    name: string;
    email: string;
    // Add any other user fields that are returned in the response
  };
}

// Function to fetch CSRF token from Laravel
const getCsrfToken = async (): Promise<void> => {
  try {
    // Fetch the CSRF token and set it in cookies
    await axios.get('https://ivory-llama-451678.hostingersite.com/sanctum/csrf-cookie', {
      withCredentials: true, // Important: Include credentials (cookies)
    });
    console.log('CSRF token fetched and set in cookies');
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    throw new Error('Unable to fetch CSRF token');
  }
};


// Function to register a new user
const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse | void> => {

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  try {
    // First, fetch the CSRF token to include in the request
    await getCsrfToken();

    // Make the POST request to register the user
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      'https://ivory-llama-451678.hostingersite.com/api/register',
      {
        name,
        email,
        password,
        _token:csrfToken,
      },
      {
        withCredentials: true, // Include credentials (cookies)
      }
    );

    // Handle the response (success case)
    console.log('User registered successfully:', response.data);

    // Return the registered user's data and token
    return response.data;
  } catch (error:unknown) {
    // Cast error as AxiosError to access Axios-specific properties
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError; // Cast error as AxiosError
      if (axiosError.response) {
        console.error('User registration failed:', axiosError.response.data);
      } else {
        console.error('AxiosError with no response:', axiosError.message);
      }
    } else if (error instanceof Error) {
      console.error('Generic error occurred:', error.message);
    } else {
      console.error('Unknown error occurred');
    }
  }
};

export default registerUser;
