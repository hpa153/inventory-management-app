import React, { useState } from 'react';
import { RiProductHuntLine } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

import './Sidebar.scss';
import menu from '../../data/sidebar';
import SidebarItem from './sidebarItem/SidebarItem';

const Sidebar = ({children}: {children: React.ReactNode}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <div className='layout'>
      <div className="sidebar" style={{ width: isOpen ? '230px' : '60px' }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? 'block' : 'none' }}>
            <RiProductHuntLine size={35} style={{cursor: 'pointer'}} onClick={() => navigate("/")} />
          </div>
          <div className="bars" style={{marginLeft: isOpen ? '100px' : '0px'}} onClick={ () => setIsOpen(!isOpen) }>
            <HiMenuAlt3 style={{cursor: 'pointer'}} />
          </div>
        </div>
        {menu.map((item, idx) => {
          return <SidebarItem key={idx} item={item} isOpen={isOpen} />
        })}
      </div>
      <main style={{ paddingLeft: isOpen ? "230px" : "60px", transition: "all .5s", }}>
        {children}
      </main>
    </div>
  )
};

export default Sidebar;
