import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { useAuth } from '../components/auth/AuthProvider';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function ProtectedPage() {
  const { isAuthenticated, loading } = useAuth();
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!loading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, loading]);

  // Show loading state while checking auth status
  if (loading) {
    return (
      <Layout title="Loading..." description="Checking authentication status">
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <div className="text--center padding--vert--lg">
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // If not authenticated but not loading, show redirecting message
  if (!isAuthenticated) {
    return (
      <Layout title="Redirecting..." description="Redirecting to login page">
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <div className="text--center padding--vert--lg">
                <p>Redirecting to login page...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show protected content if authenticated
  return (
    <Layout title="Protected Content" description="This page requires authentication">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Protected Content</h1>
            <p>This page is only accessible to authenticated users.</p>
            <p>Welcome to the protected area of our application!</p>
            <div className="margin-vert--lg">
              <a href="/docs/book/course-overview" className="button button--primary button--lg">
                Continue to Content
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProtectedPage;