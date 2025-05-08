import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import ReportForm from './pages/ReportForm';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <a href="/">Home</a>
        <a href="/map">Map</a>
        <a href="/report">Report</a>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/report" element={<ReportForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
