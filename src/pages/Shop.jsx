import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/Filtersidebar.jsx';
import { LUXURY_WATCHES, PRICE_RANGES } from '../data/products';

const Shop = () => {
  const [filters, setFilters] = useState({
    brand: 'All',
    collection: 'All',
    priceRange: 'All',
    inStockOnly: false,
  });

  const [sortBy, setSortBy] = useState('featured');

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'reset') {
      setFilters({
        brand: 'All',
        collection: 'All',
        priceRange: 'All',
        inStockOnly: false,
      });
      return;
    }
    
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredProducts = useMemo(() => {
    let result = [...LUXURY_WATCHES];

    // Apply brand filter
    if (filters.brand !== 'All') {
      result = result.filter(product => product.brand === filters.brand);
    }

    // Apply collection filter
    if (filters.collection !== 'All') {
      result = result.filter(product => product.collection === filters.collection);
    }

    // Apply price range filter
    if (filters.priceRange !== 'All') {
      const range = PRICE_RANGES.find(r => r.label === filters.priceRange);
      result = result.filter(product => 
        product.price >= range.min && product.price <= range.max
      );
    }

    // Apply in stock filter
    if (filters.inStockOnly) {
      result = result.filter(product => product.inStock);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.model.localeCompare(b.model));
        break;
      default:
        // 'featured' - keep original order
        break;
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <h1>Luxury Timepieces</h1>
        <p>Discover our curated collection of exceptional watches</p>
      </div>

      <div className="shop-container">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        
        <div className="shop-content">
          <div className="shop-toolbar">
            <div className="results-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'watch' : 'watches'}
            </div>
            
            <div className="sort-controls">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <h3>No watches found</h3>
              <p>Try adjusting your filters</p>
              <button onClick={() => handleFilterChange('reset')} className="btn-primary">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;

