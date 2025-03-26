import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";

interface AuthViewProps {
  showLogin: boolean;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({
  showLogin,
  onSwitchToRegister,
  onSwitchToLogin,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {showLogin ? (
        <Login
          key="login"
          onSuccess={() => {}}
          onSwitchToRegister={onSwitchToRegister}
        />
      ) : (
        <Register
          key="register"
          onSuccess={() => {}}
          onSwitchToLogin={onSwitchToLogin}
        />
      )}
    </div>
  );
};

export default AuthView;
