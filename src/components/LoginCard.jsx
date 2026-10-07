import { useState } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RoleSelector from "./RoleSelector";

function LoginCard() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");

  function handleRoleChange(role) {
    setSelectedRole(role);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    if (!selectedRole) {
      setMessage("Please select your role.");
      return;
    }

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setMessage("Please enter your password.");
      return;
    }

    /*
      Temporary frontend login navigation.

      Later, Firebase Authentication
      and backend authentication will
      handle the real login.
    */

    if (selectedRole === "farmer") {
      navigate("/farmer/dashboard");
    }

    if (selectedRole === "vendor") {
      navigate("/vendor/dashboard");
    }

    if (selectedRole === "transporter") {
      navigate("/transporter/dashboard");
    }

    if (selectedRole === "admin") {
      navigate("/admin/dashboard");
    }
  }

  return (
    <section className="login-card">

      {/* ==============================
          CARD HEADING
      ============================== */}

      <div className="login-card-heading">

        <div className="login-icon">
          <User size={22} />
        </div>

        <div>
          <h2>
            Welcome Back
          </h2>

          <p>
            Sign in to continue to your account.
          </p>
        </div>

      </div>

      <div className="card-divider"></div>

      {/* ==============================
          MESSAGE
      ============================== */}

      {message && (
        <div className="form-message">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* ==============================
            ROLE
        ============================== */}

        <RoleSelector
          selectedRole={selectedRole}
          onSelect={handleRoleChange}
          includeAdmin={true}
        />

        {/* ==============================
            EMAIL
        ============================== */}

        <div className="form-group">

          <label htmlFor="login-email">
            Email Address
          </label>

          <div className="input-wrapper">

            <User
              size={18}
              className="input-icon"
            />

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
            />

          </div>

        </div>

        {/* ==============================
            PASSWORD
        ============================== */}

        <div className="form-group">

          <label htmlFor="login-password">
            Password
          </label>

          <div className="input-wrapper">

            <Lock
              size={18}
              className="input-icon"
            />

            <input
              id="login-password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setMessage("");
              }}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              aria-label="Show or hide password"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* ==============================
            FORGOT PASSWORD
        ============================== */}

        <div className="forgot-row">

          <button
            type="button"
            className="forgot-button"
            onClick={() =>
              setMessage(
                "Password recovery will be available soon."
              )
            }
          >
            Forgot Password?
          </button>

        </div>

        {/* ==============================
            LOGIN BUTTON
        ============================== */}

        <button
          type="submit"
          className="login-button"
        >
          Sign In
        </button>

        {/* ==============================
            REGISTER
        ============================== */}

        <div className="register-area">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </form>

    </section>
  );
}

export default LoginCard;