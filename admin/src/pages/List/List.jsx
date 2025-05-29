import React, { useEffect, useState } from 'react';
import './List.css';

const List = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    harga: '',
    jenis: '',
    stock: '',
    gambarFile: null
  });
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    fetch('https://cdefilkom.up.railway.app/products')
      .then(response => response.json())
      .then(data => setList(data))
      .catch(error => console.error('Gagal fetch produk:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      fetch(`https://cdefilkom.up.railway.app/products/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) fetchData();
          else console.error('Gagal hapus produk');
        });
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setFormData({
      nama: item.nama,
      harga: item.harga,
      jenis: item.jenis,
      stock: item.stock,
      gambarFile: null
    });
    setShowModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItem?.id) return;
    if (!formData.gambarFile) {
      alert("Wajib unggah gambar!");
      return;
    }

    const form = new FormData();
    form.append('nama', formData.nama);
    form.append('harga', formData.harga);
    form.append('jenis', formData.jenis);
    form.append('stock', formData.stock);
    form.append('image', formData.gambarFile);

    try {
      setLoading(true);
      const res = await fetch(`https://cdefilkom.up.railway.app/products/${selectedItem.id}`, {
        method: 'PUT',
        body: form,
      });

      if (res.ok) {
        setShowModal(false);
        fetchData();
      } else {
        const text = await res.text();
        console.error('❌ Gagal update:', text);
      }
    } catch (err) {
      console.error('❌ ERROR saat fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-container">
      <h2>Daftar Produk</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Gambar</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Jenis</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td data-label="Gambar">
                {item.gambarUrl ? (
                  <img
                    src={item.gambarUrl}
                    alt={item.nama}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                ) : (
                  <span>Tidak ada</span>
                )}
              </td>
              <td data-label="Nama">{item.nama}</td>
              <td data-label="Harga">{item.harga}</td>
              <td data-label="Jenis">{item.jenis}</td>
              <td data-label="Stok">{item.stock}</td>
              <td data-label="Aksi">
                <button onClick={() => handleDelete(item.id)}>🗑 Hapus</button>
                <button onClick={() => openModal(item)}>✏️ Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Produk</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Nama"
                required
              />
              <input
                type="number"
                value={formData.harga}
                onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                placeholder="Harga"
                required
              />
              <input
                type="text"
                value={formData.jenis}
                onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                placeholder="Jenis"
                required
              />
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="Stock"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, gambarFile: e.target.files[0] })}
                required
              />
              <div className="modal-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? '⏳ Menyimpan...' : '💾 Simpan'}
                </button>
                <button type="button" onClick={() => setShowModal(false)}>❌ Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
