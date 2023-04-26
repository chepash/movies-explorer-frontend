function HamburgerButton() {
  return (
    <>
      <input id="burger-toggle" type="checkbox" className="burger-toggle" />
      <label htmlFor="burger-toggle" className="button button_type_hamburger">
        <div className="top-bun burger-toggle__part" />
        <div className="meat burger-toggle__part" />
        <div className="bottom-bun burger-toggle__part" />
      </label>
    </>
  );
}

export default HamburgerButton;
