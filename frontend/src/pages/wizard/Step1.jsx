import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Tooltip from '../../components/Tooltip';
import { useWizard } from '../../context/WizardContext';

const Step1 = () => {
  const navigate = useNavigate();
  const { wizardData, updateWizardData } = useWizard();

  const [selectedPerformance, setSelectedPerformance] = useState(wizardData.performance || '');
  const [useCase, setUseCase] = useState(wizardData.use || '');
  const [programs, setPrograms] = useState(wizardData.programs || '');

  const handleNext = () => {
    if (!useCase || !selectedPerformance) {
      alert('Por favor, selecciona un uso principal y un nivel de rendimiento.');
      return;
    }

    updateWizardData('use', useCase);
    updateWizardData('performance', selectedPerformance);
    updateWizardData('programs', programs);

    navigate('/wizard/step2');
  };

  const handlePerformanceSelect = (value) => {
    setSelectedPerformance(value);
  };

  const tooltipText = `
    <strong>Oficina:</strong> Tareas simples (email, Word, Excel).<br>
    <strong>Estudio:</strong> Navegación, documentos, videollamadas.<br>
    <strong>Diseño:</strong> Programas como Adobe Photoshop, Illustrator, AutoCAD.<br>
    <strong>Programación:</strong> Editores de código, bases de datos, compiladores.<br>
    <strong>Gaming:</strong> Juegos modernos (AAA) o competitivos.
  `;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-4">
          <span className="text-sm text-gray-600">Paso 1 de 4</span>
          <span className="text-sm text-gray-600 float-right">25% completado</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center mb-8">
            Cuéntanos sobre tus necesidades
          </h2>

          {/* Use Case */}
          <div className="mb-6">
            <label htmlFor="uso-principal" className="block text-lg font-semibold text-gray-700 mb-2">
              ¿Cuál será el uso principal?
              <Tooltip text={tooltipText} />
            </label>
            <select
              id="uso-principal"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Selecciona una opción</option>
              <option value="oficina">Oficina / Tareas básicas</option>
              <option value="estudio">Estudio / Universidad</option>
              <option value="diseno">Diseño gráfico / Edición de video</option>
              <option value="programacion">Programación</option>
              <option value="gaming">Gaming</option>
            </select>
          </div>

          {/* Programs */}
          <div className="mb-8">
            <label htmlFor="programas" className="block text-lg font-semibold text-gray-700 mb-2">
              ¿Qué programas o aplicaciones usarás más?
            </label>
            <input
              type="text"
              id="programas"
              value={programs}
              onChange={(e) => setPrograms(e.target.value)}
              placeholder="Ej: Microsoft Office, Adobe Photoshop, AutoCAD, juegos..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Performance Level */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              ¿Qué nivel de rendimiento necesitas?
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div
                className={`option-card border-2 rounded-lg p-4 text-center cursor-pointer transition ${
                  selectedPerformance === 'basico'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-400'
                }`}
                onClick={() => handlePerformanceSelect('basico')}
              >
                <span className="text-4xl">📄</span>
                <h4 className="font-semibold mt-2">Básico</h4>
                <p className="text-sm text-gray-600">Tareas simples</p>
              </div>
              <div
                className={`option-card border-2 rounded-lg p-4 text-center cursor-pointer transition ${
                  selectedPerformance === 'medio'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-400'
                }`}
                onClick={() => handlePerformanceSelect('medio')}
              >
                <span className="text-4xl">💻</span>
                <h4 className="font-semibold mt-2">Medio</h4>
                <p className="text-sm text-gray-600">Multitarea fluida</p>
              </div>
              <div
                className={`option-card border-2 rounded-lg p-4 text-center cursor-pointer transition ${
                  selectedPerformance === 'alto'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-400'
                }`}
                onClick={() => handlePerformanceSelect('alto')}
              >
                <span className="text-4xl">🚀</span>
                <h4 className="font-semibold mt-2">Alto</h4>
                <p className="text-sm text-gray-600">Máximo rendimiento</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
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

export default Step1;
