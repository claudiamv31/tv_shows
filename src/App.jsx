import { Route, Navigate, Routes } from 'react-router-dom';

import Header from './components/Layout/Header/Header';
import ListShows from './pages/ListShows';
import ShowDetail from './pages/ShowDetail';
import TrendingShows from './pages/TrendingShows';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/shows/trending" />} />
          <Route path="/shows/trending" element={<TrendingShows />} />
          <Route path="/shows" element={<ListShows />} />
          <Route path="/shows/:showId" element={<ShowDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
