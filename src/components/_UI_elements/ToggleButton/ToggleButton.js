function ToggleButton({
  isToggleChecked,
  setToggleChecked,
  handleToggleCheckbox,
}) {
  function handleToggleChange(e) {
    setToggleChecked(e.target.checked);

    handleToggleCheckbox(e.target.checked);
  }

  return (
    <>
      <input
        id="toggle"
        type="checkbox"
        className="toggle"
        checked={isToggleChecked || false}
        onChange={handleToggleChange}
      />
      <label htmlFor="toggle" className="toggle__label">
        <span className="toggle__knob" />
      </label>
    </>
  );
}

export default ToggleButton;
