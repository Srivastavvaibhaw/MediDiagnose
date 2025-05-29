// src/context/DiagnosisContext.jsx
import React, { createContext, useContext, useState } from 'react';

const DiagnosisContext = createContext();

export function useDiagnosis() {
  return useContext(DiagnosisContext);
}

export function DiagnosisProvider({ children }) {
  const [symptoms, setSymptoms] = useState([]);
  const [diagnosisImage, setDiagnosisImage] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitDiagnosis = async (symptoms, image) => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = {
          diagnosis: 'Eczema',
          confidence: 85,
          symptoms,
          hasImage: !!image,
          date: new Date().toISOString()
        };
        
        setDiagnosisResult(result);
        setDiagnosisHistory(prev => [result, ...prev]);
        setLoading(false);
        resolve(result);
      }, 2000);
    });
  };

  const value = {
    symptoms,
    setSymptoms,
    diagnosisImage,
    setDiagnosisImage,
    diagnosisResult,
    diagnosisHistory,
    submitDiagnosis,
    loading
  };

  return (
    <DiagnosisContext.Provider value={value}>
      {children}
    </DiagnosisContext.Provider>
  );
}