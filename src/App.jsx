import React, { useState } from 'react';

// --- Enhanced Product Data (with Image URLs) ---
const initialProducts = [
  { id: 1, name: 'Samsung 4K Ultra|139 cm (55 inches) Metallic Bezel Less Series', category: 'Electronics', price: 349.99, rating: 4.8, imageUrl: "https://placehold.co/600x400/4F46E5/ffffff?text=Monitor" },
  { id: 2, name: 'Ergolux High Back Ergonomic Office & Study Chair | 3 Year Warranty ', category: 'Furniture', price: 199.50, rating: 4.2, imageUrl: "https://placehold.co/600x400/10B981/ffffff?text=Chair" },
  { id: 3, name: 'Noise Airwave Max 4 Wireless Over Ear Headphones with 70H Playtime,', category: 'Accessories', price: 279.00, rating: 4.9, imageUrl: "https://placehold.co/600x400/F59E0B/ffffff?text=Audio" },
  { id: 4, name: ' Dell Wired Keyboard | Full-size Layout with USB interface, Chiclet keys,  ', category: 'Accessories', price: 129.99, rating: 4.6, imageUrl: "https://placehold.co/600x400/EF4444/ffffff?text=Keyboard" },
  { id: 5, name: 'Premium Espresso Machine', category: 'Home Goods', price: 499.00, rating: 4.7, imageUrl: "https://placehold.co/600x400/6366F1/ffffff?text=Home" },
  { id: 6, name: 'Smart Watch', category: 'Electronics', price: 89.99, rating: 4.1, imageUrl: "https://placehold.co/600x400/06B6D4/ffffff?text=watch" },
  { id: 7, name: 'Computer Desk', category: 'Furniture', price: 450.00, rating: 4.5, imageUrl: "https://placehold.co/600x400/3B82F6/ffffff?text=Desk" },
  { id: 8, name: 'Noise Power Bank', category: 'Accessories', price: 45.00, rating: 4.3, imageUrl: "https://placehold.co/600x400/A855F7/ffffff?text=Power" },
  { id: 8, name: 'I Phone', category: 'Accessories', price: 45.00, rating: 4.3, imageUrl: "https://placehold.co/600x400/A855F7/ffffff?text=Phone" },
];

// Dynamically extract categories for the filter dropdown
const categories = ['All', ...new Set(initialProducts.map(p => p.category))];

function SimpleProductList() {
  // State for the three controls: search, filter, and sort
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortType, setSortType] = useState('none');
  
  // New state for controlling sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Filtering and Sorting Logic ---
  const filteredAndSortedProducts = initialProducts
    .filter(product => {
      // 1. Search Filter (checks if product name includes the search term, case-insensitive)
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      // 2. Category Filter
      if (filterCategory !== 'All' && product.category !== filterCategory) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // 3. Sorting Logic
      if (sortType === 'price-asc') {
        return a.price - b.price;
      } else if (sortType === 'price-desc') {
        return b.price - a.price;
      } else if (sortType === 'rating-desc') {
        return b.rating - a.rating;
      }
      return 0; // Maintain original order if sortType is 'none'
    });
    
    // Icon for the filter toggle button (Hamburger/X)
    const FilterIcon = (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/>
      </svg>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center lg:text-left">
          Product Catalog
        </h1>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-20 p-4 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 transition duration-300 flex items-center space-x-2"
        >
          <FilterIcon className="w-5 h-5" />
          <span>Filters</span>
        </button>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- Sidebar (Filters & Controls) --- */}
          <aside 
            className={`
              fixed lg:sticky top-0 lg:top-8 left-0 z-10 
              w-full lg:w-72 h-full lg:h-auto 
              bg-white p-6 shadow-2xl lg:shadow-xl rounded-xl 
              transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-900 text-3xl font-light">
                &times;
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Product</label>
              <input
                type="text"
                placeholder="Name or keyword..."
                className="input-style"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter (Radio Buttons) */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Filter by Category</label>
              <div className="space-y-1">
                {categories.map(category => (
                    <div key={category} className="flex items-center">
                        <input
                            type="radio"
                            id={`cat-${category}`}
                            name="category"
                            value={category}
                            checked={filterCategory === category}
                            onChange={() => {
                                setFilterCategory(category);
                                // Close sidebar on mobile after selection
                                if (window.innerWidth < 1024) setIsSidebarOpen(false);
                            }}
                            className="hidden radio-input"
                        />
                        <label 
                            htmlFor={`cat-${category}`} 
                            className="radio-label w-full"
                        >
                            {category}
                        </label>
                    </div>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort Results</label>
              <select
                className="input-style bg-white appearance-none"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="none">Default Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
              </select>
            </div>

          </aside>
          
          {/* --- Product Grid --- */}
          <section className="flex-1 min-w-0">
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="h-40 bg-gray-100 rounded-t-xl overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition duration-300 hover:scale-105"
                        // Fallback for image loading error
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/000000?text=Product+Image+Unavailable"; }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col p-6 flex-grow">
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-sm text-indigo-600 font-medium mb-4">{product.category}</p>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                            <div>
                                <p className="text-2xl font-extrabold text-green-600">${product.price.toFixed(2)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-yellow-500 font-bold">
                                    {product.rating} ★
                                </p>
                                <button className="mt-2 text-sm bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600 transition">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-10 bg-white rounded-xl shadow-md">
                <p className="text-lg text-gray-500">No products match your criteria. Try adjusting the search or filters.</p>
              </div>
            )}
          </section>
          
        </div>
      </div>
      
      {/* Mobile Overlay (to close sidebar when clicking outside) */}
      {isSidebarOpen && <div 
        className="fixed inset-0 bg-black opacity-50 z-[9] lg:hidden"
        onClick={() => setIsSidebarOpen(false)}
      ></div>}
      
    </div>
  );
}

export default SimpleProductList;