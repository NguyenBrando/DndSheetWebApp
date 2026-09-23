import { createContext, useContext, useState, useCallback } from 'react';

const ErrorContext = createContext(null);

/* Global Wrap-Around Error Handler*/
export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const showError = useCallback((message, duration = 5000) => {
    setError(message);
    
    setTimeout(() => {
      setError(null);
    }, duration);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <ErrorContext.Provider value={{ error, showError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}


/* Callable Error Function */
export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}


/* Error Banner Object */
export function GlobalErrorBanner() {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <div style={{
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '12px',
        height: '52px',
        marginBottom: '-54px',
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        border: '1px solid #f87171'
    }}>
      <strong>Error:</strong> {error}
      <button 
        onClick={clearError} 
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#991b1b' }}
      >
        ✕
      </button>
    </div>
  );
}