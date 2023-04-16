import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logo, sun } from '../assets';
import { navlinks } from '../constants';

import { useDisconnect } from "@thirdweb-dev/react";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-[60px] h-[55px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    <div className="flex flex-col items-center">
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2 mb-1" />
      ) : (
        <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
      )}
      <span className="text-xs mt-1 text-white">{name}</span>
    </div>
  </div>
);
  
  const Sidebar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    const disconnect = useDisconnect();

    const handleLogout = () => {
      disconnect();
      navigate('/');
    };
  
    return (
      <div className="flex justify-between items-center flex-col sticky top-5 h-[50vh]">
       
        <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
          <div className="flex flex-col justify-center items-center gap-3">
            {navlinks.map((link) => (
              <Icon 
                key={link.name}
                {...link}
                isActive={isActive}
                handleClick={() => {
                  if(!link.disabled) {
                    setIsActive(link.name);
                    if (link.name === 'logout') {
                      handleLogout(); // perform the logout action
                      setIsActive('dashboard');
                    } else {
                      navigate(link.link);
                    }
                  }
                }}
              />
            ))}
          </div>
  
         
        </div>
      </div>
    )
  }
  
  export default Sidebar