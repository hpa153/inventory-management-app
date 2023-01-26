import React, { useState } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

import { sidebarType } from '../../../data/sidebar';

const activeLink = ({isActive}: {isActive: boolean}) => (isActive ? "active" : "link");
const activeSublink = ({isActive}: {isActive: boolean}) => (isActive ? "active" : "link");

const SidebarItem = ({item, isOpen}: {item: sidebarType, isOpen: boolean}) => {
  const [menuExpanded, setMenuExpanded] = useState<boolean>(false);

  if(item.childrens) {
    return (
      <div className={menuExpanded ? 'sidebar-item s-parent open' : 'sidebar-item s-parent'}>
        <div className="sidebar-title">
          <span>
            {item.icon && 
              <div className="icon">{item.icon}</div>
            }
            {isOpen &&
              <div>{item.title}</div>
            }
          </span>
          <MdKeyboardArrowRight 
            size={25} 
            className='arraw-icon' 
            onClick={() => setMenuExpanded(!menuExpanded)} 
          />
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, idx) => {
            return (
              <div className="s-child" key={idx}>
                <NavLink to={child.path} className={activeSublink}>
                  <div className="sidebar-item">
                    <div className="sidebar-title">
                      {child.title}
                    </div>
                  </div>
                </NavLink>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <NavLink to={item.path!} className={activeLink}>
      <div className="sidebar-item s-parent">
        <div className="sidebar-title">
          <span>
            {item.icon && 
              <div className="icon">{item.icon}</div>
            }
            {isOpen &&
              <div>{item.title}</div>
            }
          </span>
        </div>
      </div>
    </NavLink>
  )
};

export default SidebarItem;
