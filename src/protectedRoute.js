// protectedRoute.js
import React from 'react';

const protectedRoute = (WrappedComponent) => {
  // ... (Your route protection logic)
  return (props) => <WrappedComponent {...props} />;
};

export default protectedRoute;
