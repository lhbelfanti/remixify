import { Form, Link, NavLink, useLoaderData } from '@remix-run/react';

import Logo from '~/components/util/logo';

const ExpensesHeader = () => {
  const userId = useLoaderData();
  
  return (
    <header id="main-header">
      <Logo/>
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/expenses" end>
              Manage Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        { userId && (
          <Form method="post" action="/logout" id="logout-form">
            <button className="cta">
              Logout
            </button>
          </Form>
        ) }
        { !userId && (
          <Link to="/auth" className="cta">
            Login
          </Link>
        ) }
      </nav>
    </header>
  );
}

export default ExpensesHeader;