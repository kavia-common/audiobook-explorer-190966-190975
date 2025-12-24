import React from 'react';

const SearchAndFilters = ({ query, setQuery, category, setCategory, sort, setSort }) => {
  return (
    <div className="surface p-4 mb-4">
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
        <input
          className="input"
          type="search"
          placeholder="Search audiobooks..."
          aria-label="Search audiobooks"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Self-Help">Self-Help</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Wellness">Wellness</option>
        </select>
        <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilters;
