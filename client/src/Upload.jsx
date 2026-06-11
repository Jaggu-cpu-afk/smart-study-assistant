import { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileType, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file first");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setLoading(true);
      const res = await API.post("/pdf/upload", formData);
      toast.success("PDF Uploaded Successfully! 🎉");
      localStorage.setItem("pdfId", res.data.pdf._id);
      localStorage.setItem("pdfFilename", res.data.pdf.filename);
      navigate("/notes");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="page-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <button onClick={() => navigate("/dashboard")} className="btn-outline" style={{ marginBottom: "2rem", padding: "0.5rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="page-header" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
          <h1 className="page-title gradient-text">Upload Study Material</h1>
          <p className="page-subtitle">Upload your PDF textbook or notes to generate AI study aids</p>
        </div>

        <div className="glass-card" style={{ padding: "3rem" }}>
          <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{
                border: "2px dashed var(--glass-border-hover)",
                borderRadius: "1.5rem",
                padding: "4rem 2rem",
                textAlign: "center",
                background: "rgba(15, 23, 42, 0.4)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem"
              }}
              onClick={() => document.getElementById('file-upload').click()}
            >
              {file ? (
                <>
                  <div style={{ background: "rgba(16, 185, 129, 0.2)", padding: "1.5rem", borderRadius: "50%" }}>
                    <CheckCircle size={48} color="var(--accent-emerald)" />
                  </div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>{file.name}</h3>
                  <p style={{ color: "var(--text-muted)" }}>Ready to upload</p>
                </>
              ) : (
                <>
                  <div style={{ background: "rgba(6, 182, 212, 0.1)", padding: "1.5rem", borderRadius: "50%" }}>
                    <UploadCloud size={48} color="var(--accent-cyan)" />
                  </div>
                  <h3 style={{ fontSize: "1.5rem" }}>Click or drag PDF here</h3>
                  <p style={{ color: "var(--text-muted)" }}>Maximum file size: 50MB</p>
                </>
              )}
              
              <input 
                id="file-upload"
                type="file" 
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
              <button 
                type="submit" 
                className="btn-neon" 
                disabled={loading || !file}
                style={{ width: "100%", maxWidth: "300px", padding: "1rem" }}
              >
                {loading ? "Uploading & Processing..." : "Upload & Continue"}
                {!loading && <ArrowRight size={20} />}
              </button>
            </div>
          </form>
        </div>

        {localStorage.getItem("pdfFilename") && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)" }}>
              Current Active Document: <span style={{ color: "var(--accent-cyan)" }}>{localStorage.getItem("pdfFilename")}</span>
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Upload;