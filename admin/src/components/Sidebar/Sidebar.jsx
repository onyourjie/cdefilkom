import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="hamburger" onClick={() => setShowSidebar(!showSidebar)}>
        ☰
      </div>

      <div className={`sidebar ${showSidebar ? 'active' : ''}`}>
        <NavLink to="/add" className="sidebar-option" onClick={() => setShowSidebar(false)}>
          <img src={assets.add_icon} alt="" />
          <p>Tambah Item</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option" onClick={() => setShowSidebar(false)}>
          <img src={assets.order_icon} alt="" />
          <p>List Item</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option" onClick={() => setShowSidebar(false)}>
          <img src={assets.order_icon} alt="" />
          <p>Pesanan</p>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
