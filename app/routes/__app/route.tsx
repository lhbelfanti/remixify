import { Outlet } from '@remix-run/react';
import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { links as formLinks } from '~/components/expenses/form';
import ExpensesHeader from '~/components/navigation/expenses-header';
import { getUserFromSession } from '~/data/auth.server';

const ExpensesAppLayout = () => {
  return (
    <>
      <ExpensesHeader/>
      <Outlet/>
    </>
  );
}

export default ExpensesAppLayout;

export const links: LinksFunction = () => {
  return [...formLinks()];
}

export const loader = ({request}: LoaderArgs) => {
  return getUserFromSession(request);
}