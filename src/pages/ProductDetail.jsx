import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';

export default function ProductDetail() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <p style={{ textAlign: 'center' }}>Produk tidak ditemukan.</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          padding: '0.6rem 1.1rem',
          background: '#27AE60',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.95rem',
        }}
      >
        ← Kembali
      </button>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', paddingTop: '4rem' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} 
          />
        </div>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '1.4rem', lineHeight: '1.7', marginTop: 0 }}>
            {product.title}
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem', fontStyle: 'italic' }}>
            Kategori: {product.category}
          </p>
          <h2 style={{ color: '#27AE60' }}>${product.price.toFixed(2)}</h2>
          <p style={{ lineHeight: '1.6', margin: '1.5rem 0' }}>
            {product.description}
          </p>
          
          <button 
            onClick={() => addItem(product)}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}