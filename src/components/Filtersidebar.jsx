import React from 'react';
import { BRANDS, COLLECTIONS, PRICE_RANGES } from '../data/products';

const FilterSidebar = ({ filters, onFilterChange }) => {
  return (
    <aside className="filter-sidebar">
      <h3>Refine Selection</h3>
      
      <div className="filter-section">
        <h4>Brand</h4>
        <div className="filter-options">
          {BRANDS.map(brand => (
            <label key={brand} className="filter-option">
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={filters.brand === brand}
                onChange={(e) => onFilterChange('brand', e.target.value)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Collection</h4>
        <div className="filter-options">
          {COLLECTIONS.map(collection => (
            <label key={collection} className="filter-option">
              <input
                type="radio"
                name="collection"
                value={collection}
                checked={filters.collection === collection}
                onChange={(e) => onFilterChange('collection', e.target.value)}
              />
              <span>{collection}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="filter-options">
          {PRICE_RANGES.map(range => (
            <label key={range.label} className="filter-option">
              <input
                type="radio"
                name="priceRange"
                value={range.label}
                checked={filters.priceRange === range.label}
                onChange={(e) => onFilterChange('priceRange', e.target.value)}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-option checkbox-option">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
          />
          <span>In Stock Only</span>
        </label>
      </div>

      <button 
        className="reset-filters-btn"
        onClick={() => onFilterChange('reset')}
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
