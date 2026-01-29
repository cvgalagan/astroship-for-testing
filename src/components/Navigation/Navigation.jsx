import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-title">External Scripts</h1>
        <ul className="nav-links">
          <li>
            <Link
              to="/"
              className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
            >
              Главная
            </Link>
          </li>
          <li>
            <Link
              to="/forms"
              className={location.pathname === '/forms' ? 'nav-link active' : 'nav-link'}
            >
              Формы
            </Link>
          </li>
          <li>
            <Link
              to="/window"
              className={location.pathname === '/window' ? 'nav-link active' : 'nav-link'}
            >
              Окна
            </Link>
          </li>
          <li>
            <Link
              to="/activity"
              className={location.pathname === '/activity' ? 'nav-link active' : 'nav-link'}
            >
              Активность
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
