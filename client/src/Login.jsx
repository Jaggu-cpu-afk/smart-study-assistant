import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";
import { BookOpen, KeyRound, Mail, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login Successful! 🚀");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Branding Panel */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem",
        background: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid var(--glass-border)",
        textAlign: "center"
      }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))",
          padding: "2rem",
          borderRadius: "50%",
          marginBottom: "2rem",
          boxShadow: "0 0 40px rgba(6, 182, 212, 0.2)"
        }}>
          <BookOpen size={64} color="var(--accent-cyan)" />
        </div>
        <h1 className="gradient-text" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
          Smart Study
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", maxWidth: "400px" }}>
          Your AI-powered assistant for generating notes, flashcards, and MCQs in seconds.
        </p>
      </div>

      {/* Right Form Panel */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem"
      }}>
        <div className="glass-card" style={{ width: "100%", maxWidth: "450px", padding: "3rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Welcome Back</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Enter your credentials to access your account.</p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ position: "relative" }}>
              <Mail size={20} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="email"
                className="glass-input"
                style={{ paddingLeft: "3rem" }}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div style={{ position: "relative" }}>
              <KeyRound size={20} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="password"
                className="glass-input"
                style={{ paddingLeft: "3rem" }}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div style={{ textAlign: "right" }}>
              <Link to="/forgot-password" style={{ color: "var(--accent-cyan)", fontSize: "0.9rem", textDecoration: "none" }}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn-neon" style={{ marginTop: "1rem" }}>
              Sign In <ArrowRight size={20} />
            </button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--accent-cyan)", textDecoration: "none", fontWeight: "600" }}>
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;