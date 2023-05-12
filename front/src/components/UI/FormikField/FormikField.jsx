import React from 'react';

import { Field } from 'formik';
import styles from './FormikField.module.scss';
import AuthSvgSelector from '../../../assets/images/icons/auth/AuthSvgSelector';
import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';
import formikFieldProps from '../../../propTypes/FormikField/formikFieldProps';

function FormikField({
  name, type, placeholder, iconId, customClassName
}) {
  const fieldStyles = customClassName
    ? `${styles['default-field']} ${customClassName}`
    : styles['default-field'];
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const password = type === 'password';

  function showPassword() {
    setIsShowPassword(!isShowPassword);
  }

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className={fieldStyles}>
          <div className={styles['start-icon']}>
            <AuthSvgSelector id={iconId} />
          </div>
          {password ? (
            <input type={isShowPassword ? 'text' : 'password'} {...field} placeholder={placeholder} />
          ) : (
            <input type={type} {...field} placeholder={placeholder} />
          )}
          {password && (
            <div className={styles['end-icon']} onClick={showPassword}>
              <GlobalSvgSelector id={isShowPassword ? 'eyeOn' : 'eyeOff'} />
            </div>
          )}
          {meta.touched
            && meta.error && <div className={styles.error}>{meta.error}</div>}
        </div>
      )}
    </Field>
  );
}

FormikField.propTypes = formikFieldProps;

export default FormikField;
