
import React from 'react';

interface ProcessingStageProps {
  progress: number;
  message: string;
}

export const ProcessingStage: React.FC<ProcessingStageProps> = ({ progress, message }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-8 shadow-sm">
      <div className="relative w-24 h-24 mx-auto">
        {/* Animated Loader */}
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div 
          className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"
        ></div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-indigo-600">
          {Math.round(progress)}%
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Processing Document</h3>
        <p className="text-slate-500 animate-pulse">{message}</p>
        
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden max-w-md mx-auto">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 max-w-lg mx-auto">
        {[
          { label: 'Parsing', done: progress > 30 },
          { label: 'Rendering', done: progress > 70 },
          { label: 'Optimizing', done: progress >= 95 }
        ].map((step, i) => (
          <div key={i} className="flex items-center justify-center gap-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${step.done ? 'bg-green-500' : 'bg-slate-200'}`}>
              {step.done && <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={`text-xs font-medium ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
