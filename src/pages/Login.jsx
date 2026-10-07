import Hero from "../components/Hero";
import LoginCard from "../components/LoginCard";

function Login() {
  return (
    <main
      className="login-page"
      style={{
        backgroundImage: "url('/background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="login-overlay"></div>

      <div className="login-content">
        <Hero />

        <div className="login-side">
          <LoginCard />
        </div>
      </div>
    </main>
  );
}

export default Login;