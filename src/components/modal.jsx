import { useState } from "react";
import axios from "axios";

const Modal = ({ onClose }) => {
    const [sensorType, setSensorType] = useState("");
    const [sensorValue, setSensorValue] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [responsavel, setResponsavel] = useState("");

    const handleSensorCreation = async () => {
        if (!sensorType || !latitude || !longitude || !localizacao || !responsavel) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        try {
            // São os tipos de dados que eu espero receber em cada um dos campos de sensor
            const sensorData = {
                tipo: sensorType,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                localizacao,
                responsavel,
            };

            const sensorResponse = await axios.post("http://127.0.0.1:8000/api/sensors/", sensorData);

            console.log("Sensor criado com sucesso:", sensorResponse.data);

            // como eu não defino o ID do sensor, ele vai ser definido automaticamente
            const sensorId = sensorResponse.data.id;

            // Aqui eu to fazendo como se fosse um filtro porque ao mesmo tempo que eu insiro na tabela sensores, que é a tabela geral
            // eu quero que seja inserido direto na tabela referente ao sensor que eu to adicionando dados
            // Eu filtro pelo sensorType e em uma cadeia de condicionais eu dou a endpoint necessária para a respectiva tabela que eu
            // to usando no momento
            
            if (sensorType === "Temperatura") {
                const temperaturaData = {
                    sensor: sensorId,
                    valor: parseFloat(sensorValue),
                };
                await axios.post("http://127.0.0.1:8000/api/temperatura/", temperaturaData);
                console.log("Dado de Temperatura inserido com sucesso!");
            } else if (sensorType === "Umidade") {
                const umidadeData = {
                    sensor: sensorId,
                    valor: parseFloat(sensorValue),
                };
                await axios.post("http://127.0.0.1:8000/api/umidade/", umidadeData);
                console.log("Dado de Umidade inserido com sucesso!");
            } else if (sensorType === "Luminosidade") {
                const luminosidadeData = {
                    sensor: sensorId,
                    valor: parseFloat(sensorValue),
                };
                await axios.post("http://127.0.0.1:8000/api/luminosidade/", luminosidadeData);
                console.log("Dado de Luminosidade inserido com sucesso!");
            } else if (sensorType === "Contador") {
                const contadorData = {
                    sensor: sensorId,
                    valor: parseInt(sensorValue),
                };
                await axios.post("http://127.0.0.1:8000/api/contador/", contadorData);
                console.log("Dado de Contador inserido com sucesso!");
            }

            alert("Sensor e dados inseridos com sucesso!");
            onClose();
        } catch (error) {
            console.error("Erro ao criar sensor:", error.response?.data || error.message);
            alert("Erro ao criar sensor. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-[400px]">
                <h2 className="text-xl font-bold mb-4">Novo Sensor</h2>
                <label className="block mb-2">Selecione o tipo de sensor:</label>
                <select
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    value={sensorType}
                    onChange={(e) => setSensorType(e.target.value)}
                >
                    <option value="">Selecione...</option>
                    <option value="Temperatura">Temperatura</option>
                    <option value="Umidade">Umidade</option>
                    <option value="Luminosidade">Luminosidade</option>
                    <option value="Contador">Contador</option>
                </select>

                {sensorType !== "Contador" && sensorType && (
                    <div className="mb-4">
                        <label className="block mb-2">Valor:</label>
                        <input
                            type="number"
                            value={sensorValue}
                            onChange={(e) => setSensorValue(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder={`Digite o valor do sensor de ${sensorType}`}
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-2">Latitude:</label>
                    <input
                        type="number"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Digite a latitude"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Longitude:</label>
                    <input
                        type="number"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Digite a longitude"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Localização:</label>
                    <input
                        type="text"
                        value={localizacao}
                        onChange={(e) => setLocalizacao(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Digite a localização"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Responsável:</label>
                    <input
                        type="text"
                        value={responsavel}
                        onChange={(e) => setResponsavel(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Digite o nome do responsável"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSensorCreation}
                    className="w-full bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition duration-200"
                >
                    Salvar Sensor
                </button>
                <button
                    onClick={onClose}
                    className="w-full bg-red-500 text-white rounded-md p-2 mt-4 hover:bg-red-600 transition duration-200"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default Modal;
