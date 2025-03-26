import React from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthView from "../views/AuthView";
import { useNavigate } from "react-router-dom";

const AuthContainer: React.FC = () => {
  const { showLogin, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const onRegisterSuccess = () => setShowLogin(true);
  const onLoginSuccess = () => navigate("/");

  return (
    <AuthView
      showLogin={showLogin}
      onSwitchToRegister={() => setShowLogin(false)}
      onSwitchToLogin={() => setShowLogin(true)}
      onRegisterSuccess={onRegisterSuccess}
      onLoginSuccess={onLoginSuccess}
    />
  );
};

export default AuthContainer;
