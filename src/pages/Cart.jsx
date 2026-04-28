import { useCart } from '../context/CartContext';
export default function Cart() {
const { items, totalPrice, incrementItem, decrementItem, removeItem, clearCart } = useCart();
if (items.length === 0) {
return (
<div style={{ textAlign: 'center', padding: '3rem' }}>
<h2>Keranjang Kosong</h2>
<p>Belum ada produk di keranjang Anda.</p>
</div>
);
}
return (
<div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
<h2>Keranjang Belanja</h2>
{items.map((item) => (
<div key={item.id} style={{
display: 'flex', alignItems: 'center', gap: '1rem',
padding: '1rem', borderBottom: '1px solid #eee',
}}>
<img src={item.image} alt={item.title}
style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
<div style={{ flex: 1 }}>
<h4 style={{ margin: '0 0 0.25rem' }}>{item.title}</h4>
<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
<button
onClick={() => decrementItem(item.id)}
style={{
width: '32px',
height: '32px',
borderRadius: '4px',
border: 'none',
background: '#EBF5FB',
color: '#1B4F72',
cursor: 'pointer',
fontSize: '1.1rem',
fontWeight: 'bold',
}}
>
-
</button>
<p style={{ margin: 0, color: '#666' }}>
Qty: {item.quantity}
</p>
<button
onClick={() => incrementItem(item.id)}
style={{
width: '32px',
height: '32px',
borderRadius: '4px',
border: 'none',
background: '#27AE60',
color: 'white',
cursor: 'pointer',
fontSize: '1.1rem',
fontWeight: 'bold',
}}
>
+
</button>
</div>
</div>
<p style={{ fontWeight: 'bold' }}>
${(item.price * item.quantity).toFixed(2)}
</p>
<button onClick={() => removeItem(item.id)}
style={{ background: '#e74c3c', color: 'white',
border: 'none', padding: '0.5rem', borderRadius: '4px',
cursor: 'pointer' }}>
Hapus
</button>
</div>
))}
<div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
<h3>Total: ${totalPrice.toFixed(2)}</h3>
<button onClick={clearCart} style={{
padding: '0.75rem 2rem', background: '#27AE60',
color: 'white', border: 'none', borderRadius: '4px',
fontSize: '1rem', cursor: 'pointer',
}}>
Checkout
</button>
</div>
</div>
);
}