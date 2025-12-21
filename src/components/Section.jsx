export default function Section({ title, subtitle, children, className = "" }) {
  return (
    <section className={`fade-in ${className}`} style={{ minHeight: "100vh", padding: "6rem 2rem" }}>
      <h2>{title}</h2>
      <h4>{subtitle}</h4>
      <div>{children}</div>
    </section>
  );
}
