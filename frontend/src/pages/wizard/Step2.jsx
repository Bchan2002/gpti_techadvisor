import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useWizard } from '../../context/WizardContext';

const Step2 = () => {
  const navigate = useNavigate();
  const { wizardData, updateWizardData } = useWizard();

  const [budget, setBudget] = useState(wizardData.budget || '');

  const handleNext = () => {
    if (!budget || budget < 0) {
      alert('Por favor, ingresa un presupuesto válido.');
      return;
    }

    updateWizardData('budget', parseInt(budget));
    navigate('/wizard/step3');
  };

  const handleBack = () => {
    navigate('/wizard/step1');
  };

  const setBudgetValue = (value) => {
    setBudget(value);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-4">
          <span className="text-sm text-gray-600">Paso 2 de 4</span>
          <span className="text-sm text-gray-600 float-right">50% completado</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            ¿Cuál es tu presupuesto?
          </h2>

          <div className="mb-6">
            <label htmlFor="presupuesto-max" className="block text-lg font-semibold text-gray-700 mb-2">
              Presupuesto máximo (CLP)
            </label>
            <input
              type="number"
              id="presupuesto-max"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="$500.000"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-xl"
              step="10000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setBudgetValue(500000)}
              className="border-2 border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-blue-400 font-semibold transition"
            >
              $500.000
            </button>
            <button
              onClick={() => setBudgetValue(800000)}
              className="border-2 border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-blue-400 font-semibold transition"
            >
              $800.000
            </button>
            <button
              onClick={() => setBudgetValue(1200000)}
              className="border-2 border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-blue-400 font-semibold transition"
            >
              $1.200.000
            </button>
            <button
              onClick={() => setBudgetValue(2000000)}
              className="border-2 border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-blue-400 font-semibold transition"
            >
              $2.000.000+
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-8 max-w-lg mx-auto">
          <button
            onClick={handleBack}
            className="bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Atrás
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Siguiente
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Step2;
