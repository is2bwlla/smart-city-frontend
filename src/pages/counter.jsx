import Header from "../components/header";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Footer from "../components/footer";

const Counter = () => {
    const [counterData, setCounterData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => () => {
        const fetchCounter = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/contador/");
                console.log(response.data);
                setCounterData(response.data);
            } catch (error) {
                console.error('Error ao buscar os dados de contador: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCounter();
        
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Header/>

            <div className="flex justify-center p-4">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-[80px]">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Sensor ID</th>
                            <th className="py-3 px-6 text-left">Timestamp</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                        {counterData.map(data => (
                            <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{data.id}</td>
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

export default Counter;