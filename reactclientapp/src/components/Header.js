import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Eğitim Kataloğu</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Anasayfa</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">Hakkında</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
