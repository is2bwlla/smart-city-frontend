import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Usuario from '../assets/do-utilizador.png';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header className='flex justify-between items-center p-3 fixed z-10 w-full bg-[#fff]'>
            <Link to={"/"}><h1 className='text-red-600 text-4xl font-bold font-poppins ml-3'>SENAI</h1></Link>

            <nav>
                <ul className='flex w-[400px] justify-around items-center'>
                    <li className='font-poppins text-lg text-[#1D1E18]'><Link to={"/"}>Home</Link></li>
                    {token ? (
                        <>
                            <li className='font-poppins text-lg text-[#1D1E18]'>
                                <button onClick={handleLogout} className='bg-transparent border-none cursor-pointer'>
                                    Logout
                                </button>
                            </li>
                            <img src={Usuario} alt="Usuário" className='w-[30px]' />
                        </>
                    ) : (
                        <li className='font-poppins text-lg text-[#1D1E18]'><Link to={"/login"}>Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
