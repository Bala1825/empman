
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <p className="not-found-code">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>

      <Link to="/login" className="not-found-link">
        Go to login
      </Link>
    </main>
  );
}

export default NotFound;
