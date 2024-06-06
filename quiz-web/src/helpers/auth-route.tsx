import { ReactElement } from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';

/**
 * A component that conditionally renders either an `Outlet` or a `Navigate`
 * based on the value of a `localStorage` item.
 *
 * @returns {ReactNode} The rendered `Outlet` or `Navigate` component.
 */
export function AuthRoute(): ReactElement {
  // TODO: If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  // TODO: remove this local storage implementation, added just for demo.
  const localUser = localStorage.getItem('user');
  const location = useLocation();

  // TODO: fix this

  if (localUser && location.pathname === '/') {
    // Redirect to dashboard
    return <Navigate to="/" replace />;
  }

  // Check if localUser is authenticated, return an outlet if authorized
  if (localUser) {
    return <Outlet />;
  }

  // Not authenticated, navigate to login with 'from' location
  return <Navigate to="/" state={{ from: location }} replace />;
}
