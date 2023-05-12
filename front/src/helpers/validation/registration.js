import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup
    .string()
    .required('This field is required')
    .email('Email address must be valid'),
  firstName: Yup
    .string()
    .required('This field is required')
    .min(2, 'First name must contain at least 2 characters')
    .max(16, 'First name must be up to 16 characters long')
    .matches(/^[a-zA-Z]+([-'][a-zA-Z]+)?$/gm, 'The first name must contain only letters of the Latin alphabet, as well as - and \''),
  secondName: Yup
    .string()
    .required('This field is required')
    .min(2, 'Second name must contain at least 2 characters')
    .max(16, 'Second name must be up to 16 characters long')
    .matches(/^[a-zA-Z]+([-'][a-zA-Z]+)?$/gm, 'The second name must contain only letters of the Latin alphabet, as well as - and \''),
  password: Yup
    .string()
    .required('This field is required')
    .min(8, 'Password must contain at least 8 characters long')
    .max(64, 'Password must be up to 64 characters long')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[^\w]/, 'Password must contain a symbol'),
  dateOfBirth: Yup
    .date()
    .typeError('Date of birth must be in the format DD/MM/YYYY')
    .max(new Date(Date.now() - 567993600000), 'You must be at least 18 years'),
  gender: Yup
    .string()
    .required('This field is required')
});

export default schema;
