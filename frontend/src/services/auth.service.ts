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

    console.log("response", response);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    if (!data.token) {
      throw new Error("No token received from server");
    }
    this.setToken(data.token);
    return data;
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      return null;
    }
    return token;
  }

  private static setToken(token: string): void {
    if (!token) {
      throw new Error("Cannot set empty token");
    }
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  static getAuthHeader(): { Authorization: string } | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}

export default AuthService;
