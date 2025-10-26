import React, { useState } from "react";
// Importamos los componentes de react-bootstrap
import { Container, Form, Button, Card } from "react-bootstrap";

function Login() {
  // 1. Estados para almacenar los valores de los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 2. Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Lógica básica de validación (puedes expandirla)
    if (!email || !password) {
      setError("Por favor, ingresa tu email y contraseña.");
      return;
    }

    // Aquí iría la llamada a la API de tu socio (el endpoint POST /auth/login)
    console.log("Intentando iniciar sesión con:", { email, password });
    setError(""); // Limpiamos errores si todo va bien

    // NOTA IMPORTANTE: La llamada real a la API se haría con fetch o axios:
    /*
    fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta: guardar el token, redirigir, etc.
    })
    .catch(err => {
        setError('Error al conectar con el servidor.');
    });
    */
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card style={{ width: "25rem" }} className="shadow-lg p-3">
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>

          {/* Muestra el mensaje de error si existe */}
          {error && <div className="alert alert-danger">{error}</div>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Acceder
            </Button>

            <p className="text-center mt-3">
              ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
