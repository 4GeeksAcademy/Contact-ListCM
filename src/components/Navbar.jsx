import { Link } from "react-router-dom";
import { DiReact } from "react-icons/di";
import './Navbar.css'

const Navbar = () => {

  return (
    <header className=" bg-black text-white pt-3 px-10 flex items-center fixed top-0 w-full justify-between rounded-b-lg mb-10">
      <div className="flex flex-grow basis-0">
        <ul>
          <li>
            <Link to="/">
              <DiReact style={{ fontSize: '45px' }}/>
            </Link>
          </li>
        </ul>
      </div>

      <nav>
        <ul className="flex text-md ">
          <li><Link className="no-underline font-medium inline-block px-4 py-2 text-white  links" to="/">Contactos</Link></li>
          <li><Link className="no-underline font-medium inline-block px-4 py-2 text-white  links" to="/favoritos">Favoritos</Link></li>
        </ul>
      </nav>

      <nav className="flex flex-grow basis-0 justify-end">
        <ul className="flex text-md">
          <li><Link className="decoration-transparent font-medium inline-block px-4 py-2 text-white hover:text-blue-400 links" to="/micontacto">Mi contacto</Link></li>
          <li><Link className="decoration-transparent font-medium inline-block px-4 py-2 text-white links bg-blue-800 rounded-full hover:bg-blue-600 transition-all duration-100 ease-in-out" to="/add">Agregar Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
