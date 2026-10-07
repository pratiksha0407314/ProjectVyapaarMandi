import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Sprout,
  Store,
  Truck,
  MapPin,
  Car,
  CreditCard
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";

function Register() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    farmType: "",
    farmAddress: "",

    businessType: "",
    businessAddress: "",

    vehicleType: "",
    vehicleNo: "",
    licenseNo: "",
    driverName: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");

  function handleRoleChange(role) {
    setSelectedRole(role);
    setMessage("");

    setFormData((previous) => ({
      ...previous,

      farmType: "",
      farmAddress: "",

      businessType: "",
      businessAddress: "",

      vehicleType: "",
      vehicleNo: "",
      licenseNo: "",
      driverName: ""
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    if (!selectedRole) {
      setMessage("Please select your role first.");
      return;
    }

    if (!formData.name.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!formData.phone.trim()) {
      setMessage("Please enter your phone number.");
      return;
    }

    if (!formData.password) {
      setMessage("Please enter your password.");
      return;
    }

    if (!formData.confirmPassword) {
      setMessage("Please confirm your password.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (selectedRole === "farmer") {
      if (!formData.farmType.trim()) {
        setMessage("Please enter your farm type.");
        return;
      }

      if (!formData.farmAddress.trim()) {
        setMessage("Please enter your farm address.");
        return;
      }
    }

    if (selectedRole === "vendor") {
      if (!formData.businessType.trim()) {
        setMessage("Please enter your business type.");
        return;
      }

      if (!formData.businessAddress.trim()) {
        setMessage("Please enter your business address.");
        return;
      }
    }

    if (selectedRole === "transporter") {
      if (!formData.vehicleType.trim()) {
        setMessage("Please enter your vehicle type.");
        return;
      }

      if (!formData.vehicleNo.trim()) {
        setMessage("Please enter your vehicle number.");
        return;
      }

      if (!formData.licenseNo.trim()) {
        setMessage("Please enter your license number.");
        return;
      }

      if (!formData.driverName.trim()) {
        setMessage("Please enter the driver's name.");
        return;
      }
    }

    const userId =
      selectedRole.toUpperCase() + "-" + Date.now();

    const registeredUser = {
      user_id: userId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: selectedRole,
      language: "English",
      status: "Active",
      created_at: new Date().toISOString()
    };

    if (selectedRole === "farmer") {
      registeredUser.farmer = {
        farm_type: formData.farmType,
        farm_address: formData.farmAddress
      };
    }

    if (selectedRole === "vendor") {
      registeredUser.vendor = {
        business_type: formData.businessType,
        business_address: formData.businessAddress
      };
    }

    if (selectedRole === "transporter") {
      registeredUser.transporter = {
        vehicle_type: formData.vehicleType,
        vehicle_no: formData.vehicleNo,
        license_no: formData.licenseNo,
        availability: true,
        driver_name: formData.driverName
      };
    }

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(registeredUser)
    );

    navigate("/");
  }

  return (
    <main className="register-page">

      <div className="register-background"></div>

      <div className="register-overlay"></div>

      <div className="register-content">

        <section className="register-card">

          {/* Heading */}
          <div className="register-heading">

            <div className="register-icon">
              <User size={24} />
            </div>

            <div>
              <h1>Create Account</h1>

              <p>
                Register to join VyapaarMandi.
              </p>
            </div>

          </div>

          <div className="card-divider"></div>

          {/* Message */}
          {message && (
            <div className="form-message">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* ROLE SELECTION */}
            <RoleSelector
              selectedRole={selectedRole}
              onSelect={handleRoleChange}
              includeAdmin={false}
            />

            {selectedRole && (
              <>
                {/* YOUR DETAILS */}
                <div className="register-role-title">
                  Your Details
                </div>

                {/* ALL DETAILS IN ONE TWO-COLUMN GRID */}
                <div className="register-grid">

                  {/* FULL NAME */}
                  <div className="form-group">

                    <label htmlFor="register-name">
                      Full Name
                    </label>

                    <div className="input-wrapper">

                      <User
                        size={18}
                        className="input-icon"
                      />

                      <input
                        id="register-name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                  {/* EMAIL */}
                  <div className="form-group">

                    <label htmlFor="register-email">
                      Email Address
                    </label>

                    <div className="input-wrapper">

                      <Mail
                        size={18}
                        className="input-icon"
                      />

                      <input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                  {/* PHONE */}
                  <div className="form-group">

                    <label htmlFor="register-phone">
                      Phone Number
                    </label>

                    <div className="input-wrapper">

                      <Phone
                        size={18}
                        className="input-icon"
                      />

                      <input
                        id="register-phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                  {/* ================= FARMER ================= */}

                  {selectedRole === "farmer" && (
                    <>

                      {/* FARM TYPE */}
                      <div className="form-group">

                        <label htmlFor="farm-type">
                          Farm Type
                        </label>

                        <div className="input-wrapper">

                          <Sprout
                            size={18}
                            className="input-icon"
                          />

                          <input
                            id="farm-type"
                            name="farmType"
                            type="text"
                            placeholder="e.g. Organic, Dairy, Mixed"
                            value={formData.farmType}
                            onChange={handleChange}
                          />

                        </div>

                      </div>

                      {/* FARM ADDRESS */}
                      <div className="form-group">

                        <label htmlFor="farm-address">
                          Farm Address
                        </label>

                        <div className="input-wrapper">

                          <MapPin
                            size={18}
                            className="input-icon"
                          />

                          <input
                            id="farm-address"
                            name="farmAddress"
                            type="text"
                            placeholder="Enter your farm address"
                            value={formData.farmAddress}
                            onChange={handleChange}
                          />

                        </div>

                      </div>

                    </>
                  )}

                  {/* ================= VENDOR ================= */}

                  {selectedRole === "vendor" && (
                    <>

                      {/* BUSINESS TYPE */}
                      <div className="form-group">

                        <label htmlFor="business-type">
                          Business Type
                        </label>

                        <div className="input-wrapper">

                          <Store
                            size={18}
                            className="input-icon"
                          />

                          <input
                            id="business-type"
                            name="businessType"
                            type="text"
                            placeholder="e.g. Retailer, Wholesaler"
                            value={formData.businessType}
                            onChange={handleChange}
                          />

                        </div>

                      </div>

                      {/* BUSINESS ADDRESS */}
                      <div className="form-group">

                        <label htmlFor="business-address">
                          Business Address
                        </label>

                        <div className="input-wrapper">

                          <MapPin
                            size={18}
                            className="input-icon"
                          />

                          <input
                            id="business-address"
                            name="businessAddress"
                            type="text"
                            placeholder="Enter your business address"
                            value={formData.businessAddress}
                            onChange={handleChange}
                          />

                        </div>

                      </div>

                    </>
                  )}

                  {/* ================= TRANSPORTER ================= */}

                  {selectedRole === "transporter" && (
                    <>

                      {/* VEHICLE TYPE */}
                      <div className="form-group">

                        <label htmlFor="vehicle-type">
                          Vehicle Type
                        </label>

                        <div className="input-wrapper">

                          <Truck
                            size={18}
                            className="input-icon"
                          />

                          <input
                            id="vehicle-type"
                            name="vehicleType"
                            type="text"
                            placeholder="e.g. Truck, Mini Truck"
                            value={formData.vehicleType}
                            onChange={handleChange}
                          />

                        </div>

                      </div>

                      {/* VEHICLE NUMBER */}
                      <div className="form-group">

                        <label htmlFor="vehicle-no">
                          Vehicle Number
                        </label>

                        <div className="input-wrapper">

                          <Car
                            size={18}
                            className="input-icon"
                          />

                          <input
                            id="vehicle-no"
                            name="vehicleNo"
                            type="text"
                            placeholder="Enter vehicle number"
                            value={formData.vehicleNo}
                            onChange={handleChange}
                          />

                        </div>

                      </div>

                      {/* LICENSE NUMBER */}
                      <div className="form-group">

                        <label htmlFor="license-no">
                          License Number
                        </label>

                        <div className="input-wrapper">

                          <CreditCard
                            size={18}
                            className="input-icon"
                          />

                          <input
                            id="license-no"
                            name="licenseNo"
                            type="text"
                            placeholder="Enter license number"
                            value={formData.licenseNo}
                            onChange={handleChange}
                          />

                        </div>

                      </div>

                      {/* DRIVER NAME */}
                      <div className="form-group">

                        <label htmlFor="driver-name">
                          Driver Name
                        </label>

                        <div className="input-wrapper">

                          <User
                            size={18}
                            className="input-icon"
                          />

                          <input
                            id="driver-name"
                            name="driverName"
                            type="text"
                            placeholder="Enter driver's name"
                            value={formData.driverName}
                            onChange={handleChange}
                          />

                        </div>

                      </div>

                    </>
                  )}

                  {/* PASSWORD */}
                  <div className="form-group">

                    <label htmlFor="register-password">
                      Password
                    </label>

                    <div className="input-wrapper">

                      <Lock
                        size={18}
                        className="input-icon"
                      />

                      <input
                        id="register-password"
                        name="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPassword(!showPassword)
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

                  {/* CONFIRM PASSWORD */}
                  <div className="form-group">

                    <label htmlFor="confirm-password">
                      Confirm Password
                    </label>

                    <div className="input-wrapper">

                      <Lock
                        size={18}
                        className="input-icon"
                      />

                      <input
                        id="confirm-password"
                        name="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>

                    </div>

                  </div>

                </div>

                {/* CREATE ACCOUNT */}
                <button
                  type="submit"
                  className="register-button"
                >
                  Create Account
                </button>

                {/* SIGN IN */}
                <div className="login-link-area">

                  <span>
                    Already have an account?
                  </span>

                  <Link
                    to="/"
                    className="signin-link"
                  >
                    Sign In
                  </Link>

                </div>

              </>
            )}

          </form>

        </section>

      </div>

    </main>
  );
}

export default Register;