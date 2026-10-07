import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import Header from "./components/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/faq"
          element={<FAQ />}
        />

        <Route
          path="/farmer/dashboard"
          element={
            <DashboardPage role="Farmer" />
          }
        />

        <Route
          path="/vendor/dashboard"
          element={
            <DashboardPage role="Vendor" />
          }
        />

        <Route
          path="/transporter/dashboard"
          element={
            <DashboardPage role="Transporter" />
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <DashboardPage role="Admin" />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;