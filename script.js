// Categories data
const categories = [
    { name: "Electronics", icon: "fas fa-mobile-alt", color: "hsl(221, 83%, 53%)", bg: "rgba(59, 130, 246, 0.1)" },
    { name: "Fashion", icon: "fas fa-tshirt", color: "hsl(24.6, 95%, 53.1%)", bg: "rgba(251, 146, 60, 0.1)" },
    { name: "Food & Drinks", icon: "fas fa-utensils", color: "hsl(142, 76%, 36%)", bg: "rgba(34, 197, 94, 0.1)" },
    { name: "Vehicles", icon: "fas fa-car", color: "hsl(221, 83%, 53%)", bg: "rgba(59, 130, 246, 0.1)" },
    { name: "Home & Garden", icon: "fas fa-home", color: "hsl(210, 40%, 94%)", bg: "rgba(248, 250, 252, 0.1)" },
    { name: "Art & Crafts", icon: "fas fa-palette", color: "hsl(24.6, 95%, 53.1%)", bg: "rgba(251, 146, 60, 0.1)" },
    { name: "Baby & Kids", icon: "fas fa-baby", color: "hsl(142, 76%, 36%)", bg: "rgba(34, 197, 94, 0.1)" },
    { name: "Books & Media", icon: "fas fa-book", color: "hsl(221, 83%, 53%)", bg: "rgba(59, 130, 246, 0.1)" },
];

// Products data
const mockProducts = [
    {
        id: "1",
        title: "iPhone 14 Pro Max - Excellent Condition",
        price: 8500,
        originalPrice: 9200,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
        seller: "TechDeals GH",
        location: "Accra",
        rating: 4.8,
        isVerified: true,
        isFeatured: true
    },
    {
        id: "2",
        title: "Traditional Kente Cloth - Handwoven",
        price: 450,
        image: "Traditional.jpg",
        seller: "Kofi Artisan",
        location: "Kumasi",
        rating: 4.9,
        isVerified: true
    },
    {
        id: "3",
        title: "Fresh Palm Oil ",
        price: 85,
        image: "Fresh Palm Oil.jpg",
        seller: "Farm Fresh GH",
        location: "Tema",
        rating: 4.6
    },
    {
        id: "4",
        title: "MacBook Air M2 - Like New",
        price: 6800,
        originalPrice: 7500,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
        seller: "LaptopHub",
        location: "Accra",
        rating: 4.7,
        isVerified: true
    },
    {
        id: "5",
        title: "Adinkra Symbol Art Print Set",
        price: 120,
        image: "Adinkra.jpg",
        seller: "Cultural Arts",
        location: "Cape Coast",
        rating: 4.5
    },
    {
        id: "6",
        title: "Toyota Camry 2018 - Clean Title",
        price: 45000,
        image: "Toyota Camry.jpg",
        seller: "AutoMax GH",
        location: "Accra",
        rating: 4.8,
        isVerified: true,
        isFeatured: true
    },
    {
        id: "7",
        title: "Shea Butter - Organic & Raw",
        price: 35,
        image: "Shea Butter - Organic.jpg",
        seller: "Natural Beauty",
        location: "Tamale",
        rating: 4.9
    },
    {
        id: "8",
        title: "Gaming Setup - PS5 Console + Extras",
        price: 3200,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
        seller: "GameZone GH",
        location: "Accra",
        rating: 4.6,
        isVerified: true
    }
];

// Features data
const features = [
    {
        icon: "fas fa-shield-alt",
        title: "Secure Payments",
        description: "Your money is protected with our escrow system until delivery is confirmed",
        color: "hsl(142, 76%, 36%)"
    },
    {
        icon: "fas fa-truck",
        title: "Fast Delivery",
        description: "Same-day delivery available in major cities with real-time tracking",
        color: "hsl(221, 83%, 53%)"
    },
    {
        icon: "fas fa-comments",
        title: "Direct Chat",
        description: "Communicate directly with sellers through our built-in messaging system",
        color: "hsl(24.6, 95%, 53.1%)"
    },
    {
        icon: "fas fa-star",
        title: "Verified Sellers",
        description: "All sellers are verified to ensure quality and trust in every transaction",
        color: "hsl(221, 83%, 53%)"
    },
    {
        icon: "fas fa-credit-card",
        title: "Multiple Payment Options",
        description: "Pay with mobile money, bank transfer, or cash on delivery",
        color: "hsl(210, 40%, 94%)"
    },
    {
        icon: "fas fa-map-marker-alt",
        title: "Local Focus",
        description: "Find products and services right in your neighborhood for faster delivery",
        color: "hsl(142, 76%, 36%)"
    }
];

