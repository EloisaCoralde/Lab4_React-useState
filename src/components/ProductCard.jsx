import './ProductCard.css'

function ProductCard({
  title,
  price,
  category = 'General',
  inStock,
  onAddToCart,
  children,
}) {
  const formattedPrice = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)

  return (
    <article className={`product-card ${inStock ? '' : 'product-card--out-of-stock'}`}>
      <div className="product-card__topline">
        <span className="product-card__category">{category}</span>
        {children && <div className="product-card__badge">{children}</div>}
      </div>

      <div className="product-card__icon" aria-hidden="true">
        {category === 'Books' ? '📚' : category === 'School Supplies' ? '✏️' : category === 'Accessories' ? '🎒' : '🛍️'}
      </div>

      <h2 className="product-card__title">{title}</h2>
      <p className="product-card__price">{formattedPrice}</p>

      <div className="product-card__footer">
        <span className={`stock-status ${inStock ? 'stock-status--in' : 'stock-status--out'}`}>
          <span className="stock-status__dot" />
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
        <button
          className="add-button"
          type="button"
          disabled={!inStock}
          onClick={() => onAddToCart(title)}
        >
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
