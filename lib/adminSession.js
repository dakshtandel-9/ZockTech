import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const ADMIN_COOKIE = 'admin_session';
const secret = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET || 'dev-secret');

export async function createAdminSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function deleteAdminSession() {
  cookies().set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
}

export async function verifyAdminSession() {
  const c = cookies().get(ADMIN_COOKIE)?.value;
  if (!c) return false;
  try {
    await jwtVerify(c, secret);
    return true;
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_NAME = ADMIN_COOKIE;