// Render categories
function renderCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    categoriesGrid.innerHTML = categories.map(category => `
        <div class="category-card">
            <div class="category-icon" style="background-color: ${category.bg}">
                <i class="${category.icon}" style="color: ${category.color}"></i>
            </div>
            <div class="category-name">${category.name}</div>
        </div>
    `).join('');
}

// Render products
function renderProducts(products = mockProducts) {
    const productsGrid = document.getElementById('productsGrid');
    // If no products match the search, show a message
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        `;
        return;
    }
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-badges">
                    ${product.isFeatured ? '<span class="badge badge-featured">Featured</span>' : ''}
                    ${product.originalPrice ? `<span class="badge badge-save">Save GH₵${product.originalPrice - product.price}</span>` : ''}
                </div>
                <button class="favorite-btn">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-meta">
                    <div class="rating">
                        <i class="fas fa-star star"></i>
                        <span>${product.rating}</span>
                    </div>
                    <span>•</span>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${product.location}</span>
                    </div>
                </div>
                <div class="product-price">
                    <span class="current-price">GH₵${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">GH₵${product.originalPrice}</span>` : ''}
                </div>
                <div class="seller-info">
                    <span>by</span>
                    <span class="seller-name">${product.seller}</span>
                    ${product.isVerified ? '<span class="badge badge-verified">Verified</span>' : ''}
                </div>
                <div class="product-actions">
                    <button class="btn btn-buy">Buy Now</button>
                    <button class="btn-chat">
                        <i class="fas fa-comment"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Render features
