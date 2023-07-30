import type { ActionArgs, LinksFunction } from '@remix-run/node';
import AuthForm, { links as authFormLinks } from '~/components/auth/form';
import type { FormAuth } from '~/components/auth/form/types';
import { validateCredentials } from '~/data/validation.server';
import type { AuthError } from '~/data/auth.server';
import { login, signup } from '~/data/auth.server';

const AuthPage = () => {
  return (
    <AuthForm/>
  )
};

export default AuthPage;

export const links: LinksFunction = () => {
  return [...authFormLinks()];
}

export const action = async ({request}: ActionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const email: string = formData.get('email') as string;
  const password: string = formData.get('password') as string;
  const credentials: FormAuth = {email: email, password: password};

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === 'login') {
      return await login(credentials);
    } else {
      return await signup(credentials);
    }
  } catch (error) {
    const authError = error as AuthError;
    if (authError.status === 422) {
      return {credentials: authError.message};
    }
  }
}