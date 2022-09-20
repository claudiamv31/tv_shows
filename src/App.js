import { Route, Navigate, Routes } from 'react-router-dom';

import Header from './components/Layout/Header/Header';
import TrendingShows from './pages/TrendingShows';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/trending-shows" />} />
          <Route path="/trending-shows" element={<TrendingShows />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
