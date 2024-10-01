import { Link } from 'react-router-dom';

interface NavLinkProps {
    to: string;
    label: string;
  }
  
const MobileNavLink: React.FC<NavLinkProps> = ({ to, label }) => {
    return (
      <Link
        to={to}
        className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
        onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
      >
        {label}
      </Link>
    );
  };

  export default MobileNavLink;