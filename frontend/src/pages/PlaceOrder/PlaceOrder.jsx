import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/Storecontext';
import { assets } from '../../assets/assets';
import qrisImage from '/qris.jpg';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [showQRIS, setShowQRIS] = useState(false);

  const handlePaymentProcess = (e) => {
    e.preventDefault(); 
    setShowQRIS(true); 
  };

  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Informasi Pemesanan</p>
        <div className='multi-field'>
          <input type='text' placeholder='Nama Depan' />
          <input type='text' placeholder='Nama Belakang' />
        </div>
        <input type='email' placeholder='Alamat Email' />
        <input type='text' placeholder='Jalan' />
        <div className='multi-fields'>
          <input type='text' placeholder='Kota' />
          <input type='text' placeholder='Provinsi' />
        </div>
        <div className='multifields'>
          <input type='text' placeholder='Kode Pos' />
          <input type='text' placeholder='Country' />
        </div>
        <input type='text' placeholder='Telepon' />
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 10000}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10000}</b>
            </div>
          </div>
          <button onClick={handlePaymentProcess}>Proses Pembayaran</button>
        </div>
      </div>

      {showQRIS && (
        <div className='qris-modal'>
          <div className='qris-content'>
          <img src={qrisImage} alt="kode qris" />
            <p>Bayar menggunakan kode QRIS ini.</p>
            <button className='close-button' onClick={() => setShowQRIS(false)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default PlaceOrder;
