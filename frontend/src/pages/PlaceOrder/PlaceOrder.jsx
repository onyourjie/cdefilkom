import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/Storecontext";
import QRCode from "qrcode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
    const { getTotalCartAmount } = useContext(StoreContext);

    const [showQRIS, setShowQRIS] = useState(false);
    const [qrcode, setQrcode] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        namaDepan: "",
        namaBelakang: "",
        email: "",
        jalan: "",
        kota: "",
        provinsi: "",
        kodepos: "",
        country: "",
        telepon: "",
        total: 0,
    });

    const generateQRCode = () => {
        const dataString = JSON.stringify(formData);
        QRCode.toDataURL(
            dataString,
            { width: 300, margin: 2, errorCorrectionLevel: "H" },
            (err, url) => {
                if (err) return console.error(err);
                setQrcode(url);
            }
        );
    };

    const handlePaymentProcess = (e) => {
        e.preventDefault();
        setShowQRIS(true);
        generateQRCode();
    };

    const handlePaymentDone = (e) => {
        e.preventDefault();
        setShowQRIS(false);
        toast.success("Pembayaran berhasil");
        navigate("/");
        //store database
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <>
            <form onSubmit={handlePaymentProcess} className="place-order">
                <div className="place-order-left">
                    <p className="title">Informasi Pemesanan</p>
                    <div className="multi-field">
                        <input
                            type="text"
                            placeholder="Nama Depan"
                            name="namaDepan"
                            value={formData.namaDepan}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Nama Belakang"
                            name="namaBelakang"
                            value={formData.namaBelakang}
                            onChange={handleChange}
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Alamat Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Jalan"
                        name="jalan"
                        value={formData.jalan}
                        onChange={handleChange}
                    />
                    <div className="multi-fields">
                        <input
                            type="text"
                            placeholder="Kota"
                            name="kota"
                            value={formData.kota}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="provinsi"
                            name="provinsi"
                            value={formData.provinsi}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="multifields">
                        <input
                            type="text"
                            placeholder="kode Pos"
                            name="kodepos"
                            value={formData.kodepos}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="telepon"
                        name="telepon"
                        value={formData.telepon}
                        onChange={handleChange}
                    />
                </div>
                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>{getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>{getTotalCartAmount() === 0 ? 0 : 10000}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>
                                    {getTotalCartAmount() === 0
                                        ? 0
                                        : getTotalCartAmount() + 10000}
                                </b>
                            </div>
                        </div>
                        <button type="submit">Proses Pembayaran</button>
                    </div>
                </div>
            </form>
            {qrcode && showQRIS ? (
                <div className="qris-modal">
                    <div className="qris-content">
                        <img src={qrcode} alt="Generated QR Code" />
                        <span>Bayar menggunakan kode QRIS ini.</span>
                        <a href={qrcode} download="qrcode.png">
                            Download QR Code
                        </a>
                        <button
                            className="close-button"
                            onClick={() => setShowQRIS(false)}
                        >
                            &times;
                        </button>
                        <button onClick={handlePaymentDone}>
                            Konfirmasi Pembayaran
                        </button>
                    </div>
                </div>
            ) : null}
            {/* {showQRIS && (
                <div className="qris-modal">
                    <div className="qris-content">
                        <img src={qrisImage} alt="kode qris" />
                        <p>Bayar menggunakan kode QRIS ini.</p>
                        <button
                            className="close-button"
                            onClick={() => setShowQRIS(false)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )} */}
        </>
    );
};

export default PlaceOrder;
