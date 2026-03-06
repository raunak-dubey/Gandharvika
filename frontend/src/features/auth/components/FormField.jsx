const FormField = ({ label, type, placeholder, name, id, value, onChange }) => {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
