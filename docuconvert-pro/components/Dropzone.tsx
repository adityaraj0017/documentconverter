
import React, { useState, useRef } from 'react';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndProcess(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcess(e.target.files[0]);
    }
  };

  const validateAndProcess = (file: File) => {
    const validExtensions = ['.docx', '.xlsx', '.xls', '.pptx', '.ppt'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));
    
    if (isValid) {
      onFileSelect(file);
    } else {
      alert("Invalid file format. Please upload DOCX, XLSX, or PPTX.");
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`
        relative overflow-hidden cursor-pointer
        border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-50 scale-[1.02] shadow-xl' 
          : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-slate-50'
        }
      `}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleInputChange}
        accept=".docx,.xlsx,.xls,.pptx,.ppt"
      />
      
      <div className="space-y-6">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-indigo-600">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Drag & Drop Your File</h3>
          <p className="text-slate-500">
            or click to browse your computer
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 shadow-sm">DOCX</span>
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 shadow-sm">XLSX</span>
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 shadow-sm">PPTX</span>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-50 rounded-full opacity-50 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 blur-3xl pointer-events-none"></div>
    </div>
  );
};
