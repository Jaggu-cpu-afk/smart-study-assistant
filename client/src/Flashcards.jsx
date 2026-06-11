import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight, Layers, Wand2 } from "lucide-react";

function Flashcards() {
  const [flashcards, setFlashcards] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateFlashcards = async () => {
    const pdfId = localStorage.getItem("pdfId");
    if (!pdfId) {
      toast.error("No uploaded PDF found.");
      navigate("/upload");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(`/ai/generate-flashcards/${pdfId}`);
      setFlashcards(res.data.flashcards.content);
      toast.success("Flashcards Generated Successfully 🚀");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Generate Flashcards");
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
            <div style={{ background: "rgba(244, 63, 94, 0.2)", padding: "0.75rem", borderRadius: "1rem" }}>
              <Layers size={32} color="var(--accent-rose)" />
            </div>
            <h1 className="page-title gradient-text" style={{ margin: 0 }}>Flashcards Generator</h1>
          </div>
          <p className="page-subtitle">
            Current Document: <span style={{ color: "var(--accent-rose)", fontWeight: "500" }}>{localStorage.getItem("pdfFilename") || "None"}</span>
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={handleGenerateFlashcards} disabled={loading} className="btn-neon rose">
            {loading ? "Generating..." : "Generate Flashcards"}
            {!loading && <Wand2 size={20} />}
          </button>
          
          {flashcards && (
            <button onClick={() => navigate("/viva")} className="btn-neon" style={{ background: "linear-gradient(135deg, #eab308, #ca8a04)" }}>
              Proceed to Viva <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>

      {flashcards ? (
        <div className="glass-card markdown-body" style={{ padding: "3rem", marginTop: "2rem", overflowX: "auto" }}>
          <ReactMarkdown>{flashcards}</ReactMarkdown>
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
          <Layers size={64} style={{ opacity: 0.2 }} />
          <p style={{ fontSize: "1.2rem" }}>Generate your interactive study flashcards.</p>
        </div>
      )}
    </div>
  );
}

export default Flashcards;
