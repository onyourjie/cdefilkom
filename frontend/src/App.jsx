import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Orders from "./pages/Orders/Orders";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}

            <div className="app">
                <Routes>
                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />

                    {/* Client Routes dengan navbar */}
                    <Route
                        path="/*"
                        element={
                            <>
                                <Navbar />
                                <Routes>
                                    {/* Client Home */}
                                    <Route path="/" element={<Home />} />
                                    <Route path="/client" element={<Navigate to="/" replace />} />
                                    <Route path="/client/home" element={<Home />} />
                                    
                                    {/* Client Cart & Order */}
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/client/cart" element={<Cart />} />
                                    
                                    <Route 
                                        path="/order" 
                                        element={
                                            <ProtectedRoute requiredRole="user">
                                                <PlaceOrder />
                                            </ProtectedRoute>
                                        } 
                                    />
                                    <Route 
                                        path="/client/order" 
                                        element={
                                            <ProtectedRoute requiredRole="user">
                                                <PlaceOrder />
                                            </ProtectedRoute>
                                        } 
                                    />
                                    
                                    {/* Client Orders History */}
                                    <Route 
                                        path="/orders" 
                                        element={
                                            <ProtectedRoute requiredRole="user">
                                                <Orders />
                                            </ProtectedRoute>
                                        } 
                                    />
                                    <Route 
                                        path="/client/orders" 
                                        element={
                                            <ProtectedRoute requiredRole="user">
                                                <Orders />
                                            </ProtectedRoute>
                                        } 
                                    />
                                </Routes>
                            </>
                        }
                    />
                </Routes>
            </div>

            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default App;
