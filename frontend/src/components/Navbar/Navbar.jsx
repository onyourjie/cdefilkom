import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/Storecontext';

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  const handleScroll = (id) => {
    setMenu(id);
    const target = document.getElementById(id);
    
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    setMenu('home');
  };

  const{getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className='navbar'>
      <img 
        src={assets.logo} 
        alt="" 
        className='logo' 
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }} 
      />
      <ul className='navbar-menu'>
        <li
          onClick={() => handleScroll('navbar')}
          className={menu === 'home' ? 'active' : ''}
        >
          Home
        </li>
        <li
          onClick={() => handleScroll('food-display')}
          className={menu === 'menu' ? 'active' : ''}
        >
          Menu
        </li>
        <li
          onClick={() => handleScroll('app-download')}
          className={menu === 'mobile-app' ? 'active' : ''}
        >
          Mobile App
        </li>
        <li
          onClick={() => handleScroll('footer')}
          className={menu === 'contact-us' ? 'active' : ''}
        >
          Hubungi Kami
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <Link to = '/cart'> <img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
          <button onClick={()=>setShowLogin(true)}>Masuk</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;