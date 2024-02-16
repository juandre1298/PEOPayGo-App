import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  if (token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['dashboard', 'timesheet', 'account'],
};
