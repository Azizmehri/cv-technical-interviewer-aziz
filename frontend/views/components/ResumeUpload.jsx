import React, { useState, useRef } from "react";
import icon from "./upload-icon.png";
import { UploadResume } from "../../models/api_calls";
//import { useAuth } from "../../controllers/authContext";

const UploadCv = () => {
  //const {userId} = useAuth()
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const userId = "68b4ba07262cb7132e120544";

  const handleFileSelect = (file) => {
    if (file) {
      const isPdf =
        file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      const isDocx =
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.toLowerCase().endsWith(".docx");
  
      if ((isPdf || isDocx) && file.size <= 2 * 1024 * 1024) {
        setSelectedFile(file);
      } else {
        alert("Please select a valid PDF or DOCX file under 2MB");
      }
    }
  };
  

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function handleDone(){
    if (selectedFile) {
      try{
      const res = await UploadResume(selectedFile,userId);
      if (res?.status === "success") {
        console.log("File uploaded:", res.data);
        window.alert("Upload successful!");
      } else {
        console.error("Unexpected response:", res);
        window.alert("Upload failed: unexpected response");
      }
      }catch (error) {
        console.error("Upload failed:", error.response?.data || error.message);
        window.alert("Failed to upload: " + (error.response?.data?.error || error.message));
      }
      
    }
  };

  return (
    <div className="bg-white grid justify-items-center [align-items:start] w-screen">
      <div className="bg-white w-[1354px] h-[850px]">
        <div className="flex-col w-[400px] items-center gap-8 p-6 top-[211px] left-[477px] bg-white rounded-xl overflow-hidden border border-solid border-[#e6e7ea] shadow-shadow-xl flex relative">
          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <h1 className="self-stretch mt-[-1.00px] [font-family:'Sora-SemiBold',Helvetica] font-semibold text-[#181d27] text-lg leading-7 relative tracking-[0]">
                Upload Thumbnail
              </h1>

              <p className="relative self-stretch [font-family:'DM_Sans-9ptRegular',Helvetica] font-normal text-[#6c5f6c] text-sm tracking-[0] leading-5">
                Please upload file in pdf or docx format and make sure the file
                size is under 25 MB.
              </p>
            </div>
          </div>

          <div
            className={`relative self-stretch w-full h-[200px] bg-[#fdf6fe] rounded-lg overflow-hidden border border-dashed border-[#8f109b] ${isDragOver ? "bg-purple-50" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            role="button"
            tabIndex={0}
            aria-label="File upload area"
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileInputChange}
              className="hidden"
              aria-hidden="true"
            />

            <div className="absolute w-8 h-8 top-10 left-40">
              <img
                className="absolute w-8 h-[26px] top-[3px] left-0"
                alt="Upload icon"
                src={icon}
              />
            </div>

            <div className="inline-flex flex-col items-center absolute top-20 left-[46px]">
              <div className="w-fit mt-[-1.00px] [font-family:'DM_Sans-Medium',Helvetica] font-medium text-[#181d27] text-base leading-6 whitespace-nowrap relative tracking-[0]">
                {selectedFile ? selectedFile.name : "Drop file or browse"}
              </div>

              <p className="w-fit [font-family:'DM_Sans-Regular',Helvetica] font-normal text-[#6c5f6c] text-sm leading-5 whitespace-nowrap relative tracking-[0]">
                Format: .pdf, .docx &amp; Max file size: 2 MB
              </p>
            </div>

            <button
              className="all-[unset] box-border inline-flex items-start absolute top-[132px] left-[118px]"
              onClick={handleBrowseClick}
              type="button"
              aria-label="Browse files"
            >
              <div className="inline-flex px-4 py-1 flex-[0_0_auto] bg-[#8f109b] border-white items-center justify-center gap-2.5 relative rounded-lg border border-solid shadow-resup-shadow-xs">
                <div className="relative w-fit mt-[-1.00px] [font-family:'DM_Sans-SemiBold',Helvetica] font-semibold text-white text-sm tracking-[0] leading-5 whitespace-nowrap">
                  Browse Files
                </div>
              </div>
            </button>
          </div>

          <div className="items-start gap-3 self-stretch w-full flex-[0_0_auto] flex relative">
            <button
              className="all-[unset] box-border flex px-4 py-2.5 flex-1 grow bg-white border-[#e6e7ea] items-center justify-center gap-2.5 relative rounded-lg border border-solid shadow-resup-shadow-xs"
              onClick={handleCancel}
              type="button"
            >
              <div className="relative w-fit mt-[-1.00px] [font-family:'DM_Sans-SemiBold',Helvetica] font-semibold text-[#031330] text-base tracking-[0] leading-6 whitespace-nowrap">
                Cancel
              </div>
            </button>

            <button
              className="all-[unset] box-border flex items-start relative flex-1 grow"
              onClick={handleDone}
              type="button"
              disabled={!selectedFile}
            >
              <div
                className={`flex px-4 py-2.5 flex-1 grow ${selectedFile ? "bg-[#8f109b]" : "bg-gray-400"} border-white items-center justify-center gap-2.5 relative rounded-lg border border-solid shadow-resup-shadow-xs`}
              >
                <div className="relative w-fit mt-[-1.00px] [font-family:'DM_Sans-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                  Done
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UploadCv;