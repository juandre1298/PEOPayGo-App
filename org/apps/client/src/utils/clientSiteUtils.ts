import { jwtDecode } from 'jwt-decode'; // Change import statement

import { DecodedToken, Session } from '../service/dto';

export async function getCookieByName(
  name: string
): Promise<string | undefined> {
  // Add Promise type
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

export async function getSession(): Promise<Session | null> {
  // Add Promise type
  const token = await getCookieByName('accessToken'); // Use getCookieByName function
  if (token) {
    // Decode the token and assert its type to the DecodedToken interface
    const decodedToken = jwtDecode(token) as DecodedToken;
    console.log(decodedToken);
    return {
      id: decodedToken.userId,
      type: decodedToken.userType,
      first_name: decodedToken.userFirstName,
      last_name: decodedToken.userLastName,
      email: decodedToken.userEmail,
      token: token, // Use the token variable directly
    };
  } else {
    return null;
  }
}
