import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WizardProvider } from './context/WizardContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import Step1 from './pages/wizard/Step1';
import Step2 from './pages/wizard/Step2';
import Step3 from './pages/wizard/Step3';
import Step4 from './pages/wizard/Step4';
import Results from './pages/Results';
import Compare from './pages/Compare';

function App() {
  return (
    <AuthProvider>
      <WizardProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Landing />} />

            <Route
              path="/wizard/step1"
              element={
                <ProtectedRoute>
                  <Step1 />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wizard/step2"
              element={
                <ProtectedRoute>
                  <Step2 />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wizard/step3"
              element={
                <ProtectedRoute>
                  <Step3 />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wizard/step4"
              element={
                <ProtectedRoute>
                  <Step4 />
                </ProtectedRoute>
              }
            />

            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              }
            />

            <Route
              path="/compare"
              element={
                <ProtectedRoute>
                  <Compare />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </WizardProvider>
    </AuthProvider>
  );
}

export default App;