function renderFeatures() {
    const featuresGrid = document.getElementById('featuresGrid');
    featuresGrid.innerHTML = features.map(feature => `
        <div class="feature-card">
            <div class="feature-content">
                <div class="feature-icon">
                    <i class="${feature.icon}" style="color: ${feature.color}"></i>
                </div>
                <div class="feature-text">
                    <h3>${feature.title}</h3>
                    <p>${feature.description}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Search Functionality
let searchInput, searchSuggestions, searchTimeout;

// Function to highlight matching text
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Function to show search suggestions
function showSearchSuggestions(query) {
    if (!query.trim()) {
        searchSuggestions.classList.remove('visible');
        return;
    }

    // Get matching products, sellers, and categories
    const searchTerm = query.toLowerCase();
    const suggestions = [];
    
    // Add product matches
    mockProducts.forEach(product => {
        if (product.title.toLowerCase().includes(searchTerm)) {
            suggestions.push({
                type: 'product',
                text: product.title,
                seller: product.seller,
                icon: 'fas fa-box',
                product: product
            });
        }
        if (product.seller.toLowerCase().includes(searchTerm)) {
            suggestions.push({
                type: 'seller',
                text: product.seller,
                productTitle: product.title,
                icon: 'fas fa-store',
                product: product
            });
        }
    });

    // Add category matches
    categories.forEach(category => {
        if (category.name.toLowerCase().includes(searchTerm)) {
            suggestions.push({
                type: 'category',
                text: category.name,
                icon: category.icon,
                category: category
            });
        }
    });

    // Limit to 5 suggestions
    const limitedSuggestions = suggestions.slice(0, 5);
    
    // Update suggestions UI
    if (limitedSuggestions.length > 0) {
        searchSuggestions.innerHTML = limitedSuggestions.map(suggestion => {
            const highlightedText = highlightText(suggestion.text, searchTerm);
            let subtitle = '';
            
            if (suggestion.type === 'product') {
                subtitle = `<div class="suggestion-subtitle">by ${suggestion.seller}</div>`;
            } else if (suggestion.type === 'seller') {
                subtitle = `<div class="suggestion-subtitle">Selling: ${suggestion.productTitle}</div>`;
            }
            
            return `
                <div class="suggestion-item" data-type="${suggestion.type}" data-id="${suggestion.product?.id || suggestion.category?.name}">
                    <i class="${suggestion.icon}"></i>
                    <div class="suggestion-text">
                        <div class="suggestion-title" dangerouslySetInnerHTML={{__html: highlightedText}}></div>
                        ${subtitle}
                    </div>
                    <span class="suggestion-category">${suggestion.type}</span>
                </div>
            `;
        }).join('');
        
        searchSuggestions.classList.add('visible');
    } else {
        searchSuggestions.classList.remove('visible');
    }
}

// Function to filter products based on search query
function filterProducts(query) {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) {
        renderProducts();
        return;
    }

    const filteredProducts = mockProducts.filter(product => {
        return (
            product.title.toLowerCase().includes(searchTerm) ||
            product.seller.toLowerCase().includes(searchTerm) ||
            product.location.toLowerCase().includes(searchTerm)
        );
    });

    renderProducts(filteredProducts);
}

// Function to navigate to item page
function navigateToItem(type, id) {
    let url = '';
    
    switch(type) {
        case 'product':
            // Navigate to product details page
            url = `product.html?id=${encodeURIComponent(id)}`;
            break;
        case 'seller':
            // Navigate to seller's page
            url = `seller.html?id=${encodeURIComponent(id)}`;
            break;
        case 'category':
            // Navigate to category page
            const categoryName = id.toLowerCase().replace(/\s+/g, '-');
            url = `category/${categoryName}.html`;
            break;
    }
    
    if (url) {
        window.location.href = url;
    }
}



// Cart functionality
let cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('ghMarketCart', JSON.stringify(cart));
    
    // Update cart count if cart icon exists
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        // Show/hide cart count based on items
        if (cartCount > 0) {
            cartCountElement.style.display = 'inline-block';
        } else {
            cartCountElement.style.display = 'none';
        }
    }
    console.log('Cart updated:', cartCount, 'items');
}

function openChat(product) {
    // Create chat modal
    const chatModal = document.createElement('div');
    chatModal.className = 'chat-modal';
    chatModal.innerHTML = `
        <div class="chat-modal-content">
            <div class="chat-header">
                <h3>Chat with ${product.seller}</h3>
                <button class="close-chat">&times;</button>
            </div>
            <div class="chat-body">
                <div class="chat-messages">
                    <div class="message received">
                        <div class="message-content">
                            <p>Hi! I'm interested in your "${product.title}"</p>
                        </div>
                        <div class="message-time">Just now</div>
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Type your message..." id="chatMessageInput">
                    <button class="send-message">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatModal);
    
    // Add styles for chat modal
    const style = document.createElement('style');
    style.textContent = `
        .chat-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .chat-modal-content {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
            height: 80%;
            display: flex;
            flex-direction: column;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .chat-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chat-header h3 {
            margin: 0;
            color: #333;
        }
        
        .close-chat {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .chat-body {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        }
        
        .message {
            margin-bottom: 15px;
        }
        
        .message-content {
            background: #f0f0f0;
            padding: 10px 15px;
            border-radius: 18px;
            max-width: 80%;
            display: inline-block;
        }
        
        .message.received .message-content {
            background: #007bff;
            color: white;
        }
        
        .message-time {
            font-size: 12px;
            color: #999;
            margin-top: 5px;
        }
        
        .chat-input {
            padding: 20px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 10px;
        }
        
        .chat-input input {
            flex: 1;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 25px;
            outline: none;
        }
        
        .send-message {
            background: #007bff;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners
    const closeChat = chatModal.querySelector('.close-chat');
    const sendMessage = chatModal.querySelector('.send-message');
    const messageInput = chatModal.querySelector('#chatMessageInput');
    
    closeChat.addEventListener('click', () => {
        document.body.removeChild(chatModal);
    });
    
    sendMessage.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            const messagesContainer = chatModal.querySelector('.chat-messages');
            const newMessage = document.createElement('div');
            newMessage.className = 'message sent';
            newMessage.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
                <div class="message-time">Just now</div>
            `;
            messagesContainer.appendChild(newMessage);
            messageInput.value = '';
            
            // Auto-scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    });
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });
    
    // Close on outside click
    chatModal.addEventListener('click', (e) => {
        if (e.target === chatModal) {
            document.body.removeChild(chatModal);
        }
    });
}

