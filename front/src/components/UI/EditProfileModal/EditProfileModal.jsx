import React from 'react';

import { Form, Formik } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import FilledButton from '../FilledButton/FilledButton';
import AuthSvgSelector from '../../../assets/images/icons/auth/AuthSvgSelector';
import FormikField from '../FormikField/FormikField';
import schema from '../../../helpers/validation/edit-profile';
import styles from './EditProfileModal.module.scss';
import { editUser } from '../../../services/users';
import Alert from '../Alert/Alert';
import activateAlert from '../../../helpers/alert';

function EditProfileModal({
  // eslint-disable-next-line react/prop-types
  userId, firstName, secondName, email, dateOfBirth, gender, country, phone, isEditModalActive, setIsEditModalActive
}) {
  const [genderState, setGenderState] = React.useState(gender);
  const [isAlertActive, setIsAlertActive] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const initialDateOfBirth = dayjs(Date.parse(dateOfBirth));

  function closeModal() {
    setIsEditModalActive(false);
  }

  React.useEffect(() => {
    if (isEditModalActive) {
      document.body.classList.add('disable-scroll');
    } else {
      document.body.classList.remove('disable-scroll');
    }

    return () => {
      document.body.classList.remove('disable-scroll');
    };
  }, [isEditModalActive]);

  const mutateHook = useMutation(
    ['editUser', userId],
    (data) => editUser({ data, userId }),
    {
      onSuccess() {
        window.location.reload();
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

  const overlayStyles = !isEditModalActive ? `${styles.overlay}` : `${styles.overlay} ${styles.active}`;

  return (
    <>
      <div className={overlayStyles} onClick={closeModal} />
      <Alert isAlertActive={isAlertActive} errorMessage={errorMessage} />
      <div className={styles.modal}>
        <p className={styles.title}>Edit basic info</p>
        <Formik
          initialValues={{
            email,
            firstName,
            secondName,
            password: '',
            dateOfBirth: initialDateOfBirth,
            gender,
            country,
            phone
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
                <FormikField name="country" type="name" iconId="country" placeholder="Your Country" />
                <FormikField name="phone" type="name" iconId="phone" placeholder="Your Phone number" />
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
                    <AuthSvgSelector id={genderState} />
                    <RadioGroup
                      row
                      name="gender"
                      onChange={(event, value) => {
                        values.gender = value;
                        setGenderState(value);
                      }}
                      defaultValue={gender}
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
                {mutateHook.isLoading ? <CircularProgress color="inherit" size={30} /> : 'Edit'}
              </FilledButton>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default EditProfileModal;
