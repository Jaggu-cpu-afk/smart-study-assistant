import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight, Wand2, FileText } from "lucide-react";

function Notes() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateNotes = async () => {
    const pdfId = localStorage.getItem("pdfId");
    if (!pdfId) {
      toast.error("No uploaded PDF found. Please upload a PDF first.");
      navigate("/upload");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(`/ai/generate-notes/${pdfId}`);
      setNotes(res.data.notes.content);
      toast.success("Notes Generated Successfully! 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Generate Notes");
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
            <div style={{ background: "rgba(139, 92, 246, 0.2)", padding: "0.75rem", borderRadius: "1rem" }}>
              <FileText size={32} color="var(--accent-purple)" />
            </div>
            <h1 className="page-title gradient-text" style={{ margin: 0 }}>AI Notes Generator</h1>
          </div>
          <p className="page-subtitle">
            Current Document: <span style={{ color: "var(--accent-purple)", fontWeight: "500" }}>{localStorage.getItem("pdfFilename") || "None"}</span>
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={handleGenerateNotes} disabled={loading} className="btn-neon purple">
            {loading ? "Generating Magic..." : "Generate Notes"}
            {!loading && <Wand2 size={20} />}
          </button>
          
          {notes && (
            <button onClick={() => navigate("/mcqs")} className="btn-neon emerald">
              Proceed to MCQs <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>

      {notes ? (
        <div className="glass-card markdown-body" style={{ padding: "3rem", marginTop: "2rem", overflowX: "auto" }}>
          <ReactMarkdown>{notes}</ReactMarkdown>
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
          <FileText size={64} style={{ opacity: 0.2 }} />
          <p style={{ fontSize: "1.2rem" }}>Click "Generate Notes" to create your study guide.</p>
        </div>
      )}
    </div>
  );
}

export default Notes;