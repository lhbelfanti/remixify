import ExpenseForm from '~/components/expenses/form';
import Modal from '~/components/util/modal';
import { useNavigate } from 'react-router';
import { addExpense } from '~/data/expenses.server';
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { FormExpense } from '~/components/expenses/form/types';
import { validateExpenseInput } from '~/data/validation.server';
import { requireUserSession } from '~/data/auth.server';

const AddExpensesPage = () => {
  const navigate = useNavigate();
  const closeHandler = () => {
    navigate('..')
  }

  return (
    <Modal onClose={ closeHandler }>
      <ExpenseForm/>
    </Modal>
  )
};

export default AddExpensesPage;

export const action = async ({request}: ActionArgs) => {
  const userId = await requireUserSession(request);

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

  await addExpense(expenseData, userId);
  return redirect('/expenses')
}