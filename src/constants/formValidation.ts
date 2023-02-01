import * as yup from 'yup';

export const formValidation = yup.object().shape({
  name: yup.string().min(3, 'Must be 3 characters or more').required(),
  description: yup.string().required(),
});

export const todoFormValidation = yup.object().shape({
  name: yup.string().min(3, 'Must be 3 characters or more').required(),
});
