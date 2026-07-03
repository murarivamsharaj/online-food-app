import React, { useState } from 'react';
import { menuItems } from './data';
import type { FoodItem, CartItem } from './types';
import './App.css';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'home' | 'all' | 'veg' | 'non-veg'>('home');

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(price * 82);

  const addToCart = (item: FoodItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const vegItems = menuItems.filter((item) => item.category === 'veg');
  const nonVegItems = menuItems.filter((item) => item.category === 'non-veg');

  const renderMenu = (title: string, items: FoodItem[]) => (
    <section className="menu-section">
      <h2 className="section-title">{title}</h2>
      <div className="grid-container">
        {items.map((item) => (
          <div className="food-card" key={item.id}>
            <div className="img-container">
              <img src={item.image} alt={item.name} className="food-img" />
              <span className={`badge ${item.category}`}>{item.category}</span>
            </div>
            <div className="food-info">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <div className="card-footer">
                <span className="price">{formatPrice(item.price)}</span>
                <button className="add-btn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderHome = () => (
    <section className="home-hero">
      <div className="hero-copy">
        <h2>Welcome to FoodieFi</h2>
        <p>Browse our menu by selecting Home, Show All, Veg, or Non-Veg from the navbar above.</p>
      </div>
    </section>
  );

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <h1 className="logo">FoodieFi</h1>
        <div className="nav-buttons">
          <button
            className={`nav-btn ${selectedCategory === 'home' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('home')}
          >
            Home
          </button>
          <button
            className={`nav-btn ${selectedCategory === 'veg' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('veg')}
          >
            Veg
          </button>
          <button
            className={`nav-btn ${selectedCategory === 'non-veg' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('non-veg')}
          >
            Non-Veg
          </button>
        </div>
        <button className="cart-toggle" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 Cart <span className="cart-count">{totalItems}</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {selectedCategory === 'home' && renderHome()}
        {(selectedCategory === 'all' || selectedCategory === 'veg') && renderMenu('Vegetarian Delights 🌱', vegItems)}
        {(selectedCategory === 'all' || selectedCategory === 'non-veg') && renderMenu('Non-Vegetarian Specials 🍗', nonVegItems)}

        {(selectedCategory === 'all' || selectedCategory === 'veg' || selectedCategory === 'non-veg') && (
          <div className="show-all-wrapper">
            <button className="show-all-btn" onClick={() => setSelectedCategory('all')}>
              Show All
            </button>
          </div>
        )}
      </main>

      {/* Sliding Cart Panel */}
      <div className={`cart-panel ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Order</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>{formatPrice(item.price)} x {item.quantity}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <h3>Total: {formatPrice(totalAmount)}</h3>
            <button className="checkout-btn">Checkout</button>
          </div>
        )}
      </div>
      
      {/* Overlay for Cart */}
      {isCartOpen && <div className="overlay" onClick={() => setIsCartOpen(false)}></div>}
    </div>
  );
};

export default App;