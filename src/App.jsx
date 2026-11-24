import { useEffect, useMemo, useState } from 'react'
import ProductCard from './components/ProductCard.jsx'
import SearchBar from './components/SearchBar.jsx'
import products from './data/products.js'

function App() {
  // Lab 3 cart state is retained.
  const [cartCount, setCartCount] = useState(0)
  const [lastAdded, setLastAdded] = useState('')

  // Lab 4 controlled search and filter state.
  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortOrder, setSortOrder] = useState('default')

  // Wait 300ms after the user stops typing before filtering.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchText])

  // Derive filtered and sorted products without changing the source array.
  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase()

    let result = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(normalizedSearch)
      const matchesCategory = category === 'All' || product.category === category
      return matchesSearch && matchesCategory
    })

    if (sortOrder === 'low-to-high') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'high-to-low') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    return result
  }, [debouncedSearch, category, sortOrder])

  // Keep the browser tab title synchronized with the current result count.
  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`
  }, [filteredProducts.length])

  function handleAddToCart(productTitle) {
    setCartCount((currentCount) => currentCount + 1)
    setLastAdded(productTitle)
  }

  function handleClearFilters() {
    setSearchText('')
    setDebouncedSearch('')
    setCategory('All')
    setSortOrder('default')
  }

  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="site-header__brand">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>CvSU <strong>Mini Store</strong></span>
        </div>
        <span className="header-tagline">Simple finds. Smart choices.</span>
      </header>

      <section className="hero">
        <p className="eyebrow">WELCOME TO OUR STORE</p>
        <h1>Find what you need.</h1>
        <p className="hero__description">
          Browse our collection of everyday essentials, school supplies, and tech accessories.
        </p>
      </section>

      <section className="cart-summary" aria-live="polite">
        <div className="cart-summary__icon" aria-hidden="true">🛒</div>
        <div>
          {cartCount === 0 ? (
            <>
              <p className="cart-summary__title">Your cart is empty.</p>
              <p className="cart-summary__detail">Add an in-stock item to get started.</p>
            </>
          ) : (
            <>
              <p className="cart-summary__title">Items added to cart: {cartCount}</p>
              <p className="cart-summary__detail">Last added: {lastAdded}</p>
            </>
          )}
        </div>
        <span className="cart-count">{cartCount}</span>
      </section>

      <section className="catalog-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR COLLECTION</p>
            <h2>Featured Products</h2>
          </div>
          <span className="product-count">{products.length} products</span>
        </div>

        <SearchBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onClearFilters={handleClearFilters}
        />

        <p className="results-count" aria-live="polite">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                category={product.category}
                inStock={product.inStock}
                onAddToCart={handleAddToCart}
              >
                {product.id === 1 && <span>Best Seller</span>}
                {product.id === 5 && <span>New</span>}
              </ProductCard>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon" aria-hidden="true">🔎</div>
            <h3>No products found.</h3>
            <p>Try a different keyword or category.</p>
            <button className="clear-button" type="button" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} CvSU Mini Store</p>
        <p>Built with React useState, useEffect, and reusable components.</p>
      </footer>
    </main>
  )
}

export default App
