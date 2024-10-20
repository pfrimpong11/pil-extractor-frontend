import React, { useState } from "react";
import axios, {AxiosError} from "axios";
import jsPDF from "jspdf";
import { Upload, FileText, Download, Pill, AlertTriangle, ShieldAlert, Package, Calendar, Target, Droplet, CheckCircle, Shuffle, CheckSquare, Loader2 } from "lucide-react";
import Background from '../assets/images/background.jpg';
import '../styles/HomePage.css';

interface ErrorResponse {
  error: string;
}

interface DrugInfo {
  DrugName: string;
  IntendedUse: string[];
  Dosage: string;
  SideEffects: string[];
  Precautions: string[];
  Interactions: string[];
  Storage: string;
  ExpirationDate: string;
}

const HomePage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) {
      setError("Please select a file to upload.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Parse the JSON response
      if (response.data && response.data.trim() !== "") {
        const parsedData: DrugInfo = JSON.parse(response.data);
        setDrugInfo(parsedData);
        setError(null);
      } else {
        console.log(response.data);
        setError("An error occurred. Please try again.");
        setDrugInfo(null);  // Optional: clear the current drug info if needed
      }

    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Unknown error occurred";
        console.log(errorMessage);
      setError("Error uploading file. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    if (!drugInfo) return;

    setIsDownloading(true);

    try {
      const doc = new jsPDF();
      
      // Set up some constants for layout
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      
      // Helper function to add a new page
      const addPage = () => {
        doc.addPage();
        doc.setFillColor(240, 240, 240);
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.setTextColor(60, 60, 60);
        doc.setFontSize(10);
        doc.text('PharmaScan Drug Information Report', pageWidth / 2, 25, { align: 'center' });
        return 50;  // Start y position for content
      };

      // Function to check and add a new page if needed
      const checkNewPage = (y: number, height: number): number => {
        if (y + height > pageHeight - margin) {
          return addPage();
        }
        return y;
      };

      // Add a header to the first page
      doc.setFillColor(40, 116, 166);  // A nice blue color
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text('PharmaScan', pageWidth / 2, 25, { align: 'center' });
      doc.setFontSize(14);
      doc.text('Drug Information Report', pageWidth / 2, 35, { align: 'center' });

      let y = 50;

      // Function to write a section
      const writeSection = (title: string, content: string | string[]) => {
        y = checkNewPage(y, 30);
        
        doc.setFillColor(230, 230, 230);
        doc.rect(margin, y, contentWidth, 10, 'F');
        doc.setTextColor(40, 40, 40);
        doc.setFontSize(12);
        doc.text(title, margin + 5, y + 7);
        y += 15;

        doc.setTextColor(60, 60, 60);
        doc.setFontSize(10);
        if (Array.isArray(content)) {
          content.forEach(item => {
            y = checkNewPage(y, 7);
            doc.text('• ' + item, margin + 5, y);
            y += 7;
          });
        } else {
          const lines = doc.splitTextToSize(content, contentWidth - 10);
          y = checkNewPage(y, lines.length * 7);
          doc.text(lines, margin + 5, y);
          y += lines.length * 7;
        }
        y += 10;  // Add some space after each section
      };

      // Write each section of the drug info
      Object.entries(drugInfo).forEach(([key, value]) => {
        writeSection(key, value as string | string[]);
      });

      // Add a footer
      const footerText = 'Generated by PharmaScan on ' + new Date().toLocaleDateString();
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });

      doc.save("drug_information_report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError("Error generating PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #ebeef0, #dadee0)",
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "2rem",
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      // height: '100vh',
      // display: 'flex',
      padding: '3rem',
      borderRadius: '0.5rem',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
    },
    heroOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '0.5rem',
    },
    heroContent: {
      position: 'relative' as const,
      zIndex: 1,
    },
    title: {
      fontSize: "2.5rem",
      color: "#fff",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "1.25rem",
      color: "#b4b8b8",
    },
    content: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    card: {
      background: "#FFFFFF",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "1.5rem",
    },
    cardTitle: {
      fontSize: "1.5rem",
      color: "#000",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      marginRight: "0.5rem",
    },
    uploadArea: {
      border: "2px dashed #63B3ED",
      borderRadius: "0.5rem",
      padding: "2rem",
      textAlign: "center" as const,
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    uploadText: {
      color: "#000",
      marginTop: "1rem",
    },
    previewContainer: {
      marginTop: "1rem",
      width: "100%",
      height: "200px",
      border: "1px solid #E2E8F0",
      borderRadius: "0.5rem",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F7FAFC",
    },
    previewImage: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain" as const,
    },
    fileName: {
      marginTop: "0.5rem",
      color: "#000",
    },
    button: {
      backgroundColor: "#000",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "0.25rem",
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginTop: "1rem",
    },
    scrollArea: {
      maxHeight: "400px",
      overflowY: "auto" as const,
      padding: "0.5rem",
    },
    infoItem: {
      marginBottom: "1rem",
    },
    infoTitle: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#2C5282",
      display: "flex",
      alignItems: "center",
    },
    infoContent: {
      marginTop: "0.5rem",
      color: "#000",
    },
    list: {
      listStyleType: "none",
      paddingLeft: "0",
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "0.5rem",
    },
    listItemIcon: {
      marginRight: "0.5rem",
      marginLeft: "1.5rem",
      color: "#4299E1",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
      <div style={styles.heroOverlay}></div>
      <div style={styles.heroContent}>
        <h1 style={styles.title}>PharmaScan</h1>
        <p style={styles.subtitle}>
          Upload your PIL and extract key drug information
        </p>
      </div>
      </header>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <Upload style={styles.icon} size={24} />
            Upload a PIL
          </h2>
          <div
            style={styles.uploadArea}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#EBF8FF")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <input
              type="file"
              accept=".pdf, .png, .jpg, .jpeg"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <FileText size={48} color="#3182CE" />
              <p style={styles.uploadText}>
                Click to upload or drag and drop
                <br />
                <small>PDF, PNG, JPG, JPEG</small>
              </p>
            </label>
          </div>

          {previewUrl && (
            <div style={styles.previewContainer}>
              {uploadedFile?.type.startsWith("image") ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={styles.previewImage}
                />
              ) : (
                <FileText size={64} color="#3182CE" />
              )}
            </div>
          )}

          {uploadedFile && <p style={styles.fileName}>{uploadedFile.name}</p>}

          {/* Display the error message if it exists */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={handleSubmit} style={styles.button} disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 size={18} className="spinner" style={{ marginRight: "0.5rem" }} />
            ) : (
              <Upload size={18} style={{ marginRight: "0.5rem" }} />
            )}
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <Pill style={styles.icon} size={24} />
            PIL Information
          </h2>
          <div style={styles.scrollArea}>
            {drugInfo && Object.entries(drugInfo).map(([key, value]) => (
              <div key={key} style={styles.infoItem}>
                <h3 style={styles.infoTitle}>
                  {key === "DrugName" && (
                    <Pill
                      size={18}
                      style={{ ...styles.icon, color: "#3182CE" }}
                    />
                  )}
                  {key === "IntendedUse" && (
                    <Target
                      size={18}
                      style={{ ...styles.icon, color: "#38A169" }}
                    />
                  )}
                  {key === "Dosage" && (
                    <Droplet
                      size={18}
                      style={{ ...styles.icon, color: "#805AD5" }}
                    />
                  )}
                  {key === "SideEffects" && (
                    <AlertTriangle
                      size={18}
                      style={{ ...styles.icon, color: "#D69E2E" }}
                    />
                  )}
                  {key === "Precautions" && (
                    <ShieldAlert
                      size={18}
                      style={{ ...styles.icon, color: "#E53E3E" }}
                    />
                  )}
                  {key === "Interactions" && (
                    <Shuffle
                      size={18}
                      style={{ ...styles.icon, color: "#DD6B20" }}
                    />
                  )}
                  {key === "Storage" && (
                    <Package
                      size={18}
                      style={{ ...styles.icon, color: "#4C51BF" }}
                    />
                  )}
                  {key === "ExpirationDate" && (
                    <Calendar
                      size={18}
                      style={{ ...styles.icon, color: "#D53F8C" }}
                    />
                  )}
                  {key}:
                </h3>
                {Array.isArray(value) ? (
                  <ul style={styles.list}>
                    {value.map((item, index) => (
                      <li key={index} style={styles.listItem}>
                        <CheckCircle size={14} style={styles.listItemIcon} />
                        <span style={styles.infoContent}>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ ...styles.infoContent, ...styles.listItem }}>
                    <CheckSquare size={14} style={styles.listItemIcon} />
                    <span>{value}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
          <button onClick={handleDownload} style={styles.button} disabled={isDownloading || !drugInfo}>
            {isDownloading ? (
              <Loader2 size={18} className="spinner" style={{ marginRight: "0.5rem" }} />
            ) : (
              <Download size={18} style={{ marginRight: "0.5rem" }} />
            )}
            {isDownloading ? "Generating PDF..." : "Download Results as PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
