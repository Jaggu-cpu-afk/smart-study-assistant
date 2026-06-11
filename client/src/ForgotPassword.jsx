import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { KeyRound, ArrowLeft, BookOpen, Mail } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    
    // MOCK SUBMIT (Since Firebase is removed)
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
      toast.success("Password reset email sent! (Mock)");
    }, 1500);
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
          <KeyRound size={64} color="var(--accent-cyan)" />
        </div>
        <h1 className="gradient-text" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
          Account Recovery
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", maxWidth: "400px" }}>
          Don't worry, it happens to the best of us. Let's get you back into your account.
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
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>Reset Password</h2>
          
          {emailSent ? (
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ background: "rgba(16, 185, 129, 0.1)", padding: "2rem", borderRadius: "1rem", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                <p style={{ color: "var(--accent-emerald)", fontSize: "1.1rem", lineHeight: "1.5", margin: 0 }}>
                  We've sent a password reset link to:<br/>
                  <strong style={{ display: "inline-block", marginTop: "0.5rem", wordBreak: "break-all", color: "#fff" }}>{email}</strong>
                </p>
                <div style={{ height: "1px", background: "rgba(16, 185, 129, 0.2)", margin: "1.5rem 0" }}></div>
                <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                  Please check your inbox (and spam folder) and follow the instructions.
                </p>
              </div>
              <Link to="/login" className="btn-neon cyan" style={{ display: "inline-block", width: "100%", textAlign: "center", textDecoration: "none" }}>
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ position: "relative" }}>
                <Mail size={20} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input"
                  style={{ paddingLeft: "3rem" }}
                  placeholder="Enter your registered email"
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="btn-neon cyan" style={{ marginTop: "1rem" }}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Link to="/login" style={{ color: "var(--text-muted)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <ArrowLeft size={16} /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
