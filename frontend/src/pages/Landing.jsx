import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Landing = () => {
  return (
    <Layout>
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">
          Encuentra tu computador ideal en minutos
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Responde unas simples preguntas sobre tus necesidades y te<br />
          recomendaremos el equipo perfecto para ti
        </p>
        <Link
          to="/wizard/step1"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Comenzar Asesoría
        </Link>

        <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Análisis Personalizado</h3>
            <p className="text-gray-600">Evaluamos tus necesidades específicas</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-green-100 text-green-600 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Recomendaciones Precisas</h3>
            <p className="text-gray-600">Equipos que se ajustan a tu presupuesto</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-purple-100 text-purple-600 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Compra Directa</h3>
            <p className="text-gray-600">Enlaces directos a SoloTodo</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
