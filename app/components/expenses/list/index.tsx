import type { ExpensesListProps } from '~/components/expenses/list/types';
import ExpenseListItem from '~/components/expenses/list/item';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

const ExpensesList = ({ expenses }: ExpensesListProps) => {

  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
}