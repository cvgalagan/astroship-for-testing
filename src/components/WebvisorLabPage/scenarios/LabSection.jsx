function LabSection({ id, title, hint, children }) {
  return (
    <section className="form-section lab-section" id={id} data-testid={id}>
      <h2>{title}</h2>
      {hint && <p className="lab-hint">{hint}</p>}
      {children}
    </section>
  );
}

export default LabSection;
