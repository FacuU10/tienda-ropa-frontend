import React, { useState } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
// Importamos el hook useAuth para poder iniciar sesión automáticamente
import { useAuth } from "../AuthContext";
// 1. IMPORTAMOS useNavigate para la redirección
import { useNavigate, Link } from "react-router-dom";

function Register() {
  // Estados para capturar los datos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Obtenemos la función login del contexto para establecer la sesión
  const { login } = useAuth();
  // 2. INICIALIZAMOS useNavigate
  const navigate = useNavigate();

  // Endpoint de la API (Comentado para simulación)
  // const API_REGISTER_URL = "http://localhost:8080/api/v1/auth/register";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setError("");
    setLoading(true);

    // 3. --- INICIO DE LA SIMULACIÓN (MOCK) ---
    // Simulamos una espera de 1 segundo (1000 ms) como si fuera la API
    setTimeout(() => {
      console.log("Simulando registro exitoso para:", email);

      // 4. Creamos un token falso
      const MOCK_TOKEN = `fake-token-for-${email}-${Date.now()}`;

      // 5. Llamamos a login() (de AuthContext) para guardar el token falso
      login(MOCK_TOKEN);

      // 6. Redirigimos al Home
      navigate("/");

      // 7. Detenemos la carga
      setLoading(false);
    }, 1000);

    // 4. --- FIN DE LA SIMULACIÓN ---

    /*
    // --- CÓDIGO REAL DE API (Lo dejamos comentado por ahora) ---
    try {
      const response = await fetch(API_REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        login(token); // AuthContext guarda el token
        navigate("/");  // Redirigimos
      } else {
        setError(data.message || "Error en el registro.");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card style={{ width: "25rem" }} className="shadow-lg p-3">
        <Card.Body>
          <h2 className="text-center mb-4">Crear Cuenta</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Registrando...</span>
                </>
              ) : (
                "Registrarse"
              )}
            </Button>

            <p className="text-center mt-3">
              {/* 5. Usamos <Link> para navegación interna */}
              ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
