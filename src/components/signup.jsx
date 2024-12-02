import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
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
            console.log("Formulário submetido.");

            const response = await axios.post("http://127.0.0.1:8000/api/create_user/", {
                username: username,
                email: email,
                password: password
            });

            const tokenResponse = await axios.post("http://127.0.0.1:8000/api/token/", {
                username: username,
                password: password
            });

            const token = tokenResponse.data.access;
            localStorage.setItem("token", token);

            alert("Usuário cadastrado com sucesso!");
            setUsername("");
            setEmail("");
            setPassword("");
            setError("");

            const from = location.state?.from || "/";
            navigate(from);

        } catch (error) {
            console.error("Erro:", error);

            if (error.response) {
                console.log("Erro de resposta:", error.response.data);
                setError("Erro ao cadastrar usuário: " + JSON.stringify(error.response.data));
            } else {
                setError("Erro ao cadastrar o usuário: " + error.message);
            }
        }  
    };

    return (
        <>
            <Header/>

            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-xl font-semibold mb-4 text-center">Cadastro</h2>
                    
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                        <input 
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            type="email" 
                            placeholder="Ex: isabella@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white rounded-md p-2 hover:bg-green-700 transition duration-200"
                    >
                        Cadastrar
                    </button>

                    <div className="mt-4 text-center">
                        <Link to="/login">
                            <button className="bg-gray-300 text-gray-700 rounded-md p-2 w-full hover:bg-gray-400 transition duration-200">
                                Já possui conta? Faça Login
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignUp;
