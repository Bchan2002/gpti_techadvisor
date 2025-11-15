import { useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const Home = () => {
  const [formData, setFormData] = useState({
    use: '',
    performance: '',
    budget: '',
    portability: '',
    programs: ''
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/consultations', {
        ...formData,
        budget: parseInt(formData.budget)
      });

      setResults(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar la consulta');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ¿Buscas un Computador?
          </h1>
          <p className="text-gray-600">
            Déjanos ayudarte a encontrar el equipo perfecto para ti
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  ¿Para qué lo usarás?
                </label>
                <select
                  name="use"
                  value={formData.use}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="oficina">Oficina / Tareas Básicas</option>
                  <option value="estudio">Estudio / Universidad</option>
                  <option value="programacion">Programación / Desarrollo</option>
                  <option value="diseno">Diseño Gráfico / Video</option>
                  <option value="gaming">Gaming</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Rendimiento deseado
                </label>
                <select
                  name="performance"
                  value={formData.performance}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="basico">Básico</option>
                  <option value="medio">Medio</option>
                  <option value="alto">Alto</option>
                  <option value="extremo">Extremo</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Presupuesto (CLP)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  min="100000"
                  step="10000"
                  placeholder="Ej: 800000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tipo de equipo
                </label>
                <select
                  name="portability"
                  value={formData.portability}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="laptop">Laptop (portátil)</option>
                  <option value="desktop">Desktop (escritorio)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Programas o juegos específicos (opcional)
              </label>
              <textarea
                name="programs"
                value={formData.programs}
                onChange={handleChange}
                rows="3"
                placeholder="Ej: Adobe Photoshop, AutoCAD, Fortnite..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Buscando...' : 'Buscar Computadores'}
            </button>
          </form>
        </div>

        {results && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">
                Análisis de IA - Especificaciones Recomendadas
              </h3>
              <div className="grid md:grid-cols-3 gap-4 mb-3">
                <div>
                  <span className="text-blue-700 font-semibold">CPU Score:</span>{' '}
                  <span className="text-blue-900">{results.techSpecs.min_cpu_score}+</span>
                </div>
                <div>
                  <span className="text-blue-700 font-semibold">GPU Score:</span>{' '}
                  <span className="text-blue-900">{results.techSpecs.min_gpu_score}+</span>
                </div>
                <div>
                  <span className="text-blue-700 font-semibold">RAM:</span>{' '}
                  <span className="text-blue-900">{results.techSpecs.min_ram_gb}GB+</span>
                </div>
              </div>
              <p className="text-blue-800 text-sm">{results.techSpecs.reasoning}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Computadores Recomendados ({results.computers.length})
              </h2>

              {results.computers.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-lg text-center">
                  <p className="font-semibold mb-2">No encontramos computadores que cumplan exactamente tus requisitos</p>
                  <p className="text-sm">Intenta ajustar tu presupuesto o requisitos de rendimiento</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {results.computers.map((computer) => (
                    <div
                      key={computer.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                    >
                      <div className="bg-gray-100 p-4">
                        <img
                          src={computer.imageUrl}
                          alt={computer.name}
                          className="w-full h-48 object-contain"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {computer.name}
                        </h3>
                        <p className="text-3xl font-bold text-purple-600 mb-4">
                          {formatPrice(computer.price)}
                        </p>

                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Procesador:</span>
                            <span className="font-semibold text-gray-800">
                              {computer.cpu} (Score: {computer.cpuScore})
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">RAM:</span>
                            <span className="font-semibold text-gray-800">{computer.ram}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Almacenamiento:</span>
                            <span className="font-semibold text-gray-800">{computer.storage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">GPU:</span>
                            <span className="font-semibold text-gray-800">
                              {computer.gpu} (Score: {computer.gpuScore})
                            </span>
                          </div>
                          {computer.screen && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Pantalla:</span>
                              <span className="font-semibold text-gray-800">{computer.screen}</span>
                            </div>
                          )}
                          {computer.weight && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Peso:</span>
                              <span className="font-semibold text-gray-800">{computer.weight}</span>
                            </div>
                          )}
                        </div>

                        <a
                          href={computer.solotodoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition"
                        >
                          Ver en SoloTodo
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
