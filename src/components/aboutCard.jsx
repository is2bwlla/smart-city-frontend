// AboutCard.js
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiReact, SiDjango, SiTailwindcss } from 'react-icons/si'; 
import Isabella from '../assets/profile-github.png';
import Lindomar from '../assets/lindomar.jfif';
import Fernanda from '../assets/fernanda.png';

const AboutCard = ({ item, onClose }) => {
  const renderContent = () => {
    switch (item) {
      case 'About':
        return (
          <>
            <div className='flex flex-col w-[200px] items-center'>
                <img src={Isabella} alt="Isabella Souza" className="w-[160px] h-auto rounded-full mb-4 mt-4"/>
                <p>Isabella Souza</p>
                <div className="flex space-x-4 mt-2">
                    <a href="https://www.linkedin.com/in/isabella-souza-365a79293/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-blue-600 hover:text-blue-800" size={24}/></a>
                    <a href="https://github.com/is2bwlla" target="_blank" rel="noopener noreferrer"><FaGithub className="text-gray-800 hover:text-black" size={24}/></a>
                </div>
            </div>
          </>
        );

      case 'Teacher':
        return (
          <>
            <div className='flex'>
              <div className='border-2 p-3'>
                <div className='flex flex-col w-[200px] items-center'>
                    <img src={Lindomar} alt="Lindomar" className="w-[160px] h-auto rounded-full mb-4 mt-4" />
                    <p>Lindomar Batistão</p>
                    <p>Programação Backend</p>
                    <div className="flex space-x-4 mt-2">
                        <a href="https://www.linkedin.com/in/lindomarbatistao/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-blue-600 hover:text-blue-800" size={24}/></a>
                        <a href="https://github.com/lindomarbatistao" target="_blank" rel="noopener noreferrer"><FaGithub className="text-gray-800 hover:text-black" size={24}/></a>
                    </div>
                </div>
              </div>

              <div className='ml-8 border-2 p-3'>
                <div className='flex flex-col w-[200px] items-center'>
                    <img src={Fernanda} alt="Fernanda" className="w-[160px] h-auto rounded-full mb-4 mt-4" />
                    <p>Fernanda Fretes</p>
                    <p>Programação Frontend</p>
                    <div className="flex space-x-4 mt-2">
                        <a href="https://www.linkedin.com/in/fernanda-fretes-08762927/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-blue-600 hover:text-blue-800" size={24}/></a>
                        <a href="https://github.com/FernandaFretes" target="_blank" rel="noopener noreferrer"><FaGithub className="text-gray-800 hover:text-black" size={24}/></a>
                    </div>
                </div>
              </div>
            </div>
            
          </>
        );

      case 'Tools':
        return (
          <div className="flex space-x-4 mt-2">
            <SiReact className="text-blue-500" size={50} title="React"/>
            <SiDjango className="text-green-700" size={50} title="Django"/>
            <SiTailwindcss className="text-teal-500" size={50} title="TailwindCSS"/>
          </div>
        );

      case 'Senai':
        return (
          <>
            <p>Visite o site do SENAI</p>
            <a href="https://www.sp.senai.br" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 inline-block">Ir para o SENAI</a>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className='mt-4 p-4 border border-gray-300 bg-white shadow-lg rounded'>
      <h3 className='text-lg font-bold'>{item}</h3>
      {renderContent()}
      <br/>
      <button className='mt-4 text-blue-500 hover:underline' onClick={onClose}>Fechar</button>
    </div>
  );
};

export default AboutCard;
