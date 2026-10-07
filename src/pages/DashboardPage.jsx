import {
  LogOut,
  ArrowLeft
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";

function DashboardPage({ role }) {

  const navigate = useNavigate();

  function handleLogout() {

    localStorage.removeItem(
      "userRole"
    );

    localStorage.removeItem(
      "userEmail"
    );

    navigate("/");
  }

  return (
    <main className="dashboard-page">

      <div className="dashboard-card">

        <div className="dashboard-badge">
          {role}
        </div>

        <h1>
          {role} Dashboard
        </h1>

        <p>
          Your {role.toLowerCase()}
          workspace will be developed
          here.
        </p>

        <div className="dashboard-actions">

          <Link
            to="/"
            className="secondary-action"
          >
            <ArrowLeft size={17} />
            Back to Login
          </Link>

          <button
            type="button"
            className="primary-action"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </div>

    </main>
  );
}

export default DashboardPage;