import React from 'react';

interface ErrorProps {
  error: number;
}

export const Error: React.FC<ErrorProps> = ({ error }) => {
  return <div>Error page | {error}</div>;
};
