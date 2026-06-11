import { useNavigate } from "react-router-dom";
import { LogOut, FileText, FileQuestion, Layers, Mic, ScrollText, User, Plus } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="page-container">
      {/* Top Navigation */}
      <header className="glass-card" style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "1rem 2rem",
        marginBottom: "3rem"
      }}>
        <h1 className="gradient-text" style={{ fontSize: "1.75rem", margin: 0 }}>Smart Study Assistant</h1>
        
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ 
              background: "rgba(6, 182, 212, 0.2)", 
              padding: "0.5rem", 
              borderRadius: "50%" 
            }}>
              <User size={20} color="var(--accent-cyan)" />
            </div>
            <span style={{ fontWeight: "500", color: "var(--text-secondary)" }}>{user?.name || 'Student'}</span>
          </div>
          
          <button onClick={handleLogout} className="btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", display: "flex", gap: "0.5rem", alignItems: "center", borderColor: "var(--accent-rose)", color: "var(--accent-rose)" }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* Welcome Banner */}
        <div className="glass-card" style={{ 
          padding: "3rem", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(6, 182, 212, 0.1))"
        }}>
          <div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Welcome back, <span className="gradient-text">{user?.name || 'Student'}</span>!</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Ready to supercharge your studying today?</p>
          </div>
          
          <button onClick={() => navigate("/upload")} className="btn-neon" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
            <Plus size={24} /> New Study Session
          </button>
        </div>

        {/* Modules Grid */}
        <h3 style={{ fontSize: "1.5rem", marginTop: "1rem", color: "var(--text-secondary)" }}>Study Modules</h3>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "1.5rem" 
        }}>
          
          <div onClick={() => navigate("/upload")} className="glass-card" style={{ padding: "2rem", cursor: "pointer" }}>
            <div style={{ background: "rgba(6, 182, 212, 0.1)", padding: "1rem", borderRadius: "1rem", display: "inline-block", marginBottom: "1rem" }}>
              <Plus size={32} color="var(--accent-cyan)" />
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Upload PDF</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Upload new study materials</p>
          </div>

          <div onClick={() => navigate("/notes")} className="glass-card" style={{ padding: "2rem", cursor: "pointer" }}>
            <div style={{ background: "rgba(139, 92, 246, 0.1)", padding: "1rem", borderRadius: "1rem", display: "inline-block", marginBottom: "1rem" }}>
              <FileText size={32} color="var(--accent-purple)" />
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>AI Notes</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Generate detailed chapter summaries</p>
          </div>

          <div onClick={() => navigate("/mcqs")} className="glass-card" style={{ padding: "2rem", cursor: "pointer" }}>
            <div style={{ background: "rgba(16, 185, 129, 0.1)", padding: "1rem", borderRadius: "1rem", display: "inline-block", marginBottom: "1rem" }}>
              <FileQuestion size={32} color="var(--accent-emerald)" />
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>MCQs</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Test your knowledge</p>
          </div>

          <div onClick={() => navigate("/flashcards")} className="glass-card" style={{ padding: "2rem", cursor: "pointer" }}>
            <div style={{ background: "rgba(244, 63, 94, 0.1)", padding: "1rem", borderRadius: "1rem", display: "inline-block", marginBottom: "1rem" }}>
              <Layers size={32} color="var(--accent-rose)" />
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Flashcards</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Quick spaced repetition</p>
          </div>

          <div onClick={() => navigate("/viva")} className="glass-card" style={{ padding: "2rem", cursor: "pointer" }}>
            <div style={{ background: "rgba(234, 179, 8, 0.1)", padding: "1rem", borderRadius: "1rem", display: "inline-block", marginBottom: "1rem" }}>
              <Mic size={32} color="#eab308" />
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Viva Questions</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Interview preparation</p>
          </div>

          <div onClick={() => navigate("/exam")} className="glass-card" style={{ padding: "2rem", cursor: "pointer" }}>
            <div style={{ background: "rgba(236, 72, 153, 0.1)", padding: "1rem", borderRadius: "1rem", display: "inline-block", marginBottom: "1rem" }}>
              <ScrollText size={32} color="#ec4899" />
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Exam Questions</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Short & long form practice</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;