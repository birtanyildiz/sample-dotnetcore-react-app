import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <p className="col-md-4 mb-0 text-muted">&copy; 2022 Company, Inc</p>
    <ul className="nav col-md-4 justify-content-end">
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Anasayfa</Link></li>
      <li className="nav-item"><Link to="/about" className="nav-link px-2 text-muted">Hakkında</Link></li>
    </ul>
  </footer>
  )
}
