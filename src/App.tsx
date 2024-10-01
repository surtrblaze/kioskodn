import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import SalesPage from './pages/SalesPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventario" element={<ProductsPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/ventas" element={<SalesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
