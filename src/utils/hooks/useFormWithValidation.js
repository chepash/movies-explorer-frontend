import React, { useCallback } from 'react';
import { isEmail } from 'validator';
// хук управления формой и валидации формы

function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;

    let errorMessage = '';
    if (name === 'name' && !/^[a-zA-Zа-яА-Я\s-]+$/.test(value)) {
      errorMessage =
        'Можно использовать только латиницу, кириллицу, пробел или дефис.';
    } else if (name === 'email' && !isEmail(value)) {
      errorMessage = 'Введите корректный E-mail';
    } else {
      errorMessage = target.validationMessage;
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });

    if (name === 'email' && errorMessage) {
      setIsValid(false);
    } else if (name === 'name' && errorMessage) {
      setIsValid(false);
    } else {
      setIsValid(target.closest('form').checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  };
}

export default useFormWithValidation;
