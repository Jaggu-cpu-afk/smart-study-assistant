import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { ArrowLeft, ScrollText, Wand2 } from "lucide-react";

function Exam() {
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateExam = async () => {
    const pdfId = localStorage.getItem("pdfId");
    if (!pdfId) {
      toast.error("No uploaded PDF found.");
      navigate("/upload");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(`/ai/generate-exam/${pdfId}`);
      setExam(res.data.exam.content);
      toast.success("Exam Questions Generated Successfully 🚀");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Generate Exam");
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
            <div style={{ background: "rgba(236, 72, 153, 0.2)", padding: "0.75rem", borderRadius: "1rem" }}>
              <ScrollText size={32} color="#ec4899" />
            </div>
            <h1 className="page-title gradient-text" style={{ margin: 0 }}>Exam Questions</h1>
          </div>
          <p className="page-subtitle">
            Current Document: <span style={{ color: "#ec4899", fontWeight: "500" }}>{localStorage.getItem("pdfFilename") || "None"}</span>
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={handleGenerateExam} disabled={loading} className="btn-neon" style={{ background: "linear-gradient(135deg, #ec4899, #be185d)" }}>
            {loading ? "Generating..." : "Generate Exam"}
            {!loading && <Wand2 size={20} />}
          </button>
        </div>
      </div>

      {exam ? (
        <div className="glass-card markdown-body" style={{ padding: "3rem", marginTop: "2rem", overflowX: "auto" }}>
          <ReactMarkdown>{exam}</ReactMarkdown>
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
          <ScrollText size={64} style={{ opacity: 0.2 }} />
          <p style={{ fontSize: "1.2rem" }}>Generate comprehensive exam questions to test your mastery.</p>
        </div>
      )}
    </div>
  );
}

export default Exam;
