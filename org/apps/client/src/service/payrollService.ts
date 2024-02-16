import axios, { AxiosError } from 'axios';
import { apiUrl } from '../config/config';
import { getCookieByName } from '../utils/clientSiteUtils';

import { FormData, Datasheets } from './dto';

export async function sendPayrollReport(
  payroll: FormData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ [key: string]: string } | any> {
  try {
    const accessToken = await getCookieByName('accessToken'); // Get access token from cookie

    const response = await axios.post(
      `${apiUrl}/payroll`, // URL
      payroll, // Data
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        console.log('Unauthorize');
        throw { message: 'Unauthorized' };
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

export async function getFullDatasheet(): Promise<Datasheets[]> {
  try {
    const accessToken = await getCookieByName('accessToken'); // Get access token from cookie

    const response = await axios.get<Datasheets[]>(`${apiUrl}/datasheets`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
}
