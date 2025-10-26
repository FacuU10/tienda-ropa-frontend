import React from "react";
import { useAuth } from "../AuthContext";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Componente que protege rutas.
 * Verifica si el usuario está autenticado usando el AuthContext.
 * Si no está logueado, redirige a la página de login.
 * Usa <Outlet /> para renderizar el componente hijo (la ruta protegida, ej: Home).
 */
const PrivateRoute: React.FC = () => {
  // Obtiene el estado de autenticación desde el Contexto
  const { isLoggedIn, isLoading } = useAuth();

  // Muestra un indicador de carga mientras se verifica el token inicial
  if (isLoading) {
    // Nota: Esto se puede reemplazar con un componente Spinner de Bootstrap
    return (
      <div className="text-center mt-5">
        <p>Cargando sesión...</p>
      </div>
    );
  }

  // Si el usuario NO está logueado, lo redirige al login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está logueado, muestra el contenido de la ruta solicitada
  return <Outlet />;
};

export default PrivateRoute;
