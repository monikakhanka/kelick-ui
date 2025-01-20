import React from "react";

const EmployeeTable = ({tableData, columns}) => {
  return (
    (
        <div className="mt-6 w-full max-w-4xl overflow-x-auto mt-100">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {columns.map((col, index) => (
                  <th key={index} className="px-4 py-2 border">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 border">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  );
};

export default EmployeeTable;
