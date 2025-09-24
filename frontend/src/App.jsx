import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </Router>
  );
}

export default App;
