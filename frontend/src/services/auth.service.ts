import { API_BASE_URL } from "../constants";

interface User {
  id: string;
  email: string;
  createdAt: Date;
}

interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private static TOKEN_KEY = "auth_token";

  static async register(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    const data = await response.json();
    this.setToken(data.token);
    return data;
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    this.setToken(data.token);
    return data;
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default AuthService;
