import React from 'react';
import './App.css';
import MainDashboard from './components/dashboard/MainDashboard';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Monitoring Dashboard</h1>
      </header>
      <main className="app-main">
        <MainDashboard />
      </main>
    </div>
  );
};

export default App;