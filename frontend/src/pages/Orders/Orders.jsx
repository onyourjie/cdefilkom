import { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../context/Storecontext";
import { toast } from "react-toastify";
import './Orders.css';

const Orders = () => {
  const { user } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevStatusMap, setPrevStatusMap] = useState({});

  const fetchOrders = async () => {
    if (!user || !user.id) return;

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://cdefilkom.up.railway.app";
      const res = await fetch(`${apiBaseUrl}/order/${user.id}`);
      if (!res.ok) {
        const err = await res.json();
        console.error("❌ Gagal ambil pesanan:", err);
        return;
      }

      const data = await res.json();
      const newOrders = Array.isArray(data) ? data : data?.id ? [data] : [];

      newOrders.forEach((order) => {
        if (prevStatusMap[order.id] === false && order.status === true) {
          toast.success(`✅ Pesanan ${order.id} telah selesai!`);
        }
      });

      const newStatusMap = {};
      newOrders.forEach((order) => {
        newStatusMap[order.id] = order.status;
      });

      setPrevStatusMap(newStatusMap);
      setOrders(newOrders);
    } catch (error) {
      console.error("❌ Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // 🔁 Polling otomatis setiap 10 detik
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleRefresh = () => {
    setLoading(true);
    setOrders([]);
    fetchOrders();
  };

  if (!user || !user.id) {
    return <p>⚠️ Silakan login untuk melihat pesanan Anda.</p>;
  }

  return (
    <div className="orders-page">
      <h2>Status Pesanan Kamu</h2>
      <button onClick={handleRefresh} style={{ marginBottom: "1rem" }}>
        🔄 Lihat Status Terbaru
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>Belum ada pesanan.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} style={{ marginBottom: "1rem" }}>
              <p><strong>ID Pesanan:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status ? "✅ Selesai" : "⏳ Belum Selesai"}</p>
              <p><strong>Jumlah Produk:</strong> {order.jumlahProduk}</p>
              <p><strong>Produk:</strong>{" "}
                {Array.isArray(order.pesananProduk)
                  ? order.pesananProduk.map((p) => p?.produk?.nama).join(", ")
                  : "Tidak ada produk"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
