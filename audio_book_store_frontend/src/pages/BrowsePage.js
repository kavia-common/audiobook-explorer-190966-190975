import React, { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../api/client';
import SearchAndFilters from '../components/filters/SearchAndFilters';
import AudiobookGrid from '../components/audiobooks/AudiobookGrid';
import Pagination from '../components/ui/Pagination';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const PAGE_SIZE = 8;

const BrowsePage = () => {
  const [loading, setLoading] = useState(true);
  const [allBooks, setAllBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);

  const { add } = useCart();
  const { showToast } = useUser();

  useEffect(() => {
    setLoading(true);
    apiGet('/audiobooks')
      .then((res) => setAllBooks(res.items || []))
      .catch(() => setAllBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let items = allBooks.slice();
    if (query) {
      const q = query.toLowerCase();
      items = items.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    if (category) {
      items = items.filter((b) => b.category === category);
    }
    switch (sort) {
      case 'price-asc': items.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case 'price-desc': items.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      case 'title-asc': items.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'title-desc': items.sort((a, b) => b.title.localeCompare(a.title)); break;
      default: break;
    }
    return items;
  }, [allBooks, query, category, sort]);

  const total = filtered.length;
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    setPage(1); // reset page on filters change
  }, [query, category, sort]);

  return (
    <div className="container">
      <h1 style={{ marginBottom: 8 }}>Browse Audiobooks</h1>
      <p style={{ color: '#6b7280', marginTop: 0 }}>Discover your next listen with crisp previews.</p>

      <SearchAndFilters
        query={query} setQuery={setQuery}
        category={category} setCategory={setCategory}
        sort={sort} setSort={setSort}
      />

      {loading ? (
        <div className="grid cards">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="surface p-4">
              <div className="skeleton" style={{ height: 180 }} />
              <div className="skeleton mt-3" style={{ height: 18, width: '70%' }} />
              <div className="skeleton mt-2" style={{ height: 14, width: '40%' }} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <AudiobookGrid
            books={pageItems}
            onAddToCart={(book) => {
              add(book);
              showToast('Added to cart');
            }}
          />
          <Pagination page={page} setPage={setPage} total={total} pageSize={PAGE_SIZE} />
        </>
      )}
    </div>
  );
};

export default BrowsePage;
