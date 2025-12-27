
import React from 'react';
import { ConversionQuality, ConversionOptions, FileType } from '../types';

interface SettingsPanelProps {
  options: ConversionOptions;
  setOptions: (options: ConversionOptions) => void;
  fileType: FileType;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ options, setOptions, fileType }) => {
  const updateOption = <K extends keyof ConversionOptions>(key: K, value: ConversionOptions[K]) => {
    setOptions({ ...options, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          General Quality
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {(['small', 'medium', 'large'] as ConversionQuality[]).map((q) => (
            <button
              key={q}
              onClick={() => updateOption('quality', q)}
              className={`
                p-4 rounded-xl text-left transition-all border-2
                ${options.quality === q 
                  ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-50' 
                  : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                }
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold uppercase ${options.quality === q ? 'text-indigo-600' : 'text-slate-500'}`}>
                  {q}
                </span>
                {options.quality === q && (
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                )}
              </div>
              <div className="text-sm font-semibold text-slate-900 capitalize">
                {q === 'small' ? 'Compact' : q === 'medium' ? 'Standard' : 'HD Print'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {fileType === FileType.XLSX && (
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm animate-in slide-in-from-left-2">
          <h4 className="text-sm font-bold text-green-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Excel Conversion Options
          </h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:bg-white hover:shadow-sm transition-all">
              <span className="text-sm font-medium text-slate-700">Workbook Range</span>
              <select 
                value={options.excelMode}
                onChange={(e) => updateOption('excelMode', e.target.value as any)}
                className="bg-transparent text-sm font-bold text-indigo-600 outline-none"
              >
                <option value="active">Active Sheet Only</option>
                <option value="all">Entire Workbook (All Sheets)</option>
              </select>
            </label>
          </div>
        </div>
      )}

      {fileType === FileType.PPTX && (
        <div className="bg-white border border-orange-200 rounded-2xl p-6 shadow-sm animate-in slide-in-from-left-2">
          <h4 className="text-sm font-bold text-orange-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            PPT Presentation Options
          </h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:bg-white hover:shadow-sm transition-all">
              <span className="text-sm font-medium text-slate-700">Slide Layout</span>
              <select 
                value={options.pptLayout}
                onChange={(e) => updateOption('pptLayout', e.target.value as any)}
                className="bg-transparent text-sm font-bold text-indigo-600 outline-none"
              >
                <option value="single">One Slide Per Page</option>
                <option value="handout">Handout Style (Vertical)</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
