import { prisma } from './database.server';
import type { FormExpense } from '~/components/expenses/form/types';

export const addExpense = async (expenseData: FormExpense, userId: string) => {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: {connect: {id: userId}}
      }
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getExpenses = async (userId: string) => {
  if (!userId) {
    throw new Error('Failed to get expenses.');
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: {userId: userId},
      orderBy: {date: 'desc'}
    });
    return expenses;
  } catch (error) {
    throw new Error('Failed to get expenses.');
  }
};

export const getExpense = async (id: string | undefined) => {
  try {
    const expense = await prisma.expense.findFirst({
      where: {id}
    });
    return expense;
  } catch (error) {
    throw new Error('Failed to get expense.');
  }
};

export const updateExpense = async (id: string, expenseData: FormExpense) => {
  try {
    await prisma.expense.update({
      where: {id},
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date)
      }
    });
  } catch (error) {
    throw new Error('Failed to update expense.');
  }
};

export const deleteExpense = async (id: string) => {
  try {
    await prisma.expense.delete({
      where: {id}
    });
  } catch (error) {
    throw new Error('Failed to delete expense.');
  }
};