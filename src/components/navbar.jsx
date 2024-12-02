import { Link } from "react-router-dom";
import Modal from "./modal";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const  [isAuthenticated, setIsAuthenticaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticaded(!!token);
    }, [])
    

    return (
        <nav className="flex bg-[#E4E4E5] p-3 flex-col w-[200px] h-screen">
            <h2 className="text-2xl">Sensores</h2>
            <hr className="border-t border-black mt-1 mb-6" />
            <Link to="/sensor"><h2 className="text-xl mb-9">Sensores</h2></Link>
            <Link to="/umidity"><h2 className="text-xl mb-9">Umidade</h2></Link>
            <Link to="/temperature"><h2 className="text-xl mb-8">Temperatura</h2></Link>
            <Link to="/luminosity"><h2 className="text-xl mb-8">Luminosidade</h2></Link>
            <Link to="/counter"><h2 className="text-xl mb-8">Contador</h2></Link>
            {isAuthenticated && (
                <button 
                    type="button"
                    onClick={() => setIsModalOpen(true)} 
                    className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200">
                    Novo Sensor
                </button>
            )}

            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
        </nav>
    );
};

export default Navbar;