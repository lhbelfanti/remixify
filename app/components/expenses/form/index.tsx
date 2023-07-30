import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import { Form, Link, useActionData, useMatches, useNavigation, useParams, } from '@remix-run/react';
import type { Expense } from '~/components/expenses/form/types';
// import type { FormEvent } from 'react'; // Programmatically submit form alternative
// import type { SubmitTarget } from 'react-router-dom/dist/dom'; // Programmatically submit form alternative

const ExpenseForm = () => {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  //const expenseData = useLoaderData();
  const params = useParams();
  // 'useMatches' allows us to avoid an extra request (a call to a 'loader' function), by just obtaining the values
  // from the routes
  const matches = useMatches();
  const defaultData = {title: '', amount: '', date: ''}
  const expenses = matches.find(match => match.id === 'routes/__app.expenses');
  const expenseData = expenses ? expenses.data.find((expense: Expense) => expense.id === params.id) : defaultData;

  const navigation = useNavigation();

  if (params.id && !expenseData) {
    return <p>Invalid expense id.</p>
  }

  const defaultValues = expenseData ? {
    title: expenseData.title,
    amount: expenseData.amount,
    date: expenseData.date,
  } : {
    title: '',
    amount: '',
    date: '',
  };

  const isSubmitting = navigation.state !== 'idle';

  // --- Programmatically submit form alternative
  /*
   const submit = useSubmit()
   const submitHandler = (event: FormEvent<HTMLFormElement>) => {
   event.preventDefault();
   // perform your own validation
   // ...
   submit(event.target as SubmitTarget, {
   // action: '/expenses/add',
   method: 'post'
   })
   }
   */
  // Programmatically submit form alternative ---

  return (
    <Form // Stay in the SPA and avoid reloading the page which happens with the regular 'form'.
      // It also allows us to use the 'useNavigation' hook to know, for example, the state of the request.
      method={ expenseData ? 'patch' : 'post' }
      className="form"
      id="expense-form"
      //onSubmit={submitHandler} // Programmatically submit form alternative
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={ 30 } defaultValue={ defaultValues.title }/>
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={ defaultValues.amount }
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={ today }
            required
            defaultValue={ defaultValues.date ? defaultValues.date.slice(0, 10) : '' }
          />
        </p>
      </div>
      { validationErrors && (
        <ul>
          { Object.values(validationErrors).map((error: any) => (
            <li key={ error }>{ error }</li>
          )) }
        </ul>
      ) }
      <div className="form-actions">
        <button disabled={ isSubmitting }>{ isSubmitting ? 'Saving...' : 'Save Expense' }</button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}];
}