import React from "react";
// import './App.css'; // Asegúrate que este archivo exista o coméntalo
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
// Importamos el hook para verificar el estado de la sesión
import { useAuth } from "./AuthContext";

/**
 * Este componente App ahora es "consciente" del estado de autenticación
 * porque App.tsx está envuelto por AuthProvider en main.tsx.
 */
function App() {
  // Obtenemos el estado de la sesión y si la carga inicial terminó
  const { isLoggedIn, isLoading } = useAuth();

  // 1. Mientras el AuthContext está verificando el token, no mostramos nada
  if (isLoading) {
    return <h3>Cargando sesión...</h3>;
  }

  // 2. Una vez cargado, definimos las rutas
  return (
    <div className="App">
      <Routes>
        {/*
          Ruta Principal ("/"):
          Si el usuario está logueado (isLoggedIn es true), muestra Home.
          Si NO está logueado, lo redirige a /login.
        */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />

        {/*
          Rutas Públicas:
          El usuario siempre puede ver /login y /register.
          Si el usuario ya está logueado e intenta ir a /login, 
          podríamos (opcionalmente) redirigirlo a Home.
        */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Ruta para cualquier otra URL no encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
