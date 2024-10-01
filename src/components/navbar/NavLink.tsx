import { Link } from 'react-router-dom';

interface NavLinkProps {
    to: string;
    label: string;
  }
  
  const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
    return (
      <Link to={to} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">
        {label}
      </Link>
    );
  };

  export default NavLink;