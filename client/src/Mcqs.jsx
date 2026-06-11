import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight, FileQuestion, Wand2 } from "lucide-react";

function Mcqs() {
  const [mcqs, setMcqs] = useState("");
  const [loading, setLoading] = useState(false);
  const [mcqCount, setMcqCount] = useState(10);
  const navigate = useNavigate();

  const handleGenerateMcqs = async () => {
    const pdfId = localStorage.getItem("pdfId");
    if (!pdfId) {
      toast.error("No uploaded PDF found. Please upload a PDF first.");
      navigate("/upload");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(`/ai/generate-mcq/${pdfId}`, { count: mcqCount });
      setMcqs(res.data.mcqs.content);
      toast.success("MCQs Generated Successfully 🚀");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Generate MCQs");
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
            <div style={{ background: "rgba(16, 185, 129, 0.2)", padding: "0.75rem", borderRadius: "1rem" }}>
              <FileQuestion size={32} color="var(--accent-emerald)" />
            </div>
            <h1 className="page-title gradient-text" style={{ margin: 0 }}>MCQs Generator</h1>
          </div>
          <p className="page-subtitle">
            Current Document: <span style={{ color: "var(--accent-emerald)", fontWeight: "500" }}>{localStorage.getItem("pdfFilename") || "None"}</span>
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          
          <select
            value={mcqCount}
            onChange={(e) => setMcqCount(Number(e.target.value))}
            className="glass-input"
            style={{ width: "auto", padding: "0.75rem 1rem" }}
          >
            <option value={5} style={{ color: "black" }}>5 MCQs</option>
            <option value={10} style={{ color: "black" }}>10 MCQs</option>
            <option value={15} style={{ color: "black" }}>15 MCQs</option>
            <option value={20} style={{ color: "black" }}>20 MCQs</option>
          </select>

          <button onClick={handleGenerateMcqs} disabled={loading} className="btn-neon emerald">
            {loading ? "Generating..." : "Generate MCQs"}
            {!loading && <Wand2 size={20} />}
          </button>
          
          {mcqs && (
            <button onClick={() => navigate("/flashcards")} className="btn-neon rose">
              Proceed to Flashcards <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>

      {mcqs ? (
        <div className="glass-card markdown-body" style={{ padding: "3rem", marginTop: "2rem", overflowX: "auto" }}>
          <ReactMarkdown>{mcqs}</ReactMarkdown>
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
          <FileQuestion size={64} style={{ opacity: 0.2 }} />
          <p style={{ fontSize: "1.2rem" }}>Select the number of questions and click "Generate MCQs".</p>
        </div>
      )}
    </div>
  );
}

export default Mcqs;
