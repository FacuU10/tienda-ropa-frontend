import React, { createContext, useState, useContext, useEffect } from "react";

// 1. Definir la forma (shape) de nuestro contexto
interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  isLoading: boolean; // Estado de carga para la verificación inicial
  login: (token: string) => void;
  logout: () => void;
}

// 2. Crear el Contexto
// Usamos '!' (non-null assertion) porque lo proveeremos en App.tsx
const AuthContext = createContext<AuthContextType>(null!);

// 3. Crear el Hook personalizado (para consumir el contexto)
export function useAuth() {
  return useContext(AuthContext);
}

// 4. Crear el Proveedor (El componente que envuelve la App)
interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Inicia en true

  // 5. Verificar el token en localStorage al cargar la app
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("userToken");
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("No se pudo leer el token de localStorage", error);
    } finally {
      setIsLoading(false); // Terminamos de cargar
    }
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez

  // 6. Función de Login
  const login = (newToken: string) => {
    try {
      localStorage.setItem("userToken", newToken);
      setToken(newToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("No se pudo guardar el token", error);
    }
  };

  // 7. Función de Logout
  const logout = () => {
    try {
      localStorage.removeItem("userToken");
      setToken(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("No se pudo eliminar el token", error);
    }
  };

  // 8. El valor que proveemos a los componentes hijos
  const value = {
    isLoggedIn,
    token,
    isLoading,
    login,
    logout,
  };

  // No renderizamos nada hasta que la carga inicial termine
  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h3>Cargando sesión...</h3>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
