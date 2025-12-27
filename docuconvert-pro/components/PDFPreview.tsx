
import React from 'react';

interface PDFPreviewProps {
  url: string;
  fileName: string;
  onReset: () => void;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ url, fileName, onReset }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[600px]">
        {/* Preview Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A1 1 0 0016.707 5.707l-3.414-3.414A1 1 0 0012.586 2H9z" />
            </svg>
            <span className="text-sm font-medium truncate max-w-xs">{fileName}</span>
          </div>
          <div className="flex gap-2">
            <a 
              href={url} 
              download={fileName}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 bg-slate-100 p-4 overflow-auto">
          <iframe 
            src={url} 
            className="w-full h-full border-0 rounded-lg shadow-inner bg-white"
            title="PDF Preview"
          ></iframe>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
        >
          Convert Another
        </button>
        <button 
          onClick={() => window.print()}
          className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
        >
          Print Document
        </button>
      </div>
    </div>
  );
};
