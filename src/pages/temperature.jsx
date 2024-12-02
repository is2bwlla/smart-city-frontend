import Header from "../components/header";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Footer from "../components/footer";
import { Line } from 'react-chartjs-2';     //é um componente específico da biblioteca que ajuda a simplificar o gráficos e passar dados e configurações via props
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
/* 
    - ChartJS: tem todas as funcionalidades para criar e configurar os gráficos;
    - CategoryScale: é o eixo x, ou seja, a linha horizontal do gráfico, usa para colocar os dados categóricos, tipo nome, rótulo e pá;
    - LinearScale: é o eixo y, ou seja, a linha vertical do gráfico, usa para valores númericos, tipo os valores da temperatura;
    - PointElement: é os pontos individuais no gráfico, ele conta pontos nas interseções entre os eixos;
    - LineElement: são as linhas que conectam os pontos do gráfico, ele é o css, onde você vai estilizar cor, espesssura, etc;
    - Title: adiciona o título do gráfico;
    - Tooltip: mostra as informações com mais detalhes quando passa o mouse em cima dos pontos do gráfico;
    - Legend: coloca a legenda do gráfico.
*/

const TemperatureTable = () => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => () => {
        const fetchTemperature = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/temperatura/");
                console.log(response.data);
                setTemperatureData(response.data);
            } catch (error) {
                console.error('Error ao buscar os dados de temperatura: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemperature();
        
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    const chartData = {
        labels: temperatureData.map(data => new Date(data.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: 'Valor de Temperatura',
                data: temperatureData.map(data => data.valor.toFixed(1)),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    /*
        - labels: define os rótulos do eixo x do gráfico, to criando uma lista de rótulos baseada nos dados de temperatura;
        - datasets: são os dados do gráfico;
        - data: os valores que estarão no eixo y extraído;
        - tudo isso vai ser passado pra uma tag <Line/> para renderizar os gráficos.


        - o <Line/> ta dentro do return() e nele o data={} recebe a const que eu fiz ali em cima, chartData e o options={} deixa o gráfico responsivo.
    */

    return (
        <>
            <Header/>

            <div className="flex justify-center p-4">
                <div className="w-full max-w-4xl mt-20">
                    <Line data={chartData} options={{responsive: true}} />
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
                        {temperatureData.map(data => (
                            <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{data.id}</td>
                                <td className="py-3 px-6">{data.valor.toFixed(1)}</td>
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

export default TemperatureTable;