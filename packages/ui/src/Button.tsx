import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded bg-blue-600 text-white ${className}`}
    {...props}
  />
);
