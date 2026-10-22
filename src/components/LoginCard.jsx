
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
  const [loading, setLoading] = useState(false);

  function handleRoleChange(role) {
    setSelectedRole(role);
    setMessage("");
  }

  async function handleSubmit(event) {
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

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
            role: selectedRole
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed. Please try again."
        );
      }

      if (!data.token || !data.user) {
        throw new Error("Invalid response from the server.");
      }

      if (data.user.role !== selectedRole) {
        throw new Error(
          "The selected role does not match your account."
        );
      }

      // Save the authenticated user's session.
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userEmail", data.user.email);

      // Navigate to the correct dashboard for the selected role.
      if (data.user.role === "farmer") {
        navigate("/farmer/dashboard");
      } else if (data.user.role === "vendor") {
        navigate("/vendor/dashboard");
      } else if (data.user.role === "transporter") {
        navigate("/transporter/dashboard");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");

        throw new Error("This account has an unsupported role.");
      }
    } catch (error) {
      if (error instanceof TypeError) {
        setMessage(
          "Cannot connect to the server. Please check that the backend is running."
        );
      } else {
        setMessage(
          error.message || "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-card">
      <div className="login-card-heading">
        <div className="login-icon">
          <User size={22} />
        </div>

        <div>
          <h2>Welcome Back</h2>
          <p>Sign in to continue to your account.</p>
        </div>
      </div>

      <div className="card-divider"></div>

      {message && (
        <div className="form-message" role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <RoleSelector
          selectedRole={selectedRole}
          onSelect={handleRoleChange}
          includeAdmin={false}
        />

        <div className="form-group">
          <label htmlFor="login-email">
            Email Address
          </label>

          <div className="input-wrapper">
            <User size={18} className="input-icon" />

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="login-password">
            Password
          </label>

          <div className="input-wrapper">
            <Lock size={18} className="input-icon" />

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setMessage("");
              }}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="forgot-row">
          <button
            type="button"
            className="forgot-button"
            onClick={() =>
              setMessage(
                "Password recovery is not connected yet. Please contact your project team."
              )
            }
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="register-area">
          <span>Don't have an account?</span>
          <Link to="/register">Create Account</Link>
        </div>
      </form>
    </section>
  );
}

export default LoginCard;
