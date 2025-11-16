import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Tooltip from '../components/Tooltip';

const Compare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { computerIds, computers: allComputers } = location.state || {};

  if (!computerIds || !allComputers || computerIds.length === 0) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No hay computadores seleccionados para comparar.</p>
          <button
            onClick={() => navigate('/results')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Volver a Resultados
          </button>
        </div>
      </Layout>
    );
  }

  const selectedComputers = allComputers.filter(pc => computerIds.includes(pc.id));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const specs = [
    {
      key: 'cpu',
      label: 'Procesador',
      tooltip: "<strong>CPU (Procesador):</strong> El 'cerebro' del computador. Un puntaje (score) más alto es mejor para tareas exigentes.",
      getValue: (pc) => `${pc.cpu} (Score: ${pc.cpuScore})`
    },
    {
      key: 'ram',
      label: 'Memoria RAM',
      tooltip: '<strong>RAM (Memoria):</strong> Permite tener más programas abiertos al mismo tiempo (multitarea). 8GB es básico, 16GB es intermedio, 32GB+ es alto rendimiento.',
      getValue: (pc) => pc.ram
    },
    {
      key: 'storage',
      label: 'Almacenamiento',
      tooltip: '<strong>Almacenamiento (Disco):</strong> Guarda tus archivos. Los "SSD" son mucho más rápidos que los "HDD".',
      getValue: (pc) => pc.storage
    },
    {
      key: 'gpu',
      label: 'Tarjeta Gráfica',
      tooltip: '<strong>GPU (Tarjeta Gráfica):</strong> Crucial para juegos, diseño 3D y edición de video. Un puntaje (score) más alto es fundamental para estas tareas.',
      getValue: (pc) => `${pc.gpu} (Score: ${pc.gpuScore})`
    },
    {
      key: 'screen',
      label: 'Pantalla',
      tooltip: null,
      getValue: (pc) => pc.screen || 'N/A'
    },
    {
      key: 'weight',
      label: 'Peso',
      tooltip: null,
      getValue: (pc) => pc.weight || 'N/A'
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Comparación de Computadores</h2>
          <button
            onClick={() => navigate('/results')}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            ← Volver a Resultados
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header */}
              <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <tr>
                  <th className="p-4 font-semibold text-left">Especificación</th>
                  {selectedComputers.map((pc) => (
                    <th key={pc.id} className="p-4 font-semibold text-left">
                      <div>{pc.name}</div>
                      <div className="text-yellow-300 font-bold">{formatPrice(pc.price)}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-gray-200">
                {specs.map((spec, index) => (
                  <tr key={spec.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-4 font-semibold text-gray-700">
                      {spec.label}
                      {spec.tooltip && <Tooltip text={spec.tooltip} />}
                    </td>
                    {selectedComputers.map((pc) => (
                      <td key={pc.id} className="p-4">
                        {spec.getValue(pc)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

              {/* Footer - Actions */}
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="p-4 font-semibold text-gray-700">Buscar en Tiendas</td>
                  {selectedComputers.map((pc) => (
                    <td key={pc.id} className="p-4">
                      <div className="space-y-2">
                        <a
                          href={pc.searchUrls?.solotodo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded hover:bg-blue-700 transition"
                        >
                          SoloTodo
                        </a>
                        <a
                          href={pc.searchUrls?.falabella}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded hover:bg-green-700 transition"
                        >
                          Falabella
                        </a>
                        <a
                          href={pc.searchUrls?.ripley}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center bg-purple-600 text-white text-xs font-semibold px-3 py-2 rounded hover:bg-purple-700 transition"
                        >
                          Ripley
                        </a>
                      </div>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
