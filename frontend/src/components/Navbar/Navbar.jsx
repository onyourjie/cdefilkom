import { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/Storecontext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalCartAmount } = useContext(StoreContext);
  const { setUser: setAuthUser, logout, user, role } = useAuthStore();

  const [menu, setMenu] = useState("home");
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Detect apakah user di route client atau admin
  const isClientRoute = !location.pathname.startsWith("/admin");

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          id: firebaseUser.uid,
          username: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
          email: firebaseUser.email,
          role: isClientRoute ? 'user' : 'admin', // Set role based on route
        };
        setAuthUser(userData);
        setIsSignedIn(true);
      } else {
        logout();
        setIsSignedIn(false);
      }
    });

    return unsubscribe;
  }, [setAuthUser, logout, isClientRoute]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      toast.success("Logout berhasil");
      navigate("/");
    } catch (error) {
      toast.error("Gagal logout: " + error.message);
    }
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleScroll = (id) => {
    setMenu(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="navbar">
      <img
        src={assets.logo}
        alt=""
        className="logo"
        onClick={() => {
          navigate("/");
          setMenu("home");
        }}
        style={{ cursor: "pointer" }}
      />
      <ul className="navbar-menu">
        <li onClick={() => handleScroll("navbar")} className={menu === "home" ? "active" : ""}>Home</li>
        <li onClick={() => handleScroll("food-display")} className={menu === "menu" ? "active" : ""}>Menu</li>
        <li onClick={() => handleScroll("app-download")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</li>
        <li onClick={() => handleScroll("footer")} className={menu === "contact-us" ? "active" : ""}>Hubungi Kami</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          
          {isSignedIn && user ? (
            <div className="navbar-user-section">
              <span className="navbar-user-info">
                <span className="navbar-username">{user.username}</span>
                <span className={`navbar-role role-${role}`}>{role}</span>
              </span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <>
              <button onClick={handleSignIn}>Masuk</button>
              <button onClick={handleSignUp}>Daftar</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
