import { useState } from 'react';

function ToggleButton({ moviesSearchState, handleToggleCheckbox }) {
  const [isChecked, setIsChecked] = useState(moviesSearchState.isToggleChecked);

  function handleToggleChange(e) {
    setIsChecked(e.target.checked);
    handleToggleCheckbox(e.target.checked);
  }

  return (
    <>
      <input
        id="toggle"
        type="checkbox"
        className="toggle"
        checked={isChecked}
        onChange={handleToggleChange}
      />
      <label htmlFor="toggle" className="toggle__label">
        <span className="toggle__knob" />
      </label>
    </>
  );
}

export default ToggleButton;
