import React from 'react';
import { useAuth } from './AuthProvider';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

const AuthButton: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const redirectParam = location.pathname + location.search;
  const loginUrl = `/login?redirect=${encodeURIComponent(redirectParam)}`;

  return (
    <>
      {isAuthenticated ? (
        <div className="auth-nav-wrapper">
          {/* USER BADGE */}
          <div className="auth-user-chip">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
            </svg>
            <span>{user?.name || user?.email}</span>
          </div>

          {/* LOGOUT */}
          <button onClick={logout} className="auth-logout-btn">
            Logout
          </button>
        </div>
      ) : (
        /* LOGIN */
        <Link to={loginUrl} className="auth-login-btn">
          Login
        </Link>
      )}
    </>
  );
};

export default AuthButton;
