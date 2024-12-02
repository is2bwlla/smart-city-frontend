import React, { useState } from 'react';
import AboutCard from './aboutCard';
import Logo from '../assets/logo.svg'; 

const Footer = () => {
  const [selectedItem, setSelectedItem] = useState(null); 

  const handleItemClick = (item) => {
    setSelectedItem(prevItem => (prevItem === item ? null : item)); 
  };

  return (
    <footer className='flex flex-col mt-8 p-5'>
      <div className='self-center'>
        <hr className="border-t border-black mt-1 mb-6 w-[1800px]" />
      </div>

      <div className='flex flex-start ml-8 flex-row'>
        <img src={Logo} alt="Logo"/>
        <div className='flex items-center'>
          <h2 className={`ml-10 cursor-pointer ${selectedItem === 'About' ? 'text-red-500' : 'text-black'} hover:text-red-500`} onClick={() => handleItemClick('About')}>About</h2>
          <h2 className={`ml-10 cursor-pointer ${selectedItem === 'Tools' ? 'text-red-500' : 'text-black'} hover:text-red-500`} onClick={() => handleItemClick('Tools')}>Tools</h2>
          <h2 className={`ml-10 cursor-pointer ${selectedItem === 'Teacher' ? 'text-red-500' : 'text-black'} hover:text-red-500`} onClick={() => handleItemClick('Teacher')}>Teacher</h2>
          <h2 className={`ml-10 cursor-pointer ${selectedItem === 'Senai' ? 'text-red-500' : 'text-black'} hover:text-red-500`} onClick={() => handleItemClick('Senai')}>SENAI</h2>
        </div>
      </div>

      {selectedItem && (<AboutCard item={selectedItem} onClose={() => setSelectedItem(null)}/>)}
      <p className="self-center mt-4">Todos os direitos reservados</p>
    </footer>
  );
};

export default Footer;
