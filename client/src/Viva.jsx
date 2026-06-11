import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight, Mic, Wand2 } from "lucide-react";

function Viva() {
  const [viva, setViva] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateViva = async () => {
    const pdfId = localStorage.getItem("pdfId");
    if (!pdfId) {
      toast.error("No uploaded PDF found.");
      navigate("/upload");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(`/ai/generate-viva/${pdfId}`);
      setViva(res.data.viva.content);
      toast.success("Viva Questions Generated Successfully 🚀");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Generate Viva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <button onClick={() => navigate("/dashboard")} className="btn-outline" style={{ marginBottom: "2rem", padding: "0.5rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="page-header" style={{ borderBottom: "1px solid var(--glass-border)", paddingBottom: "2rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
            <div style={{ background: "rgba(234, 179, 8, 0.2)", padding: "0.75rem", borderRadius: "1rem" }}>
              <Mic size={32} color="#eab308" />
            </div>
            <h1 className="page-title gradient-text" style={{ margin: 0 }}>Viva Questions</h1>
          </div>
          <p className="page-subtitle">
            Current Document: <span style={{ color: "#eab308", fontWeight: "500" }}>{localStorage.getItem("pdfFilename") || "None"}</span>
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={handleGenerateViva} disabled={loading} className="btn-neon" style={{ background: "linear-gradient(135deg, #eab308, #ca8a04)" }}>
            {loading ? "Generating..." : "Generate Viva"}
            {!loading && <Wand2 size={20} />}
          </button>
          
          {viva && (
            <button onClick={() => navigate("/exam")} className="btn-neon" style={{ background: "linear-gradient(135deg, #ec4899, #be185d)" }}>
              Proceed to Exam <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>

      {viva ? (
        <div className="glass-card markdown-body" style={{ padding: "3rem", marginTop: "2rem", overflowX: "auto" }}>
          <ReactMarkdown>{viva}</ReactMarkdown>
        </div>
      ) : (
        <div style={{ 
          marginTop: "4rem", 
          textAlign: "center", 
          color: "var(--text-muted)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem"
        }}>
          <Mic size={64} style={{ opacity: 0.2 }} />
          <p style={{ fontSize: "1.2rem" }}>Prepare for your oral examination with AI.</p>
        </div>
      )}
    </div>
  );
}

export default Viva;
