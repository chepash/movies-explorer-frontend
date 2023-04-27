function HamburgerButton() {
  return (
    <>
      <input id="burger-toggle" type="checkbox" className="burger-toggle" />
      <label htmlFor="burger-toggle" className="button button_type_hamburger">
        <div className="burger-toggle__part burger-toggle__top-bun" />
        <div className="burger-toggle__part burger-toggle__meat" />
        <div className="burger-toggle__part burger-toggle__bottom-bun" />
      </label>
    </>
  );
}

export default HamburgerButton;
