import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        localStorage.removeItem("token");
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!username || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const tokenResponse = await axios.post("http://127.0.0.1:8000/api/token/", {
                username: username,
                password: password
            });

            const token = tokenResponse.data.access;
            localStorage.setItem("token", token);
            alert("Login bem sucedido.");

            const from = location.state?.from || "/";
            navigate(from);
        } catch (err) {
            console.error("Erro ao fazer login:", err);
            setError("Erro ao fazer login. Verifique suas credenciais.");
        }
    };

    return (
        <>
            <Header />

            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usuário:</label>
                        <input
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            type="text"
                            placeholder="Ex: Isabella"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Senha:</label>
                        <input
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                    <button type="submit" className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200">
                        Entrar
                    </button>

                    <div className="mt-4 text-center">
                        <Link to="/signUp">
                            <button className="bg-gray-300 text-gray-700 rounded-md p-2 w-full hover:bg-gray-400 transition duration-200">
                                Criar Conta
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
