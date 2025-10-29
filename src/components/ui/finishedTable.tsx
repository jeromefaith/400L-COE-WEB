import React, { useEffect, useState } from "react";

interface TableData {
  headers: string[];
  rows: string[][];
}

const FinishedTable: React.FC = () => {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await fetch("/api/getTable");
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch table data");
        }
        const data = await res.json();
        setTableData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTable();
  }, []);

  if (error) return <p className='text-red-500'>{error}</p>;
  if (!tableData) return <p className='text-2xl'>Loading table...</p>;

  return (
    <div className='p-6 my-10'>
      <h2 className='text-4xl font-semibold mb-4'>Timetable</h2>
      <div className='overflow-x-auto rounded-2xl shadow-lg'>
        <table className='w-full border-collapse'>
          <thead className='bg-dark-green text-white'>
            <tr>
              {tableData.headers.map((header, i) => (
                <th
                  key={i}
                  className='px-4 py-3 text-left border bg-dark-green'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className='px-4 py-2 border border-gray-300 text-gray-800'
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinishedTable;
