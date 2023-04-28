function Input({ label, value, type, error, onChange }) {
  return (
    <div className="form__input-container">
      <label className="form__input-label">{label}</label>
      <input
        type={type}
        className={`form__input
        ${error ? ' form__input_type_error' : ''}`}
        value={value}
        onChange={onChange} // для будущей валидации
      />
    </div>
  );
}

export default Input;
