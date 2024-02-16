import axios, { AxiosResponse, AxiosError } from 'axios';
import { apiUrl } from '../config/config';
import { User, LoginRequest, CreateUserDto, UpdateUserDto } from './dto';
import { createCookie, deleteCookie } from '../utils/cookiesFunctions'; // Import await getCookieByName function
import { getCookieByName } from '../utils/clientSiteUtils';

export async function login(
  credentials: LoginRequest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ [key: string]: string } | any> {
  try {
    const response: AxiosResponse<{ [key: string]: string }> =
      await axios.post<{ [key: string]: string }>(
        `${apiUrl}/auth/login`,
        credentials
      );
    console.log(response);
    createCookie('accessToken', response.data.accessToken, false, '/');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        console.log('Unauthorized: Invalid password');
        throw { message: 'Unauthorized: Invalid password' };
      } else {
        console.error('An error occurred:', axiosError.message);
        throw { message: 'Something went wrong, please try again' };
      }
    } else {
      console.error('An unknown error occurred:', error);
      throw { message: 'Something went wrong, please try again' };
    }
  }
}

export async function logout() {
  try {
    deleteCookie('accessToken');
    console.log('tokenDeleted');
  } catch (error: unknown) {
    console.error('An unknown error occurred:', error);
    throw { message: 'Something went wrong, please try again' };
  }
}

// Function to fetch all users
export async function getUsers(): Promise<User[]> {
  try {
    const accessToken = await getCookieByName('accessToken'); // Get access token from cookie

    const response = await axios.get<User[]>(`${apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
}

// Function to fetch a single user by ID
export async function getUserById(userId: number): Promise<User> {
  try {
    const accessToken = await getCookieByName('accessToken'); // Get access token from cookie
    const response = await axios.get<User>(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
}

// Function to create a new user
export async function createUser(userData: CreateUserDto): Promise<User> {
  try {
    const accessToken = await getCookieByName('accessToken'); // Get access token from cookie
    const response = await axios.post<User>('/users', userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create user');
  }
}

// Function to update an existing user by ID
export async function updateUser(
  userId: number,
  userData: UpdateUserDto
): Promise<User> {
  try {
    const accessToken = await getCookieByName('accessToken'); // Get access token from cookie
    const response = await axios.put<User>(`/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user');
  }
}

// Function to delete a user by ID
export async function deleteUser(userId: number): Promise<User> {
  try {
    const accessToken = await getCookieByName('accessToken'); // Get access token from cookie
    const response = await axios.delete<User>(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
}
