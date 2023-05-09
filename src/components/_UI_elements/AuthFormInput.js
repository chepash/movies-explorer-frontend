function AuthFormInput({
  label,
  value,
  type,
  error,
  onChange,
  additionalClassName = '',
  ...props
}) {
  return (
    <label
      className={`form__label
        ${additionalClassName ? `form__label_${additionalClassName}` : ''}
        ${error ? ' form__label_type_error' : ''}`}
    >
      {label}

      <input
        type={type}
        className={`form__input
        ${additionalClassName ? `form__input_${additionalClassName}` : ''}
        ${error ? ' form__input_type_error' : ''}`}
        value={value}
        onChange={onChange}
        {...props}
      />
    </label>
  );
}

export default AuthFormInput;
