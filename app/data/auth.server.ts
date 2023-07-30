import type { FormAuth } from '~/components/auth/form/types';
import { prisma } from './database.server';
import { compare, hash } from 'bcryptjs';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

export interface AuthError extends Error {
  status?: number
}

const SESSION_SECRET = process.env.SESSION_SECRET as string;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET], // Secrets with which my cookies will be signed to avoid showing them as plain text in
                               // the frontend
    sameSite: 'lax', // Add protection against potential attacks where malicious requests from third-party site codes
                     // lead our users to make requests they don't want to make
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true // To ensure Javascript client side code can access to this cookie
  }
});

const createUserSession = async (userId: string, redirectPath: string) => {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session)
    },
  });
}

export const getUserFromSession = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  ); // Remix will decode the cookie for us by using the secret we used to save it

  const userId = session.get('userId');

  if (!userId) {
    return null;
  }

  return userId;
}

export const destroyUserSession = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session)
    }
  })
}

export const requireUserSession = async (request: Request) => {
  const userId = await getUserFromSession(request);

  if (!userId) {
    throw redirect('/auth?mode=login'); // Remix throw the redirect and stop everything else
  }
  // If the pages we are trying to access has a loader, the loader will still be executed before the redirect
  // So, if we have nested loaders, in a parent and a child, both will be called in parallel by remix

  return userId;
}

export const signup = async ({email, password}: FormAuth) => {
  const existingUser = await prisma.user.findFirst({where: {email}})

  if (existingUser) {
    throw createAuthError('A user with the provided email address exists already.', 422);
  }

  const passwordHash = await hash(password, 12);
  const user = await prisma.user.create({data: {email: email, password: passwordHash}});
  return createUserSession(user.id, '/expenses');
}

export const login = async ({email, password}: FormAuth) => {
  const existingUser = await prisma.user.findFirst({where: {email}})

  if (!existingUser) {
    throw createAuthError('Could not log you in, please check the provided credentials.', 401);
  }

  const passwordCorrect = await compare(password, existingUser.password);
  if (!passwordCorrect) {
    throw createAuthError('Could not log you in, please check the provided credentials.', 401);
  }

  return createUserSession(existingUser.id, '/expenses');
}

const createAuthError = (message: string, status: number): AuthError => {
  const error: AuthError = new Error(message);
  error.status = status;
  return error
}

