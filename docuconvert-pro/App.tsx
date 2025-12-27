
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Dropzone } from './components/Dropzone';
import { ProcessingStage } from './components/ProcessingStage';
import { PDFPreview } from './components/PDFPreview';
import { SettingsPanel } from './components/SettingsPanel';
import { convertToPDF } from './services/pdfGenerator';
import { ConversionQuality, ConversionState, ConversionOptions, FileType } from './types';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [options, setOptions] = useState<ConversionOptions>({
    quality: 'medium',
    excelMode: 'active',
    pptLayout: 'single',
    preserveImages: true
  });
  
  const [state, setState] = useState<ConversionState>({
    status: 'idle',
    progress: 0,
    message: ''
  });

  const fileType = useMemo(() => {
    if (!selectedFile) return FileType.UNKNOWN;
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    if (ext === 'docx') return FileType.DOCX;
    if (['xlsx', 'xls'].includes(ext || '')) return FileType.XLSX;
    if (['pptx', 'ppt'].includes(ext || '')) return FileType.PPTX;
    return FileType.UNKNOWN;
  }, [selectedFile]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setState({ status: 'idle', progress: 0, message: '', outputUrl: undefined });
  };

  const startConversion = async () => {
    if (!selectedFile) return;

    setState({ status: 'processing', progress: 10, message: 'Initializing conversion engine...' });

    try {
      const result = await convertToPDF(selectedFile, options, (progress, message) => {
        setState(prev => ({ ...prev, progress, message }));
      });

      setState({
        status: 'completed',
        progress: 100,
        message: 'Conversion successful!',
        outputUrl: result
      });
    } catch (error: any) {
      console.error(error);
      setState({
        status: 'error',
        progress: 0,
        message: 'Conversion failed',
        error: error.message || 'An unknown error occurred during conversion.'
      });
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setState({ status: 'idle', progress: 0, message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Transform Documents to <span className="text-indigo-600">Perfect PDFs</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Professional-grade conversion for DOCX, XLSX, and PPTX files. 
              Zero content loss, high fidelity, and instant results.
            </p>
          </div>

          {!selectedFile ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Dropzone onFileSelect={handleFileSelect} />
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              {/* File Info Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    fileType === FileType.DOCX ? 'bg-blue-50 text-blue-600' :
                    fileType === FileType.XLSX ? 'bg-green-50 text-green-600' :
                    fileType === FileType.PPTX ? 'bg-orange-50 text-orange-600' :
                    'bg-slate-50 text-slate-600'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 truncate max-w-xs">{selectedFile.name}</h3>
                    <p className="text-sm text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {fileType.toUpperCase()}</p>
                  </div>
                </div>
                {state.status === 'idle' && (
                  <button 
                    onClick={reset}
                    className="text-slate-400 hover:text-red-500 transition-colors p-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {state.status === 'idle' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <SettingsPanel 
                      options={options}
                      setOptions={setOptions}
                      fileType={fileType}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={startConversion}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 h-full min-h-[80px]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Convert Now
                    </button>
                  </div>
                </div>
              )}

              {state.status === 'processing' && (
                <ProcessingStage 
                  progress={state.progress} 
                  message={state.message} 
                />
              )}

              {state.status === 'completed' && state.outputUrl && (
                <PDFPreview 
                  url={state.outputUrl} 
                  fileName={selectedFile.name.split('.')[0] + '.pdf'}
                  onReset={reset}
                />
              )}

              {state.status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-red-900">Conversion Failed</h3>
                  <p className="text-red-700">{state.error}</p>
                  <button 
                    onClick={reset}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Try Another File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 DocuConvert Pro. High-fidelity document processing engine.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
