
import React from 'react';
import { RiskLevel } from '../types';

interface ResultDisplayProps {
  result: RiskLevel;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const getStyles = (level: RiskLevel) => {
    switch (level) {
      case 'Low':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-100',
          text: 'text-emerald-700',
          accent: 'bg-emerald-500',
          desc: 'Keep up the good work! Your current habits are sustainable.',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      case 'Medium':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-100',
          text: 'text-amber-700',
          accent: 'bg-amber-500',
          desc: 'Caution advised. Consider taking short breaks and adjusting your schedule.',
          icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        };
      case 'High':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-100',
          text: 'text-rose-700',
          accent: 'bg-rose-500',
          desc: 'High risk of burnout. Immediate rest and professional support are recommended.',
          icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
    }
  };

  const styles = getStyles(result);

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className={`p-8 rounded-[2rem] border-2 ${styles.bg} ${styles.border} flex flex-col items-center text-center space-y-4`}>
        <div className={`w-16 h-16 ${styles.accent} rounded-full flex items-center justify-center text-white shadow-lg`}>
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={styles.icon} />
          </svg>
        </div>
        
        <div>
          <span className="text-sm font-bold uppercase tracking-widest opacity-60">Result Category</span>
          <h2 className={`text-5xl font-black ${styles.text} mt-1`}>{result}</h2>
        </div>

        <p className={`${styles.text} opacity-80 max-w-sm font-medium leading-relaxed`}>
          {styles.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={onReset}
          className="py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>New Prediction</span>
        </button>
        <button 
          onClick={() => window.print()}
          className="py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Save Report</span>
        </button>
      </div>
    </div>
  );
};
