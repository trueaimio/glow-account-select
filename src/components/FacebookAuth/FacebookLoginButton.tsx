
import React from 'react';
import { Facebook, CheckCircle } from 'lucide-react';

interface FacebookLoginButtonProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  onLogin: () => void;
}

const FacebookLoginButton = ({ isLoading, isAuthenticated, onLogin }: FacebookLoginButtonProps) => {
  return (
    <button
      onClick={onLogin}
      disabled={isLoading || isAuthenticated}
      className={`relative flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
        isAuthenticated
          ? 'bg-green-600 cursor-default'
          : isLoading
          ? 'bg-blue-500 cursor-not-allowed'
          : 'bg-[#1877F2] hover:bg-[#166FE5] hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
      }`}
    >
      {isLoading ? (
        <>
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Connecting...</span>
        </>
      ) : isAuthenticated ? (
        <>
          <CheckCircle className="w-6 h-6" />
          <span>Connected to Facebook</span>
        </>
      ) : (
        <>
          <Facebook className="w-6 h-6" />
          <span>Continue with Facebook</span>
        </>
      )}
    </button>
  );
};

export default FacebookLoginButton;
