const FormInput = ({
  id,
  label,
  type = "text",
  register,
  error,
  icon,
  isSelect = false,
  options = [],
  value,
  onChange,
  ...rest
}) => {
  const inputProps = register ? { ...register(id) } : { value, onChange };

  return (
    <>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div className="input-group">
        {icon && <span className="input-group-text">{icon}</span>}
        {isSelect ? (
          <select
            id={id}
            className={`form-select ${error ? "is-invalid" : ""}`}
            {...inputProps}
            {...rest}
          >
            <option value="">Select...</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            type={type}
            className={`form-control ${error ? "is-invalid" : ""}`}
            {...inputProps}
            {...rest}
          />
        )}
      </div>
      {error && <div className="invalid-feedback">{error.message}</div>}
    </>
  );
};

export default FormInput;
