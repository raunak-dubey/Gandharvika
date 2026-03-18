import { Link } from "react-router";
import "../styles/form.scss";
import FormField from "./FormField";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, registerSchema } from "../validators/auth.schema";
import useAuth from "../hooks/useAuth";

const Form = ({ mode }) => {
  const isLogin = mode === "login";

  const { login, register } = useAuth();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        await login.mutateAsync({
          identifier: data.identifier.trim(),
          password: data.password.trim(),
        });
      } else {
        await register.mutateAsync({
          username: data.username.trim(),
          email: data.email.trim(),
          password: data.password.trim(),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loading = login.isLoading || register.isLoading;
  const formError =
    login.error?.response?.data?.message ||
    register.error?.response?.data?.message ||
    login.error?.message ||
    register.error?.message;

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

        <form onSubmit={handleSubmit(onSubmit)}>
          {isLogin ? (
            <FormField
              label="Email or Username"
              type="text"
              placeholder="Enter your email or username"
              {...registerField("identifier")}
              error={errors.identifier?.message}
            />
          ) : (
            <>
              <FormField
                label="Username"
                type="text"
                placeholder="Enter your username"
                {...registerField("username")}
                error={errors.username?.message}
              />
              <FormField
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...registerField("email")}
                error={errors.email?.message}
              />
            </>
          )}
          <FormField
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...registerField("password")}
            error={errors.password?.message}
          />

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
