import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { Form, Formik } from 'formik';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  FormControlLabel, Radio, RadioGroup
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import styles from '../../../assets/styles/scss/Auth.module.scss';

import AuthSvgSelector from '../../../assets/images/icons/auth/AuthSvgSelector';
import FilledButton from '../../UI/FilledButton/FilledButton';
import FormikField from '../../UI/FormikField/FormikField';
import schema from '../../../helpers/validation/registration';

import { registration } from '../../../services/auth';
import { setEmail } from '../../../redux/slices/userSlice';

import activateAlert from '../../../helpers/alert';
import Alert from '../../UI/Alert/Alert';

function Registration() {
  const [gender, setGender] = React.useState('male');
  const [isAlertActive, setIsAlertActive] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialDateOfBirth = dayjs(Date.now() - 567993600000);

  const mutateHook = useMutation(
    'user registration',
    (data) => registration(data),
    {
      onSuccess(res) {
        const { email } = res.data.user;
        const { accessToken } = res.data.accessToken;

        localStorage.setItem('token', accessToken);

        dispatch(setEmail(email));
        navigate('/email-activation');
      },
      onError(error) {
        activateAlert(isAlertActive, setIsAlertActive, error, setErrorMessage, 3000);
      }
    }
  );

  const onFormSubmit = async (data) => {
    const localData = { ...data };
    const date = localData.dateOfBirth.get('date');
    const month = localData.dateOfBirth.get('month') + 1;
    const year = localData.dateOfBirth.get('year');
    localData.dateOfBirth = `${year}-${month > 9 ? (month) : (`0${month}`)}-${date}`;

    mutateHook.mutate(localData);
  };

  return (
    <>
      <Alert isAlertActive={isAlertActive} errorMessage={errorMessage} />
      <div className={styles['main-container']}>
        <p className={styles.title}>
          Getting Started
        </p>
        <p className={styles.text}>
          Create an account to continue and connect with the people.
        </p>
        <div className={styles['form-wrapper']}>
          <div className={styles['buttons-wrapper']}>
            <button type="button" className={styles['auth-button']}>
              <AuthSvgSelector id="google" width="30px" height="30px" />
              Log in with Google
            </button>
            <button type="button" className={styles['auth-button']}>
              <AuthSvgSelector id="facebook" width="30px" height="30px" />
              Log in with Facebook
            </button>
          </div>
          <div className={styles.separator}>
            <span />
            <p>OR</p>
            <span />
          </div>
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              secondName: '',
              password: '',
              dateOfBirth: initialDateOfBirth,
              gender: 'male'
            }}
            onSubmit={onFormSubmit}
            validationSchema={schema}
          >
            {({
              errors, handleSubmit, values, setFieldValue
            }) => (
              <Form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles['default-fields-wrapper']}>
                  <FormikField name="email" type="email" iconId="email" placeholder="Your Email" />
                  <FormikField name="firstName" type="name" iconId="regName" placeholder="Your First name" />
                  <FormikField name="secondName" type="name" iconId="regSurname" placeholder="Your Second name" />
                  <FormikField name="password" type="password" iconId="password" placeholder="Create Password" />
                </div>
                <div className={styles['double-field']}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={values.dateOfBirth}
                      onChange={(value) => setFieldValue('dateOfBirth', value, true)}
                      inputFormat="DD/MM/YYYY"
                      minDate="01/01/1920"
                      maxDate={dayjs()}
                      renderInput={({ inputRef, inputProps, InputProps }) => (
                        <div className={styles['date-field']}>
                          {InputProps?.endAdornment}
                          <input name="dateOfBirth" ref={inputRef} {...inputProps} />
                          {errors.dateOfBirth
                            && <div className={styles.error}>{errors.dateOfBirth}</div>}
                        </div>
                      )}
                    />
                  </LocalizationProvider>
                  <div className={styles['gender-field']}>
                    <div className={styles.wrapper}>
                      <AuthSvgSelector id={gender} />
                      <RadioGroup
                        row
                        name="gender"
                        onChange={(event, value) => {
                          values.gender = value;
                          setGender(value);
                        }}
                        defaultValue="male"
                      >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                      </RadioGroup>
                    </div>
                    {errors.gender
                      && <div className={styles.error}>{errors.gender}</div>}
                  </div>
                </div>
                <FilledButton customClassName={styles.submit}>
                  {mutateHook.isLoading ? <CircularProgress color="inherit" size={30} /> : 'Sign Up'}
                </FilledButton>
                <div className={styles['sign-in']}>
                  <p className={styles.text}>Already have an account?</p>
                  <Link className="link" to="/auth/login">Sign In</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Registration;
