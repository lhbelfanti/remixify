import ExpenseForm from '~/components/expenses/form';
import Modal from '~/components/util/modal';
import { useNavigate } from 'react-router';
import type { ActionArgs, V2_MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import type { Expense, FormExpense } from '~/components/expenses/form/types';
import { deleteExpense, updateExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';
import type { loader as expenseDetailsLoader } from '../__app.expenses/route';
/*import type { LoaderArgs } from '@remix-run/node';
 import { getExpense } from '~/data/expenses.server';*/

export const meta:
  V2_MetaFunction<typeof expenseDetailsLoader, { "routes/__app.expenses": typeof expenseDetailsLoader }> =
  ({data, matches}) => {
    const route = matches.find((match) => match.id === "routes/__app.expenses");
    const expenses: Expense[] | undefined = route?.data;
    const expense: Expense | null = expenses ? expenses[0] : null;

    const parentMeta = matches
      .flatMap((match) => match.meta ?? [])
      .filter((meta) => !("title" in meta)
      );

    if (expense) {
      return [...parentMeta, {title: expense.title}];
    }

    return parentMeta;
  };

const UpdateExpensesPage = () => {
  const navigate = useNavigate();

  return (
    <Modal
      onClose={ () => {
        navigate("..")
      } }
    >
      <ExpenseForm/>
    </Modal>
  )
};

export default UpdateExpensesPage;

/*
 export const loader = async ({ params }: LoaderArgs) => {
 const expenseId = params.id;
 const expense = await getExpense(expenseId);
 return expense;
 }*/

export const action = async ({params, request}: ActionArgs) => {
  const expenseId = params.id as string;

  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const title: string = formData.get('title') as string;
    const amount: string = formData.get('amount') as string;
    const date: string = formData.get('date') as string;
    const expenseData: FormExpense = {title: title, amount: amount, date: date};

    try {
      validateExpenseInput(expenseData)
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect('/expenses');
  } else if (request.method === 'DELETE') {
    await deleteExpense(expenseId)
    return {deletedId: expenseId};
  }
}