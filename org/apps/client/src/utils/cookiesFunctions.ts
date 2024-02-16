'use server';

import { cookies } from 'next/headers';

export async function createCookie(
  cookieName: string,
  cookieContent: string,
  httpOnly?: boolean,
  path?: string
) {
  cookies().set({
    name: cookieName,
    value: cookieContent,
    httpOnly,
    path,
  });
}
export async function deleteCookie(data: string) {
  cookies().delete(data);
}
