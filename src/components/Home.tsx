import React from "react";
// 1. Importamos el hook useAuth para acceder a las funciones del contexto
import { useAuth } from "../AuthContext";
import { Container, Button } from "react-bootstrap";

function Home() {
  // 2. Obtenemos la función logout del contexto
  const { logout, token } = useAuth();

  // Función que se ejecuta al hacer clic en el botón
  const handleLogout = () => {
    logout(); // Llama a la función logout que elimina el token y redirige
  };

  return (
    <Container className="text-center mt-5">
      <h1>¡Bienvenido a la Tienda de Ropa!</h1>
      <p>Has iniciado sesión con éxito.</p>

      {/* Opcional: Mostrar el token (Solo para desarrollo, no para producción) */}
      <small className="d-block mb-4 text-muted">
        Tu token (para llamadas API):{" "}
        {token ? token.substring(0, 15) + "..." : "N/A"}
      </small>

      {/* Botón de Cerrar Sesión */}
      <Button
        variant="danger"
        size="lg"
        onClick={handleLogout}
        className="shadow-sm"
      >
        Cerrar Sesión
      </Button>

      <div className="mt-5">
        <h2>Productos Destacados</h2>
        <p>
          Aquí irá el código para llamar al endpoint GET /products y mostrarlos.
        </p>
      </div>
    </Container>
  );
}

export default Home;
