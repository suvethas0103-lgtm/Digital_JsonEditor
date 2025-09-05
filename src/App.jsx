import React, { useEffect, useRef, useState } from "react";
import JsonEditor from "react-json-editor-ui";
 
const App = () => {
  const [editObject, setEditObject] = useState({
    company: {
      name: "Tech Innovations Inc.",
      founded: 2010,
      employees: [
        {
          id: 1,
          name: "John Doe",
          position: "CEO",
          contact: {
            email: "john.doe@techinnovations.com",
            phone: "+1-555-0100",
          },
          skills: ["leadership", "strategic planning", "public speaking"],
          projects: [
            {
              name: "Project Phoenix",
              deadline: "2026-12-31",
              budget: 1500000,
              team: [
                { id: 3, name: "Alice Smith", role: "Lead Developer" },
                { id: 4, name: "Bob Johnson", role: "QA Engineer" },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "Jane Williams",
          position: "CTO",
          contact: {
            email: "jane.williams@techinnovations.com",
            phone: "+1-555-0101",
          },
          skills: ["software architecture", "cloud computing", "cybersecurity"],
          projects: [],
        },
      ],
      offices: [
        {
          location: "New York",
          address: {
            street: "100 Main St",
            city: "New York",
            state: "NY",
            zip: "10001",
          },
          capacity: 200,
        },
        {
          location: "San Francisco",
          address: {
            street: "200 Market St",
            city: "San Francisco",
            state: "CA",
            zip: "94105",
          },
          capacity: 150,
        },
      ],
      financials: {
        year: 2024,
        revenue: 25000000,
        expenses: {
          "r&d": 5000000,
          marketing: 3000000,
          operations: 7000000,
        },
        netIncome: 10000000,
      },
      products: [
        {
          id: "p1",
          name: "InnovateX Platform",
          category: "Software",
          versions: [
            {
              version: "1.0",
              releaseDate: "2020-05-01",
              features: [
                "User management",
                "API integrations",
                "Reporting dashboard",
              ],
            },
            {
              version: "2.0",
              releaseDate: "2022-11-15",
              features: [
                "AI-powered analytics",
                "Mobile app support",
                "Enhanced security",
              ],
            },
          ],
        },
        {
          id: "p2",
          name: "SecureNet",
          category: "Cybersecurity",
          versions: [
            {
              version: "3.2",
              releaseDate: "2023-07-22",
              features: [
                "Real-time threat detection",
                "VPN support",
                "Multi-factor authentication",
              ],
            },
          ],
        },
      ],
    },
  });
 
  const [editorKey, setEditorKey] = useState(0);
  const jsonBridgeRef = useRef(null);
 
  const [textareaValue, setTextareaValue] = useState(
    JSON.stringify(editObject, null, 2)
  );
  const [error, setError] = useState(null);
 
  // Toast state and styles
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
 
  const toastStyles = {
    position: "fixed",
    top: 20,
    left: "50%",
    transform: showToast
      ? "translateX(-50%) translateY(0)"
      : "translateX(-50%) translateY(-20px)",
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(52, 152, 219, 0.7)",
    opacity: showToast ? 1 : 0,
    transition: "all 0.4s ease-in-out",
    pointerEvents: "none",
    zIndex: 9999,
  };
 
  useEffect(() => {
    setTextareaValue(JSON.stringify(editObject, null, 2));
    setError(null);
  }, [editObject]);
 
  const onTextareaChange = (e) => {
    const val = e.target.value;
    setTextareaValue(val);
 
    try {
      const parsed = JSON.parse(val);
      setEditObject(parsed);
      setError(null);
    } catch {
      setError("Invalid JSON format");
    }
  };
 
  useEffect(() => {
    window.getJsonFromReact = () => editObject;
 
    window.setJsonFromOutside = (data) => {
      try {
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        setEditObject(data);
        setEditorKey((prev) => prev + 1);
        console.log("✅ JSON updated from outside:", data);
      } catch (e) {
        console.error("❌ Invalid JSON passed to setJsonFromOutside", e);
      }
    };
  }, [editObject]);
 
  const onCopyClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(JSON.stringify(editObject, null, 2))
        .then(() => {
          setToastMessage("JSON copied to clipboard!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        });
    } else {
      setToastMessage("Clipboard API not supported");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };
 
  const applyTextareaJson = () => {
    try {
      const parsed = JSON.parse(textareaValue);
      window.setJsonFromOutside(parsed);
    } catch {
      setError("Invalid JSON format");
    }
  };
 
  // Styles
  const styles = {
    container: {
      maxWidth: 900,
      margin: "40px auto",
      padding: 24,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#2c3e50",
      backgroundColor: "#f9fafb",
      borderRadius: 12,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      position: "relative",
      minHeight: "100vh",
    },
    label: {
      fontWeight: "700",
      fontSize: 20,
      marginBottom: 12,
      color: "#34495e",
      display: "block",
    },
    textarea: {
      flex: 1,
      minWidth: 300,
      height: 340,
      fontFamily: "monospace",
      fontSize: 15,
      borderRadius: 8,
      border: error ? "2px solid #e74c3c" : "2px solid #d1d5db",
      padding: 18,
      boxSizing: "border-box",
      backgroundColor: error ? "#fef2f2" : "#fff",
      boxShadow: error
        ? "0 0 12px rgba(231, 76, 60, 0.4)"
        : "0 2px 6px rgba(0,0,0,0.1)",
      resize: "vertical",
      outline: "none",
      transition: "all 0.3s ease",
      color: "#2c3e50",
    },
    errorBox: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "#e74c3c",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 24,
    },
    button: {
      width: "100%",
      padding: "14px 28px",
      fontSize: 16,
      fontWeight: "600",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(52, 152, 219, 0.3)",
      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      marginBottom: 20,
      color: "#fff",
      backgroundColor: "#3498db",
      userSelect: "none",
    },
    buttonDisabled: {
      backgroundColor: "#a0aec0",
      boxShadow: "none",
      cursor: "not-allowed",
      color: "#f0f4f8",
    },
    buttonsWrapper: {
      minWidth: 140,
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: 12,
    },
    inputSection: {
      display: "flex",
      alignItems: "flex-start",
      gap: 20,
      flexWrap: "wrap",
    },
    header2: {
      fontWeight: "700",
      fontSize: 24,
      color: "#34495e",
      marginBottom: 24,
      borderBottom: "2px solid #e2e8f0",
      paddingBottom: 8,
    },
  };
 
  return (
    <div style={styles.container}>
      {showToast && <div style={toastStyles}>{toastMessage}</div>}
      <div style={{ marginBottom: 48 }}>
        <label htmlFor="json-bridge" style={styles.label}>
          JSON Input
        </label>
 
        <div style={styles.inputSection}>
          <textarea
            id="json-bridge"
            ref={jsonBridgeRef}
            value={textareaValue}
            onChange={onTextareaChange}
            placeholder="Enter JSON here"
            spellCheck={false}
            style={styles.textarea}
          />
 
          <div style={styles.buttonsWrapper}>
            {error && (
              <div style={styles.errorBox} role="alert" aria-live="assertive">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
 
            <button
              onClick={applyTextareaJson}
              disabled={!!error}
              title={
                error ? "Fix JSON errors before converting" : "Convert to JSON"
              }
              style={{
                ...styles.button,
                ...(error ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (!error) e.currentTarget.style.backgroundColor = "#2b81c2";
              }}
              onMouseLeave={(e) => {
                if (!error) e.currentTarget.style.backgroundColor = "#3498db";
              }}
            >
              Convert to JSON
            </button>
 
            <button
              onClick={onCopyClick}
              disabled={!!error}
              title={error ? "Fix JSON errors before copying" : "Copy JSON"}
              style={{
                ...styles.button,
                ...(error ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (!error) e.currentTarget.style.backgroundColor = "#2b81c2";
              }}
              onMouseLeave={(e) => {
                if (!error) e.currentTarget.style.backgroundColor = "#3498db";
              }}
            >
              Copy JSON
            </button>
          </div>
        </div>
      </div>
 
      <h2 style={styles.header2}>JSON Editor</h2>
 
      <JsonEditor
        key={editorKey}
        data={editObject}
        onChange={setEditObject}
        optionsMap={{
          color: [
            { value: "red", label: "Red" },
            { value: "blue", label: "Blue" },
          ],
          city: [
            { value: "beijing", label: "Beijing" },
            { value: "shanghai", label: "Shanghai" },
          ],
        }}
        style={{
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          borderRadius: 12,
          padding: 24,
          backgroundColor: "#fff",
          maxHeight: 600,
          overflowY: "auto",
        }}
      />
      {/* Toast message */}
    </div>
  );
};
 
export default App;