import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";
import { BookOpen, User, Mail, KeyRound, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      toast.success("Account created! Please log in.");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))",
          padding: "2rem",
          borderRadius: "50%",
          marginBottom: "2rem",
          boxShadow: "0 0 40px rgba(139, 92, 246, 0.2)"
        }}>
          <BookOpen size={64} color="var(--accent-purple)" />
        </div>
        <h1 className="gradient-text" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
          Join the Future
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", maxWidth: "400px" }}>
          Sign up to unlock the power of AI-driven studying.
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
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Create Account</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Fill in the details to get started.</p>

          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ position: "relative" }}>
              <User size={20} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                className="glass-input"
                style={{ paddingLeft: "3rem" }}
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <button type="submit" className="btn-neon purple" style={{ marginTop: "1rem" }}>
              Sign Up <ArrowRight size={20} />
            </button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
            Already have an account?{" "}
            <Link to="/" style={{ color: "var(--accent-purple)", textDecoration: "none", fontWeight: "600" }}>
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;