import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Link from '@docusaurus/Link';

const LoginPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const redirectAfterAuth = () => {
    const redirectUrl =
      new URLSearchParams(window.location.search).get('redirect') || '/';
    window.location.href = redirectUrl;
  };

  return (
    <Layout title={isLoginView ? 'Login' : 'Sign Up'}>
      <style>{`
        /* Page container */
        .auth-page {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #1b0030, #4b007f);
        }

        /* Card */
        .auth-card {
          width: 100%;
          max-width: 440px;
          background: rgba(30, 0, 50, 0.85); /* Purple glass */
          border-radius: 24px;
          box-shadow: 0 25px 60px rgba(75, 0, 127, 0.5); /* neon shadow */
          overflow: hidden;
          backdrop-filter: blur(14px);
          border: 1px solid rgba(200, 100, 255, 0.4);
        }

        /* Header */
        .auth-header {
          padding: 36px 28px;
          text-align: center;
          background: linear-gradient(135deg, #8e2de2, #4a00e0); /* neon gradient */
          color: #f0e6ff;
        }

        .auth-header h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
        }

        .auth-header p {
          margin-top: 6px;
          font-size: 14px;
          opacity: 0.85;
        }

        /* Toggle buttons */
        .auth-toggle {
          display: flex;
          margin: 22px;
          background: rgba(50, 0, 70, 0.3);
          border-radius: 999px;
          padding: 5px;
          box-shadow: inset 0 0 0 1px rgba(200, 100, 255, 0.3);
        }

        .auth-toggle button {
          flex: 1;
          border: none;
          background: transparent;
          padding: 11px 0;
          border-radius: 999px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          color: #e0d4ff;
        }

        .auth-toggle button:hover {
          opacity: 0.85;
        }

        .auth-toggle button.active {
          background: linear-gradient(135deg, #8e2de2, #4a00e0);
          color: #fff;
          box-shadow: 0 6px 16px rgba(138, 43, 226, 0.6);
        }

        /* Body */
        .auth-body {
          padding: 12px 28px 28px;
        }

        /* Footer */
        .auth-footer {
          text-align: center;
          padding: 18px;
          border-top: 1px solid rgba(200, 100, 255, 0.3);
          font-size: 14px;
        }

        .auth-footer a {
          text-decoration: none;
          font-weight: 500;
          color: #d8baff;
          transition: color 0.2s ease;
        }

        .auth-footer a:hover {
          color: #ffffff;
        }

        @media (max-width: 480px) {
          .auth-card {
            margin: 0 10px;
          }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <h1>{isLoginView ? 'Welcome Back 👋' : 'Create Account 🚀'}</h1>
            <p>
              {isLoginView
                ? 'Login to continue your journey'
                : 'Join us and start building today'}
            </p>
          </div>

          {/* Toggle */}
          <div className="auth-toggle">
            <button
              className={isLoginView ? 'active' : ''}
              onClick={() => setIsLoginView(true)}
            >
              Login
            </button>
            <button
              className={!isLoginView ? 'active' : ''}
              onClick={() => setIsLoginView(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Body */}
          <div className="auth-body">
            {isLoginView ? (
              <Login onSuccess={redirectAfterAuth} />
            ) : (
              <Signup onSuccess={redirectAfterAuth} />
            )}
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
