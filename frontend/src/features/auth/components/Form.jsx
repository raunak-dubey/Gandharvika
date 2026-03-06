import { Link } from "react-router";
import "../styles/form.scss";
import FormField from "./FormField";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Form = ({ mode }) => {
  const isLogin = mode === "login";

  const { loading, handleLogin, handleRegister } = useAuth();

  // ? set formData value
  const [formData, setFormData] = useState({
    identifier: "",
    username: "",
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ? Validation
  const validateLogin = () => {
    if (!formData.identifier.trim()) return "Email or Username is required";
    if (!formData.password.trim()) return "Password is required";
    return null;
  };

  const validateRegister = () => {
    if (!formData.username.trim()) return "Username is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.password.trim()) return "Password is required";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = isLogin ? validateLogin() : validateRegister();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      if (isLogin) {
        await handleLogin({
          identifier: formData.identifier.trim(),
          password: formData.password.trim(),
        });
      } else {
        await handleRegister({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
        });
      }
    } catch (err) {
      setFormError(err.message || "Something went wrong");
    }
  };
  return (
    <main className="auth-page">
      <div className="auth-form-container">
        <h1 className="heading">
          {isLogin ? "Log in to your account" : "Create your Account"}
        </h1>
        <p className="sub-para">
          {isLogin
            ? "Welcome back! Please enter your details"
            : "Register to start sharing your moments"}
        </p>

        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <FormField
              label="Email or Username"
              type="text"
              name="identifier"
              id="identifier"
              placeholder="Enter your email or username"
              value={formData.identifier}
              onChange={handleChange}
            />
          ) : (
            <>
              <FormField
                label="Username"
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
              <FormField
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </>
          )}
          <FormField
            label="Password"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <h4 className="forgetPass">Forget Password?</h4>

          {formError && <div className="form-error">{formError}</div>}

          <button
            type="submit"
            className={`btn ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="form-footer">
            {isLogin ? (
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            ) : (
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default Form;
