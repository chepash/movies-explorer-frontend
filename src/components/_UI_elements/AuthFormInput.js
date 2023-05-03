function AuthFormInput({ label, value, type, error, onChange, ...props }) {
  return (
    <div className="form__input-container">
      <label className="form__input-label">{label}</label>
      <input
        type={type}
        className={`form__input
        ${error ? ' form__input_type_error' : ''}`}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default AuthFormInput;
