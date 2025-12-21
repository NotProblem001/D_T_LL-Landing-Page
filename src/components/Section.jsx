export default function Section({ title, subtitle, children, id, className = "", variant = "light" }) {
  const bgClass = variant === "dark" ? "bg-dark text-white" : variant === "offset" ? "bg-offset" : "bg-light";

  return (
    <section id={id} className={`section-padding ${bgClass} ${className}`}>
      <div className="container">
        {title && (
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 className={variant === 'dark' ? 'text-white' : 'text-primary'}>{title}</h2>
            {subtitle && <h4 className={variant === 'dark' ? 'text-light-dark' : 'section-subtitle'}>{subtitle}</h4>}
          </div>
        )}
        <div>{children}</div>
      </div>
    </section>
  );
}

