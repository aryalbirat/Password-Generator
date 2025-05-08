import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PasswordGenerator from "./components/PasswordGenerator";
import PasswordList from "./components/PasswordList";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import ErrorBoundary from "./components/ErrorBoundary";
import authService from "./services/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      const auth = authService.isAuthenticated();
      setIsAuthenticated(auth);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
          {/* Navigation Header */}
          <header className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <h1 className="text-xl font-bold text-white">Password Manager</h1>
              {isAuthenticated && (
                <nav className="flex space-x-4">
                  <a href="/" className="text-blue-400 hover:text-blue-300">Generator</a>
                  <a href="/passwords" className="text-blue-400 hover:text-blue-300">My Passwords</a>
                  <button 
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300"
                  >
                    Logout
                  </button>
                </nav>
              )}
            </div>
          </header>
          
          {/* Main Content */}
          <main className="container mx-auto px-4 py-10 flex justify-center">
            <Routes>
              <Route 
                path="/" 
                element={
                  isAuthenticated ? (
                    <PasswordGenerator />
                  ) : (
                    <Login onSuccess={handleAuthSuccess} onSwitchToRegister={() => {}} />
                  )
                } 
              />
              <Route 
                path="/register" 
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <Register onSuccess={handleAuthSuccess} onSwitchToLogin={() => {}} />
                  )
                } 
              />
              <Route 
                path="/passwords" 
                element={
                  isAuthenticated ? (
                    <PasswordList />
                  ) : (
                    <Navigate to="/" />
                  )
                } 
              />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;