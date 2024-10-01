import { Link } from 'react-router-dom';
import sample from '../assets/sample.png';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-4">
          <img src={sample} alt="Icon" className="w-32 h-32 rounded-full" />
        </div>
        <h1 className="text-2xl text-center mb-8">¡Bienvenido!</h1>
      </div>
      <div className="flex">
        <Link to="/inventario">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-6 m-3 rounded-xl shadow-lg flex items-center justify-center">
            <span>INVENTARIO</span>
          </button>
        </Link>
        <Link to="/ruta-del-botón-2">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold p-6 m-3 rounded-xl shadow-lg flex items-center justify-center px-3">
            <span>NOTIFICACIONES</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;