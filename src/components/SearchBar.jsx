export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label
        htmlFor="product-search"
        style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}
      >
        Cari produk
      </label>
      <input
        id="product-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari berdasarkan nama produk..."
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '0.75rem 1rem',
          border: '1px solid #d0d7de',
          borderRadius: '10px',
          fontSize: '1rem',
          outline: 'none',
        }}
      />
    </div>
  );
}