import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Content from './components/Content';
import { Home, Ranking, User } from './pages/index';

function App() {
  return (
    <Router>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rank" element={<Ranking />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Content>
    </Router>
  );
}

export default App;
