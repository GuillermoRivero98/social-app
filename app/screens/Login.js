import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // Para manejar errores
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos");
      return;
    }
    try {
      const userData = await loginUser(formData); // Cambié para pasar `formData` directamente
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/feed"); // Redirige al feed
    } catch (error) {
      setError("Credenciales incorrectas o error de conexión");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Iniciar Sesión</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;
