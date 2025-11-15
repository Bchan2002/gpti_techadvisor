import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useWizard } from '../../context/WizardContext';
import api from '../../services/api';

const Step4 = () => {
  const navigate = useNavigate();
  const { wizardData, setResults } = useWizard();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigate('/wizard/step3');
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.post('/consultations', {
        use: wizardData.use,
        performance: wizardData.performance,
        budget: wizardData.budget,
        portability: wizardData.portability,
        programs: wizardData.programs
      });

      setResults(response.data.data);
      navigate('/results');
    } catch (error) {
      console.error('Error al procesar la consulta:', error);
      alert(error.response?.data?.message || 'Error al procesar la consulta');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getUseCaseLabel = (use) => {
    const labels = {
      oficina: 'Oficina / Tareas básicas',
      estudio: 'Estudio / Universidad',
      diseno: 'Diseño gráfico / Edición de video',
      programacion: 'Programación',
      gaming: 'Gaming'
    };
    return labels[use] || use;
  };

  const getPerformanceLabel = (performance) => {
    const labels = {
      basico: 'Básico',
      medio: 'Medio',
      alto: 'Alto'
    };
    return labels[performance] || performance;
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-4">
          <span className="text-sm text-gray-600">Paso 4 de 4</span>
          <span className="text-sm text-gray-600 float-right">100% completado</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Confirma tus preferencias
          </h2>

          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Uso principal:</span>
              <span className="font-medium">{getUseCaseLabel(wizardData.use)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Presupuesto:</span>
              <span className="font-medium">{formatPrice(wizardData.budget)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Tipo:</span>
              <span className="font-medium">
                {wizardData.portability === 'laptop' ? 'Laptop' : 'Desktop'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Rendimiento:</span>
              <span className="font-medium">{getPerformanceLabel(wizardData.performance)}</span>
            </div>
            {wizardData.programs && (
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Programas:</span>
                <span className="font-medium text-right">{wizardData.programs}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-8 max-w-lg mx-auto">
          <button
            onClick={handleBack}
            className="bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
            disabled={loading}
          >
            Atrás
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Buscando...' : 'Ver Recomendaciones'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Step4;
