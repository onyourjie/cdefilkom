import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = () => {
    fetch('https://cdefilkom.up.railway.app/order/')
      .then(res => res.json())
      .then(data => {
        console.log('📥 Orders fetched:', data);
        setOrders(data);
      })
      .catch(err => console.error('❌ Gagal ambil data pesanan:', err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleClickUbah = (order) => {
    console.log('🧾 Order dipilih:', order);
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowModal(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedOrder?.id) {
      console.error('❌ ID pesanan tidak valid');
      return;
    }

    // ✅ Hindari kirim PATCH kalau status tidak berubah
    if (selectedOrder.status === newStatus) {
      alert('Status tidak berubah.');
      return;
    }

    const url = `https://cdefilkom.up.railway.app/order/${selectedOrder.id}`;
    console.log('🔁 TRY PATCH:', url);

    try {
      setLoading(true);
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const responseText = await res.text();
      console.log('📦 Response body:', responseText);

      if (res.ok) {
        setShowModal(false);
        fetchOrders(); // Refresh setelah update
      } else {
        console.error('❌ Gagal simpan status:', responseText);
      }
    } catch (err) {
      console.error('❌ ERROR saat update status:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="orders-container">
      <h2>Daftar Pesanan</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Pembeli ID</th>
            <th>Jumlah</th>
            <th>Status</th>
            <th>Produk</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id || index}>
              <td>{index + 1}</td>
              <td>{order.pembeliId || '-'}</td>
              <td>{order.jumlahProduk || '-'}</td>
              <td>{order.status ? '✅ Selesai' : '❌ Belum'}</td>
              <td>
                <ul>
                  {(order.pesananProduk || []).map((p, i) => (
                    <li key={i}>{p.produk?.nama || 'Produk tidak ditemukan'}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => handleClickUbah(order)}>Ubah Status</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Ubah Status Pesanan</h3>
            <label>
              <input
                type="checkbox"
                checked={newStatus}
                onChange={(e) => setNewStatus(e.target.checked)}
              />{' '}
              Tandai sebagai selesai
            </label>
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={handleSaveStatus}
                disabled={loading || selectedOrder?.status === newStatus}
              >
                {loading ? '⏳ Menyimpan...' : '💾 Simpan'}
              </button>
              <button onClick={() => setShowModal(false)}>❌ Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
