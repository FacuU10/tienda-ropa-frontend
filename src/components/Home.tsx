import React from "react";
import { Button, Container } from "react-bootstrap";
import { useAuth } from "../AuthContext"; // Importamos el hook

function Home() {
  // Obtenemos la función logout y el estado isLoggedIn
  const { logout, isLoggedIn } = useAuth();

  const handleLogout = () => {
    logout();
    // La redirección a /login es manejada automáticamente
    // por el componente PrivateRoute
  };

  return (
    <Container className="mt-5 text-center">
      <h1>Bienvenido a Ivaga</h1>
      <p>Has iniciado sesión correctamente.</p>
      {isLoggedIn && (
        <Button variant="danger" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      )}
    </Container>
  );
}

export default Home;
