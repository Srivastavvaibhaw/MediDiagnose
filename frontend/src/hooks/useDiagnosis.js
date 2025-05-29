// src/hooks/useDiagnosis.js
import { useState, useCallback } from 'react';

export function useDiagnosis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  
  // Load diagnosis history from localStorage on initialization
  useState(() => {
    try {
      const storedHistory = localStorage.getItem('medidiagnose_history');
      if (storedHistory) {
        setDiagnosisHistory(JSON.parse(storedHistory));
      }
    } catch (err) {
      console.error("Failed to load diagnosis history:", err);
    }
  }, []);
  
  // Submit diagnosis request
  const submitDiagnosis = useCallback(async (imageFile, symptoms) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would upload the image and send symptoms to your backend
      // Simulating API call with timeout
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock diagnosis result
          const result = generateMockDiagnosisResult(symptoms);
          
          // Save result to state
          setDiagnosisResult(result);
          
          // Add to history
          const diagnosisEntry = {
            id: Math.random().toString(36).substring(2, 15),
            timestamp: new Date().toISOString(),
            symptoms,
            hasImage: !!imageFile,
            result
          };
          
          const updatedHistory = [diagnosisEntry, ...diagnosisHistory].slice(0, 10); // Keep only last 10 diagnoses
          setDiagnosisHistory(updatedHistory);
          
          // Save to localStorage
          localStorage.setItem('medidiagnose_history', JSON.stringify(updatedHistory));
          
          setLoading(false);
          resolve(result);
        }, 2000);
      });
    } catch (err) {
      setError(err.message || 'An error occurred during diagnosis');
      setLoading(false);
      throw err;
    }
  }, [diagnosisHistory]);
  
  // Clear current diagnosis result
  const clearDiagnosis = useCallback(() => {
    setDiagnosisResult(null);
  }, []);
  
  // Clear diagnosis history
  const clearHistory = useCallback(() => {
    setDiagnosisHistory([]);
    localStorage.removeItem('medidiagnose_history');
  }, []);
  
  // Get a specific diagnosis from history by ID
  const getDiagnosisById = useCallback((id) => {
    return diagnosisHistory.find(diagnosis => diagnosis.id === id);
  }, [diagnosisHistory]);
  
  // Mock function to generate diagnosis results based on symptoms
  const generateMockDiagnosisResult = (symptoms) => {
    const symptomText = symptoms.description ? symptoms.description.toLowerCase() : '';
    const selectedSymptoms = symptoms.selectedSymptoms || [];
    
    // Define some mock conditions and their associated symptoms
    const conditions = [
      {
        name: 'Common Cold',
        triggers: ['cough', 'sore throat', 'runny nose', 'congestion', 'sneezing'],
        treatments: ['Rest', 'Hydration', 'Over-the-counter cold medication'],
        urgency: 'low'
      },
      {
        name: 'Influenza',
        triggers: ['fever', 'body aches', 'fatigue', 'headache', 'chills'],
        treatments: ['Rest', 'Antiviral medications', 'Pain relievers'],
        urgency: 'medium'
      },
      {
        name: 'Allergic Reaction',
        triggers: ['rash', 'itching', 'hives', 'swelling', 'allergic'],
        treatments: ['Antihistamines', 'Avoid allergens', 'Topical creams'],
        urgency: 'medium'
      },
      {
        name: 'Dermatitis',
        triggers: ['skin', 'rash', 'itchy', 'irritation', 'redness', 'dry skin'],
        treatments: ['Moisturizers', 'Topical corticosteroids', 'Avoid irritants'],
        urgency: 'low'
      },
      {
        name: 'Migraine',
        triggers: ['headache', 'pain', 'nausea', 'light sensitivity', 'sound sensitivity'],
        treatments: ['Pain relievers', 'Rest in dark room', 'Hydration'],
        urgency: 'medium'
      },
      {
        name: 'Gastroenteritis',
        triggers: ['nausea', 'vomiting', 'diarrhea', 'stomach pain', 'abdominal'],
        treatments: ['Hydration', 'Rest', 'Bland diet'],
        urgency: 'medium'
      }
    ];
    
    // Calculate match scores for each condition
    const matchScores = conditions.map(condition => {
      let score = 0;
      
      // Check symptom text for matches
      condition.triggers.forEach(trigger => {
        if (symptomText.includes(trigger)) {
          score += 20; // Each text match adds 20 points
        }
      });
      
      // Check selected symptoms for matches
      selectedSymptoms.forEach(symptom => {
        const symptomLower = symptom.toLowerCase();
        condition.triggers.forEach(trigger => {
          if (symptomLower.includes(trigger) || trigger.includes(symptomLower)) {
            score += 25; // Each selected symptom match adds 25 points
          }
        });
      });
      
      // Add some randomness (up to 15 points)
      score += Math.floor(Math.random() * 15);
      
      // Cap at 100
      score = Math.min(score, 100);
      
      return {
        condition: condition.name,
        score,
        treatments: condition.treatments,
        urgency: condition.urgency
      };
    });
    
    // Sort by score (descending)
    matchScores.sort((a, b) => b.score - a.score);
    
    // Take top 3 with score > 30
    const possibleConditions = matchScores
      .filter(match => match.score > 30)
      .slice(0, 3)
      .map(match => ({
        name: match.condition,
        confidence: match.score,
        treatments: match.treatments
      }));
    
    // If no conditions match, provide a generic result
    if (possibleConditions.length === 0) {
      possibleConditions.push({
        name: 'Unspecified Condition',
        confidence: 35,
        treatments: ['Consult with a healthcare provider']
      });
    }
    
    // Generate recommendations based on top condition
    const topCondition = matchScores[0];
    const recommendations = [
      ...topCondition.treatments,
      'Monitor your symptoms for any changes',
      'Consult with a healthcare provider for a proper diagnosis'
    ];
    
    // Determine overall urgency level
    let urgencyLevel = topCondition.urgency;
    if (selectedSymptoms.some(s => s.includes('chest pain') || s.includes('difficulty breathing'))) {
      urgencyLevel = 'high';
    }
    
    return {
      possibleConditions,
      confidenceLevel: possibleConditions[0].confidence > 70 ? 'high' : possibleConditions[0].confidence > 50 ? 'medium' : 'low',
      recommendations,
      urgencyLevel
    };
  };
  
  return {
    loading,
    error,
    diagnosisResult,
    diagnosisHistory,
    submitDiagnosis,
    clearDiagnosis,
    clearHistory,
    getDiagnosisById
  };
}

export default useDiagnosis;
