import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useWizard } from '../../context/WizardContext';

const Step3 = () => {
  const navigate = useNavigate();
  const { wizardData, updateWizardData } = useWizard();

  const [portability, setPortability] = useState(wizardData.portability || '');

  const handleNext = () => {
    if (!portability) {
      alert('Por favor, selecciona una opción de portabilidad.');
      return;
    }

    updateWizardData('portability', portability);
    navigate('/wizard/step4');
  };

  const handleBack = () => {
    navigate('/wizard/step2');
  };

  const handlePortabilitySelect = (value) => {
    setPortability(value);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-4">
          <span className="text-sm text-gray-600">Paso 3 de 4</span>
          <span className="text-sm text-gray-600 float-right">75% completado</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            ¿Necesitas que sea portátil?
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div
              className={`option-card border-2 rounded-lg p-6 text-center cursor-pointer transition ${
                portability === 'laptop'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
              onClick={() => handlePortabilitySelect('laptop')}
            >
              <span className="text-6xl">💻</span>
              <h4 className="font-semibold mt-3 text-xl">Laptop</h4>
              <p className="text-gray-600">Necesito llevarlo conmigo</p>
            </div>
            <div
              className={`option-card border-2 rounded-lg p-6 text-center cursor-pointer transition ${
                portability === 'desktop'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
              onClick={() => handlePortabilitySelect('desktop')}
            >
              <span className="text-6xl">🖥️</span>
              <h4 className="font-semibold mt-3 text-xl">Desktop</h4>
              <p className="text-gray-600">Lo usaré en un lugar fijo</p>
            </div>
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

export default Step3;
