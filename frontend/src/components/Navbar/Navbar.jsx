import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/Storecontext";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import axios from "axios";

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const { redirectToSignIn, redirectToSignUp } = useClerk();
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const [menu, setMenu] = useState("home");
    const [role, setRole] = useState("admin"); //tinggal di ubah2 aja gimana ini di frontend nya

    useEffect(() => {
        const syncProfile = async () => {
            try {
                if (role === "user") {
                    await axios.post("https://cdefilkom.up.railway.app/user", {
                        id: user.id,
                        username: user.username,
                    });
                    console.log(user.id ? user.id : "tidak ada id");
                    console.log(
                        user.username ? user.username : "tidak ada username"
                    );
                } else {
                    await axios.post("https://cdefilkom.up.railway.app/admin", {
                        id: user.id,
                        username: user.username,
                    });
                    console.log(user.id ? user.id : "tidak ada id");
                    console.log(
                        user.username ? user.username : "tidak ada username"
                    );
                }
            } catch (err) {
                console.error("Gagal sinkron:", err);
            }
        };

        if (user) {
            syncProfile();
        }
    }, [isSignedIn, user]);

    const handleScroll = (id) => {
        setMenu(id);
        const target = document.getElementById(id);

        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleLogoClick = () => {
        navigate("/");
        setMenu("home");
    };

    const { getTotalCartAmount } = useContext(StoreContext);

    return (
        <div className="navbar">
            <img
                src={assets.logo}
                alt=""
                className="logo"
                onClick={handleLogoClick}
                style={{ cursor: "pointer" }}
            />
            <ul className="navbar-menu">
                <li
                    onClick={() => handleScroll("navbar")}
                    className={menu === "home" ? "active" : ""}
                >
                    Home
                </li>
                <li
                    onClick={() => handleScroll("food-display")}
                    className={menu === "menu" ? "active" : ""}
                >
                    Menu
                </li>
                <li
                    onClick={() => handleScroll("app-download")}
                    className={menu === "mobile-app" ? "active" : ""}
                >
                    Mobile App
                </li>
                <li
                    onClick={() => handleScroll("footer")}
                    className={menu === "contact-us" ? "active" : ""}
                >
                    Hubungi Kami
                </li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to="/cart">
                        {" "}
                        <img src={assets.basket_icon} alt="" />
                    </Link>
                    <div
                        className={getTotalCartAmount() === 0 ? "" : "dot"}
                    ></div>
                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                        <>
                            <button
                                onClick={() =>
                                    redirectToSignIn({
                                        redirectUrl: "/",
                                    })
                                }
                            >
                                Masuk
                            </button>
                            <button
                                onClick={() =>
                                    redirectToSignUp({
                                        redirectUrl: "/",
                                    })
                                }
                            >
                                Daftar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
