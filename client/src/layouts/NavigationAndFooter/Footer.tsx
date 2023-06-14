import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="main-color">
      <footer className="container d-flex flex-wrap 
                justify-content-between align-items-center py-5 main-color">
        <p className="col-md-4 mb-0 text-white">© books.ksergei.tech</p>
        <ul className="nav navbar-dark col-md-4 justify-content-end">
          <li className="nav-item">
            <Link to="/home" className="nav-link px-2 text-white">
              Домой
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link px-2 text-white">
              Поиск книг
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;