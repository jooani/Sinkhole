import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import ReportForm from './pages/ReportForm';

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
          <a href="/">Home</a>
          <a href="/map">Map</a>
          <a href="/report">Report</a>
        </nav>

        <div
          style={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',      // 가로 중앙 정렬
            justifyContent: 'center',  // 세로 중앙 정렬
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/report" element={<ReportForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
