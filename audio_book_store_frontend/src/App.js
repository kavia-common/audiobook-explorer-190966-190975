import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/theme.css';
import './styles/util.css';
import { CartProvider } from './context/CartContext';
import { PlayerProvider } from './context/PlayerContext';
import { UserProvider } from './context/UserContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MiniPlayer from './components/player/MiniPlayer';
import Toast from './components/ui/Toast';
import BrowsePage from './pages/BrowsePage';
import BookDetailsPage from './pages/BookDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PurchasesPage from './pages/PurchasesPage';
import NotFoundPage from './pages/NotFoundPage';

// PUBLIC_INTERFACE
function App() {
  /** App entrypoint that sets up providers, routing, and persistent layout. */
  return (
    <UserProvider>
      <CartProvider>
        <PlayerProvider>
          <BrowserRouter>
            <div className="app-shell">
              <Header />
              <main className="main-content" role="main">
                <Routes>
                  <Route path="/" element={<BrowsePage />} />
                  <Route path="/book/:id" element={<BookDetailsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/purchases" element={<PurchasesPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <MiniPlayer />
              <Toast />
            </div>
          </BrowserRouter>
        </PlayerProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
