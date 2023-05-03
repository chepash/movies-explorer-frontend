function ToggleButton() {
  return (
    <>
      <input id="toggle" type="checkbox" className="toggle" />
      <label htmlFor="toggle" className="toggle__label">
        <span className="toggle__knob" />
      </label>
    </>
  );
}

export default ToggleButton;
