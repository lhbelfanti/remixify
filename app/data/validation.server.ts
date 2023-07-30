import type { FormExpense } from '~/components/expenses/form/types';
import { FormAuth } from '~/components/auth/form/types';

const isValidTitle = (value: string) => {
  return value && value.trim().length > 0 && value.trim().length <= 30;
}

const isValidAmount = (value: string) => {
  const amount = parseFloat(value);
  return !isNaN(amount) && amount > 0;
}

const isValidDate = (value: string) => {
  return value && new Date(value).getTime() < new Date().getTime();
}

export const validateExpenseInput = (input: FormExpense) => {
  let validationErrors: { [key: string]: unknown } = {};

  if (!isValidTitle(input.title)) {
    validationErrors.title = 'Invalid expense title. Must be at most 30 characters long.'
  }

  if (!isValidAmount(input.amount)) {
    validationErrors.amount = 'Invalid amount. Must be a number greater than zero.'
  }

  if (!isValidDate(input.date)) {
    validationErrors.date = 'Invalid date. Must be a date before today.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

const isValidEmail = (value: string) => {
  return value && value.includes('@');
}

const isValidPassword = (value: string) => {
  return value && value.trim().length >= 7;
}

export const validateCredentials = (input: FormAuth) => {
  let validationErrors: { [key: string]: unknown } = {};

  if (!isValidEmail(input.email)) {
    validationErrors.email = 'Invalid email address.'
  }

  if (!isValidPassword(input.password)) {
    validationErrors.password = 'Invalid password. Must be at least 7 characters long.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}