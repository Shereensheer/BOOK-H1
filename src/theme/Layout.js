import React from 'react';
import { useLocation } from '@docusaurus/router';
import OriginalLayout from '@theme-original/Layout';
import ChatbotWidget from './ChatbotWidget';
import AuthButton from '@site/src/components/auth/AuthButton';
import { useAuth } from '@site/src/components/auth/AuthProvider';

export default function LayoutWrapper(props) {
  const location = useLocation();
  const { loading } = useAuth();

  // Only show AuthButton on certain pages (not on /blog pages, etc)
  const shouldShowAuthButton = location && !location.pathname.includes('/blog');

  return (
    <OriginalLayout {...props}>
      {/* Add AuthButton to the header area if not loading and on appropriate pages */}
      {!loading && shouldShowAuthButton && (
        <div style={{
          position: 'absolute',
          right: '100px',
          top: '15px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center'
        }}>
          {/* <AuthButton /> */}
        </div>
      )}
      {props.children}
      <ChatbotWidget />
    </OriginalLayout>
  );
}