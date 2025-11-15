import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorKey, setErrorKey] = useState(0);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    // IMPORTANTE: Prevenir el comportamiento por defecto PRIMERO
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log('🔐 Iniciando login...');

    // Limpiar error previo
    setError('');
    setLoading(true);

    // Ejecutar login de forma asíncrona
    (async () => {
      try {
        let result;

        if (isLoginMode) {
          console.log('📧 Intentando login con:', formData.email);
          result = await login(formData.email, formData.password);
          console.log('✅ Resultado del login:', result);
        } else {
          if (!formData.name.trim()) {
            setError('El nombre es requerido');
            setErrorKey(prev => prev + 1);
            setLoading(false);
            return;
          }
          result = await register(formData.name, formData.email, formData.password);
          console.log('✅ Resultado del registro:', result);
        }

        // Manejar el resultado
        if (result && result.success === true) {
          console.log('✨ Login exitoso, navegando...');
          // Login exitoso - navegar
          navigate('/');
        } else {
          console.log('❌ Login fallido:', result?.message);
          // Error en login/registro
          const errorMessage = result?.message || 'Credenciales incorrectas. Por favor verifica tu email y contraseña.';
          setError(errorMessage);
          setErrorKey(prev => prev + 1);
          setLoading(false);
        }
      } catch (err) {
        console.error('💥 Error en login:', err);
        setError('Error al procesar la solicitud. Por favor intenta nuevamente.');
        setErrorKey(prev => prev + 1);
        setLoading(false);
      }
    })();

    // Retornar false para prevenir cualquier acción adicional
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Tech Advisor</h1>
          <p className="text-purple-100">
            {isLoginMode ? 'Inicia sesión en tu cuenta' : 'Crea una nueva cuenta'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(true);
                setError('');
              }}
              className={`flex-1 py-2 rounded-md font-semibold transition ${
                isLoginMode
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(false);
                setError('');
              }}
              className={`flex-1 py-2 rounded-md font-semibold transition ${
                !isLoginMode
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Registrarse
            </button>
          </div>

          {error && (
            <div
              key={errorKey}
              className="mb-4 p-4 bg-red-50 border-2 border-red-500 text-red-800 rounded-lg text-sm animate-shake"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {!isLoginMode && (
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required={!isLoginMode}
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta'
              )}
            </button>
          </form>

          {/* Credenciales de demostración */}
          {isLoginMode && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-semibold mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Credenciales de prueba:
              </p>
              <p className="text-xs text-blue-700">
                <strong>Usuario Admin:</strong><br />
                Email: admin@techadvisor.cl<br />
                Contraseña: admin123
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
};

export default Login;
