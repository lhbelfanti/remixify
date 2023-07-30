import type { ExpensesListItemProps } from '~/components/expenses/list/item/types';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import { Link, useFetcher } from '@remix-run/react';

const ExpenseListItem = ({id, title, amount}: ExpensesListItemProps) => {
  //const submit = useSubmit();
  const fetcher = useFetcher();

  const deleteExpenseItemHandler = () => {
    // submit(null, {
    //   method: 'delete',
    //   action: `/expenses/${ id }`
    // });

    // The solution above, stills redirecting to a page / creating a sub-sequential action after submit, which is what
    // we want to avoid. When you have buttons that you need to do some actions, and you don't want to navigate to
    // another page after that, then useFetcher is the solution.

    const proceed = confirm('Are you sure? Do you want to delete this item');
    if (!proceed) {
      return;
    }

    fetcher.submit(null, {
      method: 'delete',
      action: `/expenses/${ id }`
    });
  };

  if (fetcher.state !== 'idle') {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    )
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{ title }</h2>
        <p className="expense-amount">${ amount.toFixed(2) }</p>
      </div>
      <menu className="expense-actions">
        <button onClick={ deleteExpenseItemHandler }>Delete</button>

        {/*
         This generates the action from $id page to be called again, but it should behave in a different way.
         It can be solved by using a query parameter, or by checking for the method (in this case 'delete').
         */ }
        {/*<Form
         method="delete"
         action={ `/expenses/${ id }` }
         >
         <button>Delete</button>
         </Form>
         */ }
        <Link to={ id }>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}];
}