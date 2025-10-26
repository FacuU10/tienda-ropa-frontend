import React, { useState } from "react";
// Importamos los componentes de react-bootstrap
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
// 1. Importar el hook useAuth para acceder al contexto
import { useAuth } from "../AuthContext";
// 2. Importar useNavigate para la redirección
import { useNavigate, Link } from "react-router-dom";

// Definimos el tipo para el evento del formulario (recomendado en TypeScript)
type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

function Login() {
  // Estados para el formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //  Obtener la función login de nuestro contexto
  const { login } = useAuth();
  // Inicializar el hook de navegación
  const navigate = useNavigate();

  // Endpoint de la API (Comentado porque estamos en simulación)
  // const API_LOGIN_URL = "http://localhost:8080/api/v1/auth/login";

  // Función de envío actualizada (asíncrona)
  const handleSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, ingresa tu email y contraseña.");
      return;
    }

    setError("");
    setLoading(true);

    //  MODO SIMULACIÓN (ACTIVADO)
    // Simulamos 1 segundo de espera de la API
    setTimeout(() => {
      console.log("Simulando login exitoso para:", email);
      // Creamos un token falso
      const MOCK_TOKEN = `fake-jwt-token-for-${email}`;
      // Llamamos a la función del contexto para guardar la sesión
      login(MOCK_TOKEN);
      // Redirigimos al Home (ruta '/')
      navigate("/");
      // setLoading(false); // No es necesario aquí, setTimeout no es 'finally'
    }, 1000);
    // NOTA: No ponemos setLoading(false) aquí porque setTimeout
    // no bloquea la ejecución como 'await'. Lo movemos fuera
    // si la simulación es lo único que hacemos.
    // Para esta prueba, lo dejaremos simple.
    // O mejor, lo ponemos dentro del timeout:
    // setTimeout(() => { ...; setLoading(false); }, 1000);
    // (Actualizado en el código de abajo para más precisión)
    // --- FIN MODO SIMULACIÓN ---

    /*
    // --- MODO REAL (DESACTIVADO) ---
    try {
      const response = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token);
        navigate("/");
      } else {
        setError(data.message || 'Error de autenticación.');
      }
    } catch (err) {
      console.error('Error de conexión:', err);
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
    // --- FIN MODO REAL ---
    */
  };

  // Corrección de la simulación para que 'setLoading(false)' se ejecute
  const handleSimulationSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, ingresa tu email y contraseña.");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      console.log("Simulando login exitoso para:", email);
      const MOCK_TOKEN = `fake-jwt-token-for-${email}`;
      login(MOCK_TOKEN);
      navigate("/");
      setLoading(false); // <--- setLoading(false) debe ir DENTRO del timeout
    }, 1000);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card style={{ width: "25rem" }} className="shadow-lg p-3">
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Usamos la función de simulación corregida */}
          <Form onSubmit={handleSimulationSubmit}>
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
              variant="primary"
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
                  <span className="ms-2">Accediendo...</span>
                </>
              ) : (
                "Acceder"
              )}
            </Button>

            <p className="text-center mt-3">
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
