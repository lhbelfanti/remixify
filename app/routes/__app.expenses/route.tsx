import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import ExpensesList, { links as listLinks } from '~/components/expenses/list';
import { links as listItemLinks } from '~/components/expenses/list/item';
import { FaDownload, FaPlus } from 'react-icons/fa';
import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';
import { HeadersArgs } from '@remix-run/server-runtime/dist/routeModules';

const ExpensesLayout = () => {
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      <Outlet/>
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus/>
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload/>
            <span>Load Raw Data</span>
          </a>
        </section>
        { hasExpenses && <ExpensesList expenses={ expenses }/> }
        { !hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        ) }
      </main>
    </>
  )
}

export default ExpensesLayout;

export const links: LinksFunction = () => {
  return [...listLinks(), ...listItemLinks()];
}

export const loader = async ({request}: LoaderArgs) => {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  //return expenses;
  return json(expenses, {
    headers: {
      'Cache-Control': 'max-age=3', // This header can be caught by the 'headers' function
    },
  });

  // if (!expenses || expenses.length === 0) {
  //   throw json(
  //     {message: 'Could not find any expenses.'},
  //     {status: 404, statusText: 'No expenses found'}
  //   )
  // }
}

// export const ErrorBoundary = () => {
//   return <p>Error</p>
// }

export const headers = ({actionHeaders, loaderHeaders, parentHeaders}: HeadersArgs) => {
  return {
    'Cache-Control': loaderHeaders.get('Cache-Control')
  }
}