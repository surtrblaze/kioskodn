import NavLink from './NavLink';
import MobileNavLink from './MobileNavLink';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo o nombre de la aplicación */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-gray-900">Planify</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" label="Inicio" />
            <NavLink to="/inventario" label="Inventario" />
            <NavLink to="/carrito" label="Carrito de Compras" />
            <NavLink to="/ventas" label="Ventas" />
            <NavLink to="/perfil" label="Perfil" />
          </div>
          <div className="md:hidden">
            {/* Menú móvil */}
            <button
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink to="/" label="Inicio" />
          <MobileNavLink to="/inventario" label="Inventario" />
          <MobileNavLink to="/carrito" label="Carrito de Compras" />
          <MobileNavLink to="/ventas" label="Ventas" />
          <MobileNavLink to="/perfil" label="Perfil" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