function showPaymentModal(product) {
    // Create payment modal
    const paymentModal = document.createElement('div');
    paymentModal.className = 'payment-modal';
    paymentModal.innerHTML = `
        <div class="payment-modal-content">
            <div class="payment-header">
                <h3>Complete Your Purchase</h3>
                <button class="close-payment">&times;</button>
            </div>
            <div class="payment-body">
                <div class="product-summary">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="product-details">
                        <h4>${product.title}</h4>
                        <p class="seller">by ${product.seller}</p>
                        <p class="location"><i class="fas fa-map-marker-alt"></i> ${product.location}</p>
                    </div>
                </div>
                
                <div class="payment-summary">
                    <div class="price-breakdown">
                        <div class="price-item">
                            <span>Product Price:</span>
                            <span>GH₵${product.price}</span>
                        </div>
                        <div class="price-item">
                            <span>Delivery Fee:</span>
                            <span>GH₵25</span>
                        </div>
                        <div class="price-item total">
                            <span>Total Amount:</span>
                            <span>GH₵${product.price + 25}</span>
                        </div>
                    </div>
                </div>
                
                <div class="payment-methods">
                    <h4>Select Payment Method</h4>
                    <div class="payment-options">
                        <label class="payment-option">
                            <input type="radio" name="payment" value="mobile-money" checked>
                            <div class="option-content">
                                <i class="fas fa-mobile-alt"></i>
                                <span>Mobile Money</span>
                            </div>
                        </label>
                        <label class="payment-option">
                            <input type="radio" name="payment" value="bank-transfer">
                            <div class="option-content">
                                <i class="fas fa-university"></i>
                                <span>Bank Transfer</span>
                            </div>
                        </label>
                        <label class="payment-option">
                            <input type="radio" name="payment" value="cash-on-delivery">
                            <div class="option-content">
                                <i class="fas fa-money-bill-wave"></i>
                                <span>Cash on Delivery</span>
                            </div>
                        </label>
                    </div>
                </div>
                
                <div class="delivery-info">
                    <h4>Delivery Information</h4>
                    <div class="delivery-form">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="deliveryName" placeholder="Enter your full name" required>
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" id="deliveryPhone" placeholder="Enter your phone number" required>
                        </div>
                        <div class="form-group">
                            <label>Delivery Address</label>
                            <textarea id="deliveryAddress" placeholder="Enter your complete delivery address" required></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="payment-footer">
                <button class="btn-cancel">Cancel</button>
                <button class="btn-pay">Pay GH₵${product.price + 25}</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(paymentModal);
    
    // Add styles for payment modal
    const style = document.createElement('style');
    style.textContent = `
        .payment-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .payment-modal-content {
            background: white;
            border-radius: 16px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .payment-header {
            padding: 20px 24px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 16px 16px 0 0;
        }
        
        .payment-header h3 {
            margin: 0;
            font-size: 1.5rem;
        }
        
        .close-payment {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: white;
        }
        
        .payment-body {
            padding: 24px;
        }
        
        .product-summary {
            display: flex;
            gap: 16px;
            padding: 16px;
            background: #f8f9fa;
            border-radius: 12px;
            margin-bottom: 24px;
        }
        
        .product-summary .product-image {
            width: 80px;
            height: 80px;
            border-radius: 8px;
            overflow: hidden;
            flex-shrink: 0;
        }
        
        .product-summary .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .product-details h4 {
            margin: 0 0 8px 0;
            font-size: 1.1rem;
        }
        
        .product-details .seller {
            color: #666;
            margin: 0 0 4px 0;
        }
        
        .product-details .location {
            color: #888;
            margin: 0;
            font-size: 0.9rem;
        }
        
        .payment-summary {
            margin-bottom: 24px;
        }
        
        .price-breakdown {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 16px;
        }
        
        .price-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        
        .price-item.total {
            border-top: 1px solid #ddd;
            padding-top: 12px;
            margin-top: 12px;
            font-weight: bold;
            font-size: 1.1rem;
            color: #2563eb;
        }
        
        .payment-methods {
            margin-bottom: 24px;
        }
        
        .payment-methods h4 {
            margin: 0 0 16px 0;
        }
        
        .payment-options {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .payment-option {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            transition: all 0.3s;
        }
        
        .payment-option:hover {
            border-color: #2563eb;
        }
        
        .payment-option input[type="radio"] {
            display: none;
        }
        
        .payment-option input[type="radio"]:checked + .option-content {
            background: #2563eb;
            color: white;
        }
        
        .option-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 12px;
            border-radius: 6px;
            transition: all 0.3s;
            flex: 1;
        }
        
        .delivery-info h4 {
            margin: 0 0 16px 0;
        }
        
        .delivery-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .form-group label {
            font-weight: 500;
            color: #374151;
        }
        
        .form-group input,
        .form-group textarea {
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #2563eb;
        }
        
        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }
        
        .payment-footer {
            padding: 20px 24px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 12px;
            justify-content: flex-end;
        }
        
        .btn-cancel {
            padding: 12px 24px;
            border: 1px solid #d1d5db;
            background: white;
            color: #374151;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s;
        }
        
        .btn-cancel:hover {
            background: #f3f4f6;
        }
        
        .btn-pay {
            padding: 12px 32px;
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        .btn-pay:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
        }
        
        @media (max-width: 768px) {
            .payment-modal-content {
                width: 95%;
                max-height: 95vh;
            }
            
            .product-summary {
                flex-direction: column;
                text-align: center;
            }
            
            .payment-footer {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners
    const closePayment = paymentModal.querySelector('.close-payment');
    const btnCancel = paymentModal.querySelector('.btn-cancel');
    const btnPay = paymentModal.querySelector('.btn-pay');
    
    closePayment.addEventListener('click', () => {
        document.body.removeChild(paymentModal);
    });
    
    btnCancel.addEventListener('click', () => {
        document.body.removeChild(paymentModal);
    });
    
    btnPay.addEventListener('click', () => {
        const deliveryName = document.getElementById('deliveryName').value;
        const deliveryPhone = document.getElementById('deliveryPhone').value;
        const deliveryAddress = document.getElementById('deliveryAddress').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        if (!deliveryName || !deliveryPhone || !deliveryAddress) {
            showNotification('Please fill in all delivery information', 'info');
            return;
        }
        
        // Process payment
        processPayment(product, {
            name: deliveryName,
            phone: deliveryPhone,
            address: deliveryAddress,
            method: paymentMethod
        });
        
        document.body.removeChild(paymentModal);
    });
    
    // Close on outside click
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            document.body.removeChild(paymentModal);
        }
    });
}

