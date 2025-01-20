import React, { useState, useRef } from "react";
import { BsPerson, BsUpload } from "react-icons/bs";
import { GoX, GoDownload, GoPersonAdd } from "react-icons/go";
import EmployeeTable from "./EmployeeTable";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const Employees = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  const fileInput = useRef();

  const openPopUp = () => {
    //setSelectedFile("");
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setTableData([]);
    setColumns([]);
    setSelectedFile("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();
      const reader = new FileReader();

      if (fileType === "xlsx") {
        setSelectedFile(file);
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          setTableData(jsonData);
          setColumns(Object.keys(jsonData[0]));
          setShowLoader(false);
        };
        reader.readAsArrayBuffer(file);
      } else if (fileType === "csv") {
        setSelectedFile(file);
        reader.onload = (e) => {
          const csvData = Papa.parse(e.target.result, { header: true });
          setTableData(csvData.data);
          setColumns(Object.keys(csvData.data[0]));
          setShowLoader(false);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleContinue = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 500);
    setIsPopUpOpen(false);
  };

  return (
    <div>
      <div className="w-[100%] text-2xl font-semibold px-8 py-8 mt-0 bg-pink-50 content-center flex justify-between">
        Employees
        <button className="bg-teal-500 w-auto px-2 h-10 text-lg flex items-center border border-teal-600 shadow-sm rounded-lg text-white ">
          <GoPersonAdd className="m-1" />
          Add employee
        </button>
      </div>
      {!showLoader ? (
        <div className={isPopUpOpen && "blur"}>
          <div className="w-[95%] h-[100%] my-[3.5%] mx-8 flex justify-center rounded-2xl border border-gray-500">
            <div>
              <div className="w-[80%] h-[55%] flex justify-center">
                <img
                  src="https://s3-alpha-sig.figma.com/img/4c66/8749/aa0e15279d2fc3e50cd0fe1ed81c0636?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VgOQCS2cuX1Rn9twSpTSZsKoM46fKCVlFeEemyizC6XFEw6N9pnqf5Gf9h03NsOtEIhcEydn841T5jjnSzaIFTzLH9SNv09kwufhELPiJRtKveCp~qzOsXUAU~NueWR5l8r8XfQ7daTPtwcKdQZmXAHyY4PkJrj9MKUzdqgrl5p2uhy8vn32qRY9rWfYMe3KuzNQZJ0VRwpV0nrS2UI~zkCtBO1KTzW8snHg3uIVMroaksny1xF2mZHDU9W5GqC3eDtwYIiuJDLJ95AzpQaWg0AuAgLg5tttdkjT~XVWv8eXrkLuk~koR8W9QErGiRHgr0RyfZyoDBV3aWcJ7G6D~w__"
                  alt=""
                />
              </div>
              <div className="flex flex-col items-center">
                <p>Start building your team</p>
                <p>Add your first team member or import your entire team</p>
              </div>
              <div className="flex justify-center space-x-4 mt-5">
                <button
                  className="bg-gray-100 p-1 rounded-md flex border border-gray-500"
                  onClick={openPopUp}>
                  <BsUpload className="m-1" />
                  Bulk Upload
                </button>
                <button className="bg-green-300 p-1 rounded-md flex border border-gray-500">
                  <BsPerson className="m-1" />
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[100%]">
          <div className="border-t-4 border-green-600 border-solid rounded-full h-16 w-16 animate-spin"></div>
        </div>
      )}

      {isPopUpOpen && (
        <div className="w-[40%] h-[80%] bg-white -m-[520px] ml-[270px] absolute rounded-2xl shadow-lg">
          <div className="flex justify-between mx-5 my-2">
            <p className="font-bold text-xl">Upload File</p>
            <GoX className="w-10 h-6" onClick={closePopUp} />
          </div>
          <div className="mx-5 h-[252px] bg-white rounded-lg border-2 border-dashed border-green-400 ">
            <img
              src="https://s3-alpha-sig.figma.com/img/e22e/7d54/305b6ea4daafa3ae207b799615f86959?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k66hnG2TD001TkdhbQy2dG5lYVrIY03aUpWVlVxZm8Gi0u1q9aAqySxH9tkcyelKtU0qBXjTmt17rCZfESGJcllypWtMRtVFVr0gAwQAElgWjJgSZCajNM-~muUZ9f7uFvW3umzWfyFAJeukzJtr7CWTRKW8FTMExbMotIuRffq3rqG6DsankWRlRbBSvTbFMwNlA~sRBXf5KcN5jq6G~nalIhYArV89Glr-zn~DJk24FCNPpEfQAjWx6Ngl5~y5uE8ALfn4vsfWM5ZoY6IN0jQL1uwQOfm2sOaMzC9ExA5pyPlHeCK8vNqUSo1lhY4NhAMOQOzQatRk6UHL4rDOVw__"
              alt="uploadPic"
              className="w-20 h-20 m-auto mt-16 mb-3"
            />
            <div className="flex flex-col items-center">
              <span className="text-gray-600">
                Drag and drop your files here
              </span>
              <p
                className="font-semibold underline text-gray-600 cursor-pointer"
                onClick={handleClick}>
                click to upload
              </p>
              {selectedFile && (
                <p className="text-green-600 text-sm">
                  Selected File: {selectedFile.name}
                </p>
              )}

              <input
                ref={fileInput}
                type="file"
                className="hidden"
                accept=".xlsx, .csv"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex justify-between mx-5 text-sm text-gray-500">
            <p>Supported formats: XLS, CSV</p>
            <p>Maximum file size: 25MB </p>
          </div>

          <div className="flex justify-between px-2 bg-gray-200 items-center rounded-md m-5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png"
              alt="excelLogo"
              className="w-[43px] h-[40px]"
            />
            <div className="w-3/5 py-2">
              <p className="font-bold text-sm">Table Example</p>
              <p className="text-sm text-gray-600">
                You can download the example and use them as a starting point
                for your own file.
              </p>
            </div>
            <button className="flex  w-36 h-10 items-center bg-gray-50 border border-1 border-gray-500 rounded-md text-sm">
              <GoDownload className="m-1" />
              Download XLSX
            </button>
          </div>
          <div className="flex justify-end mx-5 space-x-3">
            <button
              className="bg-gray-50 px-3 py-1 border shadow-sm border-gray-500 rounded-lg"
              onClick={closePopUp}>
              Cancel
            </button>
            <button
              className="bg-teal-500 border border-teal-600 shadow-sm px-3 rounded-lg text-white"
              onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      )}

      {tableData.length > 0 && (
        <EmployeeTable tableData={tableData} columns={columns} />
      )}
    </div>
  );
};

export default Employees;
