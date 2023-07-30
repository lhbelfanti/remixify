import Chart, { links as chartLinks } from '~/components/expenses/chart';
import { links as chartBarLinks } from '~/components/expenses/chart/bar';
import ExpensesStatistics, { links as statisticsLinks } from '~/components/expenses/statistics';
import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { isRouteErrorResponse, Link, useLoaderData, useRouteError } from '@remix-run/react';
import type { Expense } from '~/components/expenses/form/types';
import { getExpenses } from '~/data/expenses.server';
import { default as ErrorComponent } from '~/components/util/error';
import { requireUserSession } from '~/data/auth.server';

interface ChartComponentProps {
  expenses: Expense[]
}


const ExpensesAnalysisPage = () => {
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

  const ChartComponent = ({expenses}: ChartComponentProps) => {
    return (
      <main>
        <Chart expenses={ expenses }/>
        <ExpensesStatistics expenses={ expenses }/>
      </main>
    )
  }

  return (
    <>
      { hasExpenses && <ChartComponent expenses={ expenses }/> }
    </>
  )
};

export default ExpensesAnalysisPage;

export const links: LinksFunction = () => {
  return [...chartLinks(), ...chartBarLinks(), ...statisticsLinks()];
}

export const loader = async ({request}: LoaderArgs) => {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  if (!expenses || expenses.length === 0) {
    throw json(
      {message: 'Could not find any expenses.'},
      {status: 404, statusText: 'No expenses found'}
    )
  }

  return expenses;
}

export const ErrorBoundary = () => {
  const error: unknown = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <ErrorComponent title={ error.statusText }>
          <p>{ error.data?.messsage || 'No expenses were loaded. Please load some expenses to see the analysis' }</p>
          <p><Link to="/expenses">Load some expenses</Link>.</p>
        </ErrorComponent>
      </main>
    )
  } else if (error instanceof Error) {
    return (
      <main>
        <ErrorComponent title={ "An error occurred" }>
          <p>{ error.message || 'Something went wrong. Please try again later.' }</p>
          <p>Back to <Link to="/">safety</Link>.</p>
        </ErrorComponent>
      </main>
    );
  }

  return (
    <p>Back to <Link to="/">safety</Link>.</p>
  )
}