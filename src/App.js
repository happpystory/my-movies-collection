import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import DetailsPage from './components/DetailsPage';


function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/*" element={<SearchPage />} />
        <Route path="/movies/:id" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
