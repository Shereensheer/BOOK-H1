import React from 'react';
import { AuthProvider } from '@site/src/components/auth/AuthProvider';

export default function Root({children}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
