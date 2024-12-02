import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../components/header";
import Footer from "../components/footer";
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Luminosity = () => {
    const [luminosityData, setLuminosityData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLuminosity = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/luminosidade/");
                setLuminosityData(response.data);
            } catch (error) {
                console.error('Error ao buscar os dados de luminosidade: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLuminosity();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const chartData = {
        labels: luminosityData.map(data => new Date(data.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: 'Valor de Luminosidade',
                data: luminosityData.map(data => data.valor),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <>
            <Header/>

            <div className="flex justify-center p-4">
                <div className="w-full max-w-4xl mt-20">
                    <Line data={chartData} options={{ responsive: true }} />
                </div>
            </div>

            <div className="flex justify-center p-4">
                <table className="w-[50%] bg-white border border-gray-200 rounded-lg shadow-lg mt-[80px]">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Valor</th>
                            <th className="py-3 px-6 text-left">Sensor ID</th>
                            <th className="py-3 px-6 text-left">Timestamp</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                        {luminosityData.map(data => (
                            <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{data.id}</td>
                                <td className="py-3 px-6">{data.valor}</td>
                                <td className="py-3 px-6">{data.sensor_id}</td>
                                <td className="py-3 px-6">{new Date(data.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Footer/>
        </>
    );
};

export default Luminosity;