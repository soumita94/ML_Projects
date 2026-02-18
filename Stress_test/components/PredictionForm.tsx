
import React, { useState } from 'react';
import { PredictRequest, AttendanceStatus } from '../types';

interface PredictionFormProps {
  onSubmit: (data: PredictRequest) => void;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PredictRequest>({
    Attendance_Status: 'Present',
    Stress_Level: 2.5,
    Anxiety_Level: 5,
    Mood_Score: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8">
      <div className="space-y-6">
        {/* Attendance Status */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 block">Attendance Status</label>
          <div className="grid grid-cols-3 gap-3">
            {(['Present', 'Late', 'Absent'] as AttendanceStatus[]).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFormData({ ...formData, Attendance_Status: status })}
                className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all ${
                  formData.Attendance_Status === status
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Stress Level */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="text-sm font-semibold text-slate-700">Stress Level</label>
            <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded text-xs">
              {formData.Stress_Level.toFixed(1)} / 5.0
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="5.0"
            step="0.1"
            value={formData.Stress_Level}
            onChange={(e) => setFormData({ ...formData, Stress_Level: parseFloat(e.target.value) })}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            <span>Calm</span>
            <span>Intense</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Anxiety Level */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-700">Anxiety Level</label>
              <span className="text-indigo-600 font-bold text-xs">{formData.Anxiety_Level}</span>
            </div>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.Anxiety_Level}
              onChange={(e) => setFormData({ ...formData, Anxiety_Level: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
            />
          </div>

          {/* Mood Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-700">Mood Score</label>
              <span className="text-indigo-600 font-bold text-xs">{formData.Mood_Score}</span>
            </div>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.Mood_Score}
              onChange={(e) => setFormData({ ...formData, Mood_Score: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all"
      >
        Predict Burnout Risk
      </button>

      <p className="text-center text-xs text-slate-400 px-4">
        Our diagnostics use multi-variate analysis to assess cognitive and emotional load.
      </p>
    </form>
  );
};
