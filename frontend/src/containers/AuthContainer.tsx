import React from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthView from "../views/AuthView";

const AuthContainer: React.FC = () => {
  const { showLogin, setShowLogin } = useAuth();

  return (
    <AuthView
      showLogin={showLogin}
      onSwitchToRegister={() => setShowLogin(false)}
      onSwitchToLogin={() => setShowLogin(true)}
    />
  );
};

export default AuthContainer;
