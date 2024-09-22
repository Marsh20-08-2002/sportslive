// Login.js

import { useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import SnackBar from "../../components/Animation/SnackBar";
import ApiLoading from "../../components/Animation/ApiLoading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(
          "api/v1/users/login",
          { email, password },
          config
        );

        if (data.status === "success") {
          setShowSuccessAlert(true);
          setTimeout(() => setShowSuccessAlert(false), 2000); // Hide success alert after 3 seconds

          setTimeout(() => {
            navigate("/"); // Redirect to homepage
            window.location.reload(); // Reload the page
          }, 2000); // Show success alert for 2 seconds
        }
      } catch (error) {
        setLoginError(true);
        setTimeout(() => setLoginError(false), 2000); // Hide error alert after 3 seconds
        console.error("Error logging in:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Email address"
                name="email"
                type="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="-mt-px">
              <input
                aria-label="Password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {/* <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm leading-5 text-gray-900"
              >
                Remember me
              </label>
            </div> */}

            <div className="text-sm leading-5">
              <Link
                to="/forgetPassword"
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="text-center my-4">
                <div className="loader inline-block">
                  <ApiLoading />
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 0 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4z"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            )}
          </div>
          {loginError && (
            <SnackBar
              isOpen={true}
              message="Login failed. Please try again."
              type="error"
            />
          )}
          {showSuccessAlert && (
            <SnackBar
              isOpen={true}
              message="Login successfull!"
              type="success"
            />
          )}
        </form>

        <p className="mt-2 text-center text-sm leading-5 text-gray-600">
          Dont Have an Account ?
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
