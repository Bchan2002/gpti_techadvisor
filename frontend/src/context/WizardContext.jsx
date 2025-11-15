import { createContext, useContext, useState } from 'react';

const WizardContext = createContext();

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};

export const WizardProvider = ({ children }) => {
  const [wizardData, setWizardData] = useState({
    use: '',
    performance: '',
    budget: '',
    portability: '',
    programs: ''
  });

  const [results, setResults] = useState(null);

  const updateWizardData = (field, value) => {
    setWizardData(prev => ({ ...prev, [field]: value }));
  };

  const resetWizard = () => {
    setWizardData({
      use: '',
      performance: '',
      budget: '',
      portability: '',
      programs: ''
    });
    setResults(null);
  };

  const value = {
    wizardData,
    updateWizardData,
    results,
    setResults,
    resetWizard
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
};

export default WizardContext;
