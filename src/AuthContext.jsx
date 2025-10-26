import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 1. Crear el contexto
// Exportamos el hook para usarlo en otros componentes
export const AuthContext = createContext();

// 2. Crear el componente Proveedor (Provider)
// Este componente envuelve la aplicación y proporciona el estado.
export const AuthProvider = ({ children }) => {
  // Estado para el token y el estado de carga inicial
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = (newToken) => {
    setToken(newToken);
    // Guarda el token en el almacenamiento local para persistencia
    localStorage.setItem("userToken", newToken);
    // Redirige a la página principal (Home)
    navigate("/");
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    // Elimina el token del almacenamiento local
    localStorage.removeItem("userToken");
    // Redirige al login
    navigate("/login");
  };

  // Efecto para cargar el token al inicio de la aplicación
  useEffect(() => {
    // Al cargar, intenta obtener el token de localStorage
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      // Si hay un token guardado, establece el estado
      setToken(storedToken);
    }
    // Finaliza la carga, permitiendo que la aplicación se renderice
    setIsLoading(false);
  }, []); // El array vacío asegura que se ejecuta solo una vez al montar

  // Valor del contexto que se pasa a los componentes hijos
  const contextValue = {
    token,
    isLoggedIn: !!token, // Devuelve true si token tiene un valor (está logueado)
    isLoading,
    login,
    logout,
  };

  // Si está cargando, podemos mostrar un mensaje (opcional)
  if (isLoading) {
    return <div className="text-center p-5">Cargando sesión...</div>;
  }

  // Proporciona el estado y las funciones a los componentes hijos
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook personalizado para facilitar el uso del contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
