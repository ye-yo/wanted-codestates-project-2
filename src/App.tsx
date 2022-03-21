import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { Home, Ranking, User } from './pages/index';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rank" element={<Ranking />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
