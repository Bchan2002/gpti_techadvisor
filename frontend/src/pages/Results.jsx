import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Tooltip from '../components/Tooltip';
import { useWizard } from '../context/WizardContext';
import { useAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Results = () => {
  const navigate = useNavigate();
  const { results, wizardData } = useWizard();
  const { user } = useAuth();
  const [computersToCompare, setComputersToCompare] = useState([]);

  if (!results) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No hay resultados disponibles.</p>
          <button
            onClick={() => navigate('/wizard/step1')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Iniciar Nueva Búsqueda
          </button>
        </div>
      </Layout>
    );
  }

  const { computers, techSpecs } = results;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const toggleCompare = (computerId) => {
    setComputersToCompare(prev => {
      if (prev.includes(computerId)) {
        return prev.filter(id => id !== computerId);
      } else {
        return [...prev, computerId];
      }
    });
  };

  const handleCompare = () => {
    if (computersToCompare.length === 0) {
      alert('Debes seleccionar al menos un computador para comparar.');
      return;
    }
    navigate('/compare', { state: { computerIds: computersToCompare, computers } });
  };

  const downloadPDF = () => {
    if (!computers || computers.length === 0) {
      alert('No hay resultados para exportar.');
      return;
    }

    try {
      const doc = new jsPDF();

      // Title and Date
      doc.setFontSize(20);
      doc.text('Resumen de Recomendación - Tech Advisor', 105, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.text(new Date().toLocaleDateString('es-CL'), 105, 27, { align: 'center' });

      // User name if logged in
      if (user) {
        doc.text(`Usuario: ${user.name}`, 105, 33, { align: 'center' });
      }

      // User needs summary
      doc.setFontSize(16);
      doc.text('Tus Necesidades', 14, 45);
      doc.setFontSize(11);

      const useCaseLabels = {
        oficina: 'Oficina / Tareas básicas',
        estudio: 'Estudio / Universidad',
        diseno: 'Diseño gráfico / Edición de video',
        programacion: 'Programación',
        gaming: 'Gaming'
      };

      const performanceLabels = {
        basico: 'Básico',
        medio: 'Medio',
        alto: 'Alto'
      };

      doc.text(`- Uso Principal: ${useCaseLabels[wizardData.use] || wizardData.use}`, 14, 53);
      doc.text(`- Nivel de Rendimiento: ${performanceLabels[wizardData.performance] || wizardData.performance}`, 14, 59);
      doc.text(`- Presupuesto Máximo: ${formatPrice(wizardData.budget)}`, 14, 65);
      doc.text(`- Tipo: ${wizardData.portability === 'laptop' ? 'Laptop' : 'Desktop'}`, 14, 71);

      // Recommended computers table
      doc.setFontSize(16);
      doc.text('Equipos Recomendados', 14, 85);

      const tableHead = [['Nombre', 'Precio (CLP)', 'CPU', 'RAM', 'GPU', 'Almacenamiento']];
      const tableBody = computers.map(pc => [
        pc.name,
        formatPrice(pc.price),
        `${pc.cpu} (${pc.cpuScore})`,
        pc.ram,
        `${pc.gpu} (${pc.gpuScore})`,
        pc.storage
      ]);

      autoTable(doc, {
        startY: 90,
        head: tableHead,
        body: tableBody,
        theme: 'grid',
        headStyles: { fillColor: [13, 110, 253] }
      });

      // Store links
      const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 150;
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Enlaces de Búsqueda en Tiendas', 14, finalY + 15);
      doc.setFontSize(10);

      let currentY = finalY + 22;
      computers.forEach((pc, index) => {
        if (currentY > 260) {
          doc.addPage();
          currentY = 20;
          doc.setFontSize(14);
          doc.setTextColor(0, 0, 0);
          doc.text('Enlaces de Búsqueda en Tiendas - Continuación', 14, currentY);
          currentY += 10;
          doc.setFontSize(10);
        }

        // Computer name
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.text(`${index + 1}. ${pc.name}`, 14, currentY);
        currentY += 6;

        // Store links
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 255);
        if (pc.searchUrls?.solotodo) {
          doc.textWithLink('  • SoloTodo', 14, currentY, { url: pc.searchUrls.solotodo });
          currentY += 5;
        }
        if (pc.searchUrls?.falabella) {
          doc.textWithLink('  • Falabella', 14, currentY, { url: pc.searchUrls.falabella });
          currentY += 5;
        }
        if (pc.searchUrls?.ripley) {
          doc.textWithLink('  • Ripley', 14, currentY, { url: pc.searchUrls.ripley });
          currentY += 5;
        }
        currentY += 3; // Espacio entre computadores
      });

      doc.save('recomendaciones-tech-advisor.pdf');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('Hubo un error al generar el documento PDF.');
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* AI Reasoning */}
        {techSpecs && techSpecs.reasoning && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-blue-900 mb-2">
              Análisis de IA - Especificaciones Recomendadas
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-3">
              <div>
                <span className="text-blue-700 font-semibold">CPU Score:</span>{' '}
                <span className="text-blue-900">{techSpecs.min_cpu_score}+</span>
              </div>
              <div>
                <span className="text-blue-700 font-semibold">GPU Score:</span>{' '}
                <span className="text-blue-900">{techSpecs.min_gpu_score}+</span>
              </div>
              <div>
                <span className="text-blue-700 font-semibold">RAM:</span>{' '}
                <span className="text-blue-900">{techSpecs.min_ram_gb}GB+</span>
              </div>
            </div>
            <p className="text-blue-800 text-sm">{techSpecs.reasoning}</p>
          </div>
        )}

        {/* Results header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Computadores Recomendados ({computers.length})
            </h2>
          </div>
          <div className="space-x-3">
            <button
              onClick={downloadPDF}
              className="bg-green-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Descargar PDF
            </button>
            <button
              onClick={handleCompare}
              className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
              disabled={computersToCompare.length === 0}
            >
              Comparar Seleccionados ({computersToCompare.length})
            </button>
          </div>
        </div>

        {/* No results message */}
        {computers.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-lg text-center">
            <p className="font-semibold mb-2">
              No encontramos computadores que cumplan exactamente tus requisitos
            </p>
            <p className="text-sm">Intenta ajustar tu presupuesto o requisitos de rendimiento</p>
          </div>
        ) : (
          /* Results grid */
          <div className="grid md:grid-cols-2 gap-6">
            {computers.map((computer) => (
              <div
                key={computer.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <div className="bg-gray-100 p-4">
                  <img
                    src={computer.imageUrl}
                    alt={computer.name}
                    className="w-full h-48 object-contain"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x300/e0e0e0/555?text=Imagen+no+disponible';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{computer.name}</h3>
                  <p className="text-3xl font-bold text-purple-600 mb-4">{formatPrice(computer.price)}</p>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Procesador:</span>
                      <span className="font-semibold text-gray-800 flex items-center">
                        {computer.cpu} (Score: {computer.cpuScore})
                        <Tooltip text="<strong>CPU (Procesador):</strong> El 'cerebro' del computador. Un puntaje (score) más alto es mejor para tareas exigentes." />
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">RAM:</span>
                      <span className="font-semibold text-gray-800 flex items-center">
                        {computer.ram}
                        <Tooltip text="<strong>RAM (Memoria):</strong> Permite tener más programas abiertos al mismo tiempo (multitarea). 8GB es básico, 16GB es intermedio, 32GB+ es alto rendimiento." />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Almacenamiento:</span>
                      <span className="font-semibold text-gray-800">{computer.storage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">GPU:</span>
                      <span className="font-semibold text-gray-800 flex items-center">
                        {computer.gpu} (Score: {computer.gpuScore})
                        <Tooltip text="<strong>GPU (Tarjeta Gráfica):</strong> Crucial para juegos, diseño 3D y edición de video. Un puntaje (score) más alto es fundamental para estas tareas." />
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

                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Buscar en tiendas:</p>
                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href={computer.searchUrls?.solotodo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-blue-600 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        SoloTodo
                      </a>
                      <a
                        href={computer.searchUrls?.falabella}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-green-600 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                      >
                        Falabella
                      </a>
                      <a
                        href={computer.searchUrls?.ripley}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-purple-600 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
                      >
                        Ripley
                      </a>
                    </div>
                    <button
                      onClick={() => toggleCompare(computer.id)}
                      className={`block w-full text-center font-semibold px-4 py-3 rounded-lg transition ${
                        computersToCompare.includes(computer.id)
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {computersToCompare.includes(computer.id) ? 'Quitar de Comparador' : 'Añadir a Comparador'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New search button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/wizard/step1')}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Nueva Búsqueda
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
