import Header from "../components/header";
import Footer from "../components/footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Início do código:
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SensorTable = () => {
    const [sensorData, setSensorData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => () => {
        const fetchSensor = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/sensors/");
                console.log(response.data);
                setSensorData(response.data);
            } catch (error) {
                console.error('Error ao buscar os dados de Sensores: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSensor();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Header/>
            <div className="flex justify-center p-4">
                <table className="w-[50%] bg-white border border-gray-200 rounded-lg shadow-lg mt-[80px]">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Tipo</th>
                            <th className="py-3 px-6 text-left">Localização</th>
                            <th className="py-3 px-6 text-left">Responsável</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                        {sensorData.map(data => (
                            <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{data.id}</td>
                                <td className="py-3 px-6">{data.tipo}</td>
                                <td className="py-3 px-6">{data.localizacao}</td>
                                <td className="py-3 px-6">{data.responsavel}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Footer/>
        </>
    );
};

export default SensorTable;
