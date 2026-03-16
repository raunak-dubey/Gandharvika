import { forwardRef } from "react";

const FormField = forwardRef(
  ({ label, type, placeholder, error, ...props }, ref) => {
    return (
      <div className="field">
        <label htmlFor={props.id || props.name}>{label}</label>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          required
          {...props}
        />
        <p className="error">{error}</p>
      </div>
    );
  },
);

export default FormField;
