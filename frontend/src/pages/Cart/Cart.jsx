import { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/Storecontext";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
        useContext(StoreContext);
    const { isAuthenticated } = useAuthStore();
    const [promo, setPromo] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("pickup"); 
    const navigate = useNavigate();

    const handlePesanan = () => {
        if (isAuthenticated) {
            navigate("/order");
        } else {
            toast.warning("Anda harus login terlebih dahulu !!!");
            navigate("/login");
        }
    };

    const deliveryFee = deliveryMethod === "delivery" && getTotalCartAmount() > 0 ? 10000 : 0;
    const totalAmount = getTotalCartAmount() + deliveryFee;

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>{item.price * cartItems[item._id]}</p>
                                    <p
                                        onClick={() => removeFromCart(item._id)}
                                        className="cross"
                                    >
                                        x
                                    </p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>

                    {/* metode pengiriman */}
                    <div className="delivery-method">
                        <p>Pilih metode pengantaran:</p>
                        <label>
                            <input
                                type="radio"
                                value="pickup"
                                checked={deliveryMethod === "pickup"}
                                onChange={() => setDeliveryMethod("pickup")}
                            />
                            Pick Up (Gratis)
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                value="delivery"
                                checked={deliveryMethod === "delivery"}
                                onChange={() => setDeliveryMethod("delivery")}
                            />
                            Diantar (+Rp 10.000)
                        </label>
                    </div>

                    <br />
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{deliveryFee}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>{totalAmount}</b>
                        </div>
                    </div>
                    <button onClick={handlePesanan}>
                        Lanjutkan ke Pembayaran
                    </button>
                </div>

                <div className="cart-promocode">
                    <div>
                        <p>Jika Anda memiliki kode promo, masukkan di sini.</p>
                        <div className="cart-promocode-input">
                            <input
                                type="text"
                                placeholder="promocode"
                                name="promo"
                                value={promo}
                                onChange={(e) => setPromo(e.target.value)}
                            />
                            <button>Kirim</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
