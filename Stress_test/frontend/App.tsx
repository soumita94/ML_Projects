
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { PredictionForm } from './components/PredictionForm';
import { ResultDisplay } from './components/ResultDisplay';
import { PredictRequest, PredictResponse, PredictionState } from './types';

const App: React.FC = () => {
  const [prediction, setPrediction] = useState<PredictionState>({
    data: null,
    loading: false,
    error: null,
  });

  const handlePredict = async (formData: PredictRequest) => {
    setPrediction({ data: null, loading: true, error: null });

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction. Ensure the backend server is running.');
      }

      const data: PredictResponse = await response.json();
      
      // Simulate a small delay for better UX (so users see the loading state)
      setTimeout(() => {
        setPrediction({ data, loading: false, error: null });
      }, 600);

    } catch (err) {
      setPrediction({
        data: null,
        loading: false,
        error: err instanceof Error ? err.message : 'An unexpected error occurred.',
      });
    }
  };

  const handleReset = () => {
    setPrediction({ data: null, loading: false, error: null });
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto space-y-8 pb-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            MindGuard AI
          </h1>
          <p className="text-slate-500 text-lg">
            Predict student burnout risk using machine learning diagnostics.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden transition-all duration-500">
          {!prediction.data && !prediction.loading && !prediction.error ? (
            <PredictionForm onSubmit={handlePredict} />
          ) : (
            <div className="p-8">
              {prediction.loading && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                  <p className="text-slate-500 font-medium animate-pulse">Analyzing physiological markers...</p>
                </div>
              )}

              {prediction.error && (
                <div className="space-y-6">
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start space-x-3">
                    <svg className="w-6 h-6 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-rose-800 font-semibold">Prediction Error</h3>
                      <p className="text-rose-600 text-sm mt-1">{prediction.error}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {prediction.data && !prediction.loading && (
                <ResultDisplay 
                  result={prediction.data.predicted_category} 
                  onReset={handleReset} 
                />
              )}
            </div>
          )}
        </div>

        <footer className="text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} MindGuard Diagnostics. All rights reserved.
        </footer>
      </div>
    </Layout>
  );
};

export default App;
