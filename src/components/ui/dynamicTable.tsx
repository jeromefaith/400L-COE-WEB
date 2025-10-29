import React, { useState } from "react";

interface TableData {
  headers: string[];
  rows: string[][];
}

const DynamicTable: React.FC = () => {
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);
  const [headers, setHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Step 1: Generate table structure
  const handleSetup = () => {
    if (rows > 0 && cols > 0) {
      setHeaders(Array(cols).fill(""));
      setTableData(
        Array(rows)
          .fill(null)
          .map(() => Array(cols).fill(""))
      );
      setIsConfigured(true);
    }
  };

  // Step 2: Handle header change
  const handleHeaderChange = (index: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  // Step 3: Handle table cell change
  const handleCellChange = (rIndex: number, cIndex: number, value: string) => {
    const newData = tableData.map((row, i) =>
      i === rIndex ? row.map((cell, j) => (j === cIndex ? value : cell)) : row
    );
    setTableData(newData);
  };

  // Step 4: Save table to backend
  const handleSave = async () => {
    try {
      const tableJson: TableData = { headers, rows: tableData };

      const res = await fetch("/api/saveTable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tableJson),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save table");
      }

      setIsSaved(true);
      alert("✅ Table saved successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save table data");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h2 className='text-center text-3xl'>Set Timetable</h2>

      {/* Step 1: Setup */}
      {!isConfigured && !isSaved && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <label>
            Rows:
            <input
              type='number'
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              style={{ margin: "0 10px" }}
              min={1}
            />
          </label>
          <label>
            Columns:
            <input
              type='number'
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              style={{ margin: "0 10px" }}
              min={1}
            />
          </label>
          <button
            onClick={handleSetup}
            className='bg-light-green text-white py-2 px-4 rounded-sm ml-8'
          >
            Generate Table
          </button>
        </div>
      )}

      {/* Step 2: Editing mode */}
      {isConfigured && !isSaved && (
        <div style={{ marginTop: "30px" }}>
          <h3>Set Column Headers</h3>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            {headers.map((header, i) => (
              <input
                key={i}
                placeholder={`Header ${i + 1}`}
                value={header}
                onChange={(e) => handleHeaderChange(i, e.target.value)}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>

          <h3>Enter Table Content</h3>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    {h || `Column ${i + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rIndex) => (
                <tr key={rIndex}>
                  {row.map((cell, cIndex) => (
                    <td
                      key={cIndex}
                      style={{
                        border: "1px solid #ddd",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      <input
                        type='text'
                        value={cell}
                        onChange={(e) =>
                          handleCellChange(rIndex, cIndex, e.target.value)
                        }
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                          textAlign: "center",
                          padding: "5px",
                        }}
                        placeholder={`R${rIndex + 1}, C${cIndex + 1}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <button
              onClick={handleSave}
              style={{
                padding: "10px 20px",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Save Table
            </button>

            <button
              onClick={() => setIsConfigured(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Display Final Table */}
      {isSaved && (
        <div style={{ marginTop: "40px" }}>
          <h3 style={{ textAlign: "center" }}>✅ Final Timetable</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "2px solid #2563eb",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    style={{ padding: "10px", border: "1px solid #ddd" }}
                  >
                    {h || `Column ${i + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rIndex) => (
                <tr
                  key={rIndex}
                  style={{
                    backgroundColor: rIndex % 2 === 0 ? "#f9fafb" : "#eef2ff",
                  }}
                >
                  {row.map((cell, cIndex) => (
                    <td
                      key={cIndex}
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        border: "1px solid #ddd",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={() => {
                setIsSaved(false);
                setIsConfigured(false);
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Create New Table
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
