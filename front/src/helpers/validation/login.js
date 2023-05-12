import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup
    .string()
    .required('This field is required')
    .email('Email address must be valid'),
  password: Yup
    .string()
    .required('This field is required')
    .min(8, 'Password must contain at least 8 characters long')
    .max(64, 'Password must be up to 64 characters long')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[^\w]/, 'Password must contain a symbol')
});

export default schema;