function processPayment(product, deliveryInfo) {
    // Simulate payment processing
    const totalAmount = product.price + 25; // Product price + delivery fee
    
    // Show processing notification
    showNotification('Processing payment...', 'info');
    
    // Simulate payment delay
    setTimeout(() => {
        // Show success notification
        showNotification(`Payment successful! Order confirmed. Total: GH₵${totalAmount}`, 'success');
        
        // Add to cart for order tracking
        addToCart(product);
        
        // You can add more functionality here like:
        // - Sending order confirmation email
        // - Updating inventory
        // - Notifying seller
        // - Redirecting to order tracking page
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            padding: 15px 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 4px solid;
        }
        
        .notification-success {
            border-left-color: #28a745;
        }
        
        .notification-info {
            border-left-color: #17a2b8;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-content i {
            color: #28a745;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('ghMarketCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadCart(); // Load cart from localStorage
    renderCategories();
    renderProducts();
    renderFeatures();
    
    // Add event listeners for interactive elements
    
    // Favorite buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.favorite-btn')) {
            const btn = e.target.closest('.favorite-btn');
            const icon = btn.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ef4444';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Initialize search functionality
    searchInput = document.getElementById('searchInput');
    searchSuggestions = document.getElementById('searchSuggestions');
    
    if (searchInput && searchSuggestions) {
        // Add event listeners for search input
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            
            // Clear previous timeout
            clearTimeout(searchTimeout);
            
            // Show suggestions immediately
            showSearchSuggestions(query);
            
            // Only filter products after a slight delay (debounce)
            searchTimeout = setTimeout(() => {
                filterProducts(query);
            }, 300);
        });
        
        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchSuggestions.classList.remove('visible');
            }
        });
        
        // Handle suggestion clicks
        searchSuggestions.addEventListener('click', (e) => {
            const suggestionItem = e.target.closest('.suggestion-item');
            if (suggestionItem) {
                const type = suggestionItem.getAttribute('data-type');
                const id = suggestionItem.getAttribute('data-id');
                
                if (type === 'product' || type === 'seller') {
                    const product = mockProducts.find(p => p.id === id);
                    if (product) {
                        // Navigate to the item's page
                        navigateToItem(type, id);
                    }
                } else if (type === 'category') {
                    const category = categories.find(c => c.name === id);
                    if (category) {
                        // Navigate to the category page
                        navigateToItem(type, id);
                    }
                }
                
                searchSuggestions.classList.remove('visible');
            }
        });
        
        // Handle keyboard navigation in search suggestions
        searchInput.addEventListener('keydown', (e) => {
            if (!searchSuggestions.classList.contains('visible')) return;
            
            const items = searchSuggestions.querySelectorAll('.suggestion-item');
            if (!items.length) return;
            
            let currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % items.length;
                items[nextIndex]?.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + items.length) % items.length;
                items[prevIndex]?.focus();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (currentIndex >= 0) {
                    const item = items[currentIndex];
                    const type = item.getAttribute('data-type');
                    const id = item.getAttribute('data-id');
                    navigateToItem(type, id);
                } else if (searchInput.value.trim()) {
                    filterProducts(searchInput.value);
                    searchSuggestions.classList.remove('visible');
                }
            } else if (e.key === 'Escape') {
                searchSuggestions.classList.remove('visible');
                searchInput.focus();
            }
        });
    }
    
    // Button click handlers
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn-buy')) {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.getAttribute('data-product-id');
            const product = mockProducts.find(p => p.id === productId);
            
            if (product) {
                // Show payment modal for immediate purchase
                showPaymentModal(product);
            }
        }
        
        if (e.target.closest('.btn-chat')) {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.getAttribute('data-product-id');
            const product = mockProducts.find(p => p.id === productId);
            
            if (product) {
                // Open chat functionality
                openChat(product);
            }
        }
        
        if (e.target.closest('.category-card')) {
            const categoryName = e.target.closest('.category-card').querySelector('.category-name').textContent;
            console.log('Category clicked:', categoryName);
            // Implement category filtering
        }
    });
    
    // Sign In Modal Logic
    const signInBtn = document.querySelector('.btn.btn-outline');
    const modal = document.getElementById('signInModal');
    const closeModal = document.getElementById('closeModal');

    if(signInBtn && modal && closeModal) {
      signInBtn.addEventListener('click', function() {
        modal.classList.add('show');
      });
      closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
      });
      window.addEventListener('click', function(e) {
        if(e.target === modal) {
          modal.classList.remove('show');
        }
      });
    }

    // Signup modal removed - users now go directly to signup.html page
});

// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Firebase to be properly initialized
    function waitForFirebaseInit() {
        return new Promise((resolve) => {
            if (typeof firebase !== 'undefined' && firebase.auth && (window.firebaseAuth || firebase.auth())) {
                resolve();
            } else {
                setTimeout(() => waitForFirebaseInit().then(resolve), 100);
            }
        });
    }
    
    waitForFirebaseInit().then(() => {
        console.log('✅ Firebase ready for script.js');
        initializeFirebaseAuth();
    }).catch(error => {
        console.error("❌ Firebase initialization failed:", error);
    });
    
    function initializeFirebaseAuth() {
        // Use globally available Firebase services
        const auth = window.firebaseAuth || firebase.auth();
        const db = window.firebaseDb || firebase.firestore();
        
        if (!auth) {
            console.error("Firebase Auth not available");
            return;
        }

    // --- DOM Elements for Authentication ---
    // Header Authentication Buttons Container
    const authButtonsContainer = document.getElementById('auth-buttons-container');
    const headerSignInBtn = document.getElementById('headerSignInBtn');
    const headerSignUpBtn = document.getElementById('headerSignUpBtn');

    // Modals
    const signInModal = document.getElementById('signInModal');
    const signUpModal = document.getElementById('signUpModal');

    // Close buttons for modals
    const closeModalBtn = document.getElementById('closeModal'); // For Sign In modal
    // Signup modal removed - using dedicated signup.html page

    // Sign In Form Elements
    const signInForm = signInModal.querySelector('.sign-in-form');
    const signInEmailInput = signInForm.querySelector('#email');
    const signInPasswordInput = signInForm.querySelector('#password');
    const signInErrorMsg = document.createElement('p'); // Create a new element for error messages
    signInErrorMsg.style.color = 'red';
    signInErrorMsg.style.marginTop = '10px';
    signInForm.appendChild(signInErrorMsg); // Append it to the form


    // Sign Up Form Elements removed - using dedicated signup.html page

    // --- Helper Functions for Modals ---
    function openModal(modal) {
        modal.style.display = 'flex'; // Use flex for centering if your CSS supports it, otherwise 'block'
        modal.style.alignItems = 'center'; // Center vertically
        modal.style.justifyContent = 'center'; // Center horizontally
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        // Clear input fields and error messages when closing
        if (modal === signInModal) {
            if (signInEmailInput) signInEmailInput.value = '';
            if (signInPasswordInput) signInPasswordInput.value = '';
            signInErrorMsg.textContent = '';
        }
        // Signup modal handling removed - using dedicated signup.html page
    }

    // --- Event Listeners for Opening/Closing Modals ---
    if (headerSignInBtn) {
        headerSignInBtn.addEventListener('click', () => openModal(signInModal));
    }
    // Signup button now links directly to signup.html - no modal needed

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => closeModal(signInModal));
    }
    // Signup modal close button removed - using dedicated signup.html page

    // Close modals if clicked outside content
    window.addEventListener('click', function(event) {
        if (event.target === signInModal) {
            closeModal(signInModal);
        }
        // Signup modal click outside handling removed - using dedicated signup.html page
    });

    // --- Firebase Authentication Logic ---

    // Sign In Form Submission
    if (signInForm) {
        signInForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default browser form submission
            signInErrorMsg.textContent = ''; // Clear previous errors

            const email = signInEmailInput.value;
            const password = signInPasswordInput.value;

            try {
                await auth.signInWithEmailAndPassword(email, password);
                console.log('User signed in successfully!');
                closeModal(signInModal); // Close modal on successful sign-in
                // The onAuthStateChanged listener will handle UI updates
            } catch (error) {
                console.error('Sign In Error:', error.code, error.message);
                // Display user-friendly error message
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    signInErrorMsg.textContent = 'Invalid email or password.';
                } else if (error.code === 'auth/invalid-email') {
                    signInErrorMsg.textContent = 'Invalid email format.';
                }
                else {
                    signInErrorMsg.textContent = `Error: ${error.message}`;
                }
            }
        });
    }

    // Sign Up Form Submission removed - handled in dedicated signup.html page

    // --- Dynamic Header Button Management with onAuthStateChanged (VERY IMPORTANT!) ---
    // This listens for when a user signs in, signs out, or their token refreshes.
    auth.onAuthStateChanged((user) => {
        // Clear previous content in the auth buttons container
        if (authButtonsContainer) { // Ensure container exists
            authButtonsContainer.innerHTML = ''; 
        }

        if (user) {
            // User is signed in
            console.log("User is signed in:", user.uid, user.email, user.displayName);

            // Create display for signed-in user
            const userDisplaySpan = document.createElement('span');
            userDisplaySpan.classList.add('nav-link'); // Inherit some styling
            userDisplaySpan.style.color = 'white'; // Ensure visibility
            userDisplaySpan.style.fontWeight = 'bold';
            userDisplaySpan.style.marginRight = '10px';
            userDisplaySpan.textContent = `Welcome, ${user.displayName || user.email || 'User'}!`;

            const signOutButton = document.createElement('button');
            signOutButton.classList.add('btn', 'btn-outline');
            signOutButton.textContent = 'Sign Out';
            signOutButton.addEventListener('click', () => {
                // Redirect to the custom sign-out page with background
                window.location.href = 'signout.html';
            });

            if (authButtonsContainer) {
                authButtonsContainer.appendChild(userDisplaySpan);
                authButtonsContainer.appendChild(signOutButton);
            }

        } else {
            // User is signed out
            console.log("User is signed out.");

            // Add original Sign In and Sign Up buttons back
            // Only append if they are not already children (authButtonsContainer.innerHTML = '' handles this initially)
            if (authButtonsContainer) {
                authButtonsContainer.appendChild(headerSignInBtn);
                authButtonsContainer.appendChild(headerSignUpBtn);
            }
        }
    });
    } // Close initializeFirebaseAuth function
}); // Close DOMContentLoaded event listener

