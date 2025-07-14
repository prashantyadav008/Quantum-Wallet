import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import FilesPage from './pages/FilesPage';
import VSCodePage from './pages/VSCodePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/vscode" element={<VSCodePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;