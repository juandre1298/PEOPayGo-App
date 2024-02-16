import axios, { AxiosResponse, AxiosError } from 'axios';
import { apiUrl } from '../config/config';

import { FormData } from './dto';

export async function sendPayrollReport(
  payroll: FormData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ [key: string]: string } | any> {
  try {
    const response: AxiosResponse<{ [key: string]: string }> =
      await axios.post<{ [key: string]: string }>(`${apiUrl}/payroll`, payroll);
    console.log(response);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        console.log('Unauthorized: Invalid password');
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
