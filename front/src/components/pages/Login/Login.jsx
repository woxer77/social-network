import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Form, Formik } from 'formik';

import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';

import styles from '../../../assets/styles/scss/Auth.module.scss';

// import AuthSvgSelector from '../../../assets/images/icons/auth/AuthSvgSelector';

import schema from '../../../helpers/validation/login';
import FormikField from '../../UI/FormikField/FormikField';
import FilledButton from '../../UI/FilledButton/FilledButton';

import { login } from '../../../services/auth';
import { setUser, setAuth } from '../../../redux/slices/userSlice';

import activateAlert from '../../../helpers/alert';
import Alert from '../../UI/Alert/Alert';

function Login() {
  const [isAlertActive, setIsAlertActive] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutateHook = useMutation(
    'user login',
    (data) => login(data.email, data.password),
    {
      onSuccess(res) {
        const { user } = res.data;
        const { accessToken } = res.data;

        localStorage.setItem('token', accessToken);

        dispatch(setUser(user));
        dispatch(setAuth(true));
        navigate('/');
      },
      onError(error) {
        activateAlert(isAlertActive, setIsAlertActive, error, setErrorMessage, 3000);
      }
    }
  );

  const onFormSubmit = async (data) => {
    const localData = { ...data };

    mutateHook.mutate(localData);
  };

  return (
    <>
      <Alert isAlertActive={isAlertActive} errorMessage={errorMessage} />
      <div className={styles['main-container']}>
        <p className={styles.title}>
          Sign In
        </p>
        <p className={styles.text}>
          Welcome back, you&apos;ve been missed!
        </p>
        <div className={styles['form-wrapper']}>
          {/* <div className={styles['buttons-wrapper']}>
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
          </div> */}
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={onFormSubmit}
            validationSchema={schema}
          >
            {({
              handleSubmit
            }) => (
              <Form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles['default-fields-wrapper']}>
                  <FormikField name="email" type="email" iconId="email" placeholder="Your Email" />
                  <FormikField name="password" type="password" iconId="password" placeholder="Create Password" />
                </div>
                <FilledButton customClassName={styles.submit}>
                  {mutateHook.isLoading ? <CircularProgress color="inherit" size={30} /> : 'Sign In'}
                </FilledButton>
                <div className={styles['sign-in']}>
                  <p className={styles.text}>You haven&apos;t any account?</p>
                  <Link className="link" to="/auth/registration">Sign Up</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Login;
