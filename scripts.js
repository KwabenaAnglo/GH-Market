// GH Marketplace JavaScript

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Global state
const state = {
    cartItems: 0,
    selectedCategories: [],
    showFilters: false,
    showUpload: false,
    files: [],
    likedProducts: new Set()
};

// Categories data
const categories = [
    { id: 'electronics', name: 'Electronics', icon: 'smartphone' },
    { id: 'computers', name: 'Computers', icon: 'laptop' },
    { id: 'automotive', name: 'Automotive', icon: 'car' },
    { id: 'home', name: 'Home & Garden', icon: 'home' },
    { id: 'fashion', name: 'Fashion', icon: 'shirt' },
    { id: 'books', name: 'Books', icon: 'book' },
    { id: 'games', name: 'Games', icon: 'gamepad-2' },
    { id: 'tools', name: 'Tools', icon: 'wrench' },
    { id: 'baby', name: 'Baby & Kids', icon: 'baby' },
    { id: 'sports', name: 'Sports', icon: 'dumbbell' }
];

// Sample products data
const products = [
    {
        id: '1',
        title: 'iPhone 14 Pro Max - Excellent Condition',
        price: 899,
        originalPrice: 1099,
        image: 'iPhone 14 Pro Max.jpg',
        seller: { name: 'TechDeals', rating: 4.8, reviews: 234 },
        location: 'Manhattan, NY',
        timeAgo: '2 hours ago',
        condition: 'like-new',
        category: 'Electronics',
        delivery: { available: true, fee: 5, timeRange: '1-2 days' }
    },
    {
        id: '2',
        title: 'MacBook Air M2 - Perfect for Students',
        price: 1049,
        originalPrice: null,
        image: 'MacBook Air M2.jpg',
        seller: { name: 'AppleStore', rating: 4.9, reviews: 567 },
        location: 'Brooklyn, NY',
        timeAgo: '4 hours ago',
        condition: 'new',
        category: 'Computers',
        delivery: { available: true, fee: 0, timeRange: 'Same day' }
    },
    {
        id: '3',
        title: 'Vintage Leather Sofa - Mid Century Modern',
        price: 450,
        originalPrice: 800,
        image: 'Vintage Leather Sofa.jpg',
        seller: { name: 'VintageVibes', rating: 4.6, reviews: 89 },
        location: 'Queens, NY',
        timeAgo: '1 day ago',
        condition: 'good',
        category: 'Home & Garden',
        delivery: { available: true, fee: 25, timeRange: '2-3 days' }
    },
    {
        id: '4',
        title: 'Sony PlayStation 5 - Brand New Sealed',
        price: 499,
        originalPrice: 599,
        image: 'Sony PlayStation 5.jpg',
        seller: { name: 'GameZone', rating: 4.7, reviews: 156 },
        location: 'Manhattan, NY',
        timeAgo: '3 hours ago',
        condition: 'new',
        category: 'Games',
        delivery: { available: true, fee: 10, timeRange: '1-2 days' }
    },
    {
        id: '5',
        title: 'Designer Winter Coat - Almost New',
        price: 120,
        originalPrice: 299,
        image: 'Designer Winter Coat.jpg',
        seller: { name: 'FashionForward', rating: 4.5, reviews: 78 },
        location: 'Brooklyn, NY',
        timeAgo: '6 hours ago',
        condition: 'like-new',
        category: 'Fashion',
        delivery: { available: false }
    },
    {
        id: '6',
        title: 'Professional Camera Lens - Canon 50mm',
        price: 350,
        originalPrice: 450,
        image: 'Professional Camera Lens.jpg',
        seller: { name: 'PhotoPro', rating: 4.9, reviews: 234 },
        location: 'Manhattan, NY',
        timeAgo: '8 hours ago',
        condition: 'good',
        category: 'Electronics',
        delivery: { available: true, fee: 15, timeRange: '2-3 days' }
    }
];

// Utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatSpeed(bytesPerSecond) {
    return formatFileSize(bytesPerSecond) + '/s';
}

function formatTime(seconds) {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${Math.round(seconds / 3600)}h`;
}

function getFileIcon(type) {
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'video';
    if (type.includes('pdf') || type.includes('document')) return 'file-text';
    return 'file';
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// DOM manipulation functions
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = state.cartItems;
        badge.style.display = state.cartItems > 0 ? 'flex' : 'none';
    }
}

function updateCategoryCount() {
    const countElement = document.getElementById('categoryCount');
    if (countElement) {
        countElement.textContent = state.selectedCategories.length;
        countElement.style.display = state.selectedCategories.length > 0 ? 'inline-block' : 'none';
    }
}

function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;

    grid.innerHTML = categories.map(category => `
        <button class="category-btn" data-category="${category.id}">
            <div class="category-icon">
                <i data-lucide="${category.icon}"></i>
            </div>
            <span class="category-name">${category.name}</span>
        </button>
    `).join('');

    // Re-initialize icons
    lucide.createIcons();

    // Add event listeners
    grid.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const categoryId = e.currentTarget.dataset.category;
            toggleCategory(categoryId);
        });
    });
}

function renderSelectedCategories() {
    const container = document.getElementById('selectedCategories');
    if (!container) return;

    if (state.selectedCategories.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'flex';
    container.innerHTML = state.selectedCategories.map(categoryId => {
        const category = categories.find(c => c.id === categoryId);
        if (!category) return '';
        
        return `
            <div class="selected-category" data-category="${categoryId}">
                <i data-lucide="${category.icon}"></i>
                ${category.name}
                <i data-lucide="x"></i>
            </div>
        `;
    }).join('');

    // Re-initialize icons
    lucide.createIcons();

    // Add event listeners
    container.querySelectorAll('.selected-category').forEach(item => {
        item.addEventListener('click', (e) => {
            const categoryId = e.currentTarget.dataset.category;
            toggleCategory(categoryId);
        });
    });
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => {
        const discountPercentage = product.originalPrice 
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;
        // Map product.id to static HTML file
        const productFile = `product-${product.id}.html`;
        return `
            <div class="product-card">
                <a class="product-image-container" href="${productFile}">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <button class="product-like-btn ${state.likedProducts.has(product.id) ? 'liked' : ''}" onclick="event.preventDefault();toggleLike('${product.id}')">
                        <i data-lucide="heart"></i>
                    </button>
                    <div class="product-badges">
                        ${discountPercentage > 0 ? `<div class="discount-badge">-${discountPercentage}%</div>` : ''}
                        ${product.delivery?.available ? '<div class="delivery-badge">Delivery</div>' : ''}
                    </div>
                </a>
                <div class="product-content">
                    <div class="product-title-section">
                        <a class="product-title" href="${productFile}">${product.title}</a>
                        <div class="product-category">${product.category}</div>
                    </div>
                    <div class="product-price-section">
                        <span class="product-price">GH₵${product.price}</span>
                        ${product.originalPrice ? `<span class="product-original-price">GH₵${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="product-condition condition-${product.condition}">
                        ${product.condition.charAt(0).toUpperCase() + product.condition.slice(1).replace('-', ' ')}
                    </div>
                    <div class="product-seller-info">
                        <div class="product-rating">
                            <i data-lucide="star"></i>
                            <span>${product.seller.rating}</span>
                            <span>(${product.seller.reviews})</span>
                        </div>
                        <span class="product-seller-name">${product.seller.name}</span>
                    </div>
                    <div class="product-location-time">
                        <div class="product-location">
                            <i data-lucide="map-pin"></i>
                            <span>${product.location}</span>
                        </div>
                        <div class="product-time">
                            <i data-lucide="clock"></i>
                            <span>${product.timeAgo}</span>
                        </div>
                    </div>
                    ${product.delivery?.available ? `
                        <div class="product-delivery-info">
                            <span class="delivery-available">Delivery available</span>
                            ${product.delivery.fee ? ` • GH₵${product.delivery.fee} fee` : ''}
                            ${product.delivery.timeRange ? ` • ${product.delivery.timeRange}` : ''}
                        </div>
                    ` : ''}
                    <button class="product-add-to-cart" onclick="addToCart('${product.id}')">
                        <i data-lucide="shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Re-initialize icons
    lucide.createIcons();
}

// Category functions
function toggleCategory(categoryId) {
    const index = state.selectedCategories.indexOf(categoryId);
    if (index > -1) {
        state.selectedCategories.splice(index, 1);
    } else {
        state.selectedCategories.push(categoryId);
    }
    
    updateCategoryDisplay();
}

function updateCategoryDisplay() {
    updateCategoryCount();
    
    // Update category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        const categoryId = btn.dataset.category;
        btn.classList.toggle('active', state.selectedCategories.includes(categoryId));
    });
    
    renderSelectedCategories();
    
    // Show/hide clear button
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.style.display = state.selectedCategories.length > 0 ? 'flex' : 'none';
    }
}

function clearAllCategories() {
    state.selectedCategories = [];
    updateCategoryDisplay();
}

// Product functions
function addToCart(productId) {
    state.cartItems++;
    updateCartBadge();
    
    // Show a simple notification
    const product = products.find(p => p.id === productId);
    if (product) {
        showNotification(`${product.title} added to cart!`);
    }
}

function toggleLike(productId) {
    if (state.likedProducts.has(productId)) {
        state.likedProducts.delete(productId);
    } else {
        state.likedProducts.add(productId);
    }
    
    // Update the like button
    const likeBtn = document.querySelector(`[onclick="toggleLike('${productId}')"]`);
    if (likeBtn) {
        likeBtn.classList.toggle('liked', state.likedProducts.has(productId));
    }
}

function viewProduct(productId) {
    console.log('Viewing product:', productId);
    showNotification('Product details would open here!');
}

// File upload functions
function initializeFileUpload() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    
    if (!uploadZone || !fileInput) return;

    // Click to upload
    uploadZone.addEventListener('click', () => {
        fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files) {
            handleFiles(Array.from(e.target.files));
        }
    });

    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        
        if (e.dataTransfer.files) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    });
}

function handleFiles(files) {
    const maxFiles = 10;
    const maxFileSize = 100 * 1024 * 1024; // 100MB
    
    files.slice(0, maxFiles - state.files.length).forEach(file => {
        if (file.size <= maxFileSize) {
            const fileObj = {
                id: generateId(),
                file: file,
                progress: 0,
                status: 'pending',
                speed: 0,
                eta: 0,
                preview: null
            };
            
            // Generate preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    fileObj.preview = e.target.result;
                    renderFileList();
                };
                reader.readAsDataURL(file);
            }
            
            state.files.push(fileObj);
            simulateUpload(fileObj);
        }
    });
    
    updateUploadDisplay();
}

function simulateUpload(fileObj) {
    fileObj.status = 'uploading';
    
    const interval = setInterval(() => {
        if (fileObj.status !== 'uploading') {
            clearInterval(interval);
            return;
        }
        
        const increment = Math.random() * 15;
        fileObj.progress = Math.min(fileObj.progress + increment, 100);
        fileObj.speed = 1024 * 1024 * (0.5 + Math.random() * 2); // 0.5-2.5 MB/s
        fileObj.eta = fileObj.progress < 100 ? (fileObj.file.size * (100 - fileObj.progress) / 100) / fileObj.speed : 0;
        
        if (fileObj.progress >= 100) {
            fileObj.status = 'completed';
            fileObj.progress = 100;
            clearInterval(interval);
        }
        
        renderFileList();
        updateOverallProgress();
    }, 200 + Math.random() * 300);
}

function updateUploadDisplay() {
    const overallProgress = document.getElementById('overallProgress');
    if (overallProgress) {
        overallProgress.style.display = state.files.length > 0 ? 'block' : 'none';
    }
    
    renderFileList();
    updateOverallProgress();
}

function updateOverallProgress() {
    if (state.files.length === 0) return;
    
    const totalProgress = state.files.reduce((sum, file) => sum + file.progress, 0);
    const averageProgress = totalProgress / state.files.length;
    
    const progressFill = document.getElementById('overallProgressFill');
    const progressText = document.getElementById('overallProgressText');
    
    if (progressFill) {
        progressFill.style.width = `${averageProgress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${Math.round(averageProgress)}%`;
    }
}

function renderFileList() {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;
    
    fileList.innerHTML = state.files.map(fileObj => `
        <div class="file-item">
            <div class="file-content">
                <div class="file-preview">
                    ${fileObj.preview 
                        ? `<img src="${fileObj.preview}" alt="Preview">` 
                        : `<i data-lucide="${getFileIcon(fileObj.file.type)}"></i>`
                    }
                </div>
                <div class="file-info">
                    <div class="file-header">
                        <div class="file-details">
                            <div class="file-name">${fileObj.file.name}</div>
                            <div class="file-metadata">
                                <span class="metadata-badge">${formatFileSize(fileObj.file.size)}</span>
                                <span class="metadata-badge">${fileObj.file.type || 'Unknown'}</span>
                                <span class="metadata-badge">${new Date(fileObj.file.lastModified).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div class="file-actions">
                            ${fileObj.status === 'uploading' ? `
                                <button class="file-action-btn" onclick="pauseFile('${fileObj.id}')">
                                    <i data-lucide="pause"></i>
                                </button>
                            ` : ''}
                            ${fileObj.status === 'paused' ? `
                                <button class="file-action-btn" onclick="resumeFile('${fileObj.id}')">
                                    <i data-lucide="play"></i>
                                </button>
                            ` : ''}
                            ${fileObj.status === 'error' ? `
                                <button class="file-action-btn" onclick="retryFile('${fileObj.id}')">
                                    <i data-lucide="rotate-ccw"></i>
                                </button>
                            ` : ''}
                            <button class="file-action-btn" onclick="removeFile('${fileObj.id}')">
                                <i data-lucide="x"></i>
                            </button>
                        </div>
                    </div>
                    ${fileObj.status !== 'pending' ? `
                        <div class="file-progress-section">
                            <div class="file-progress-info">
                                <span>${fileObj.progress.toFixed(1)}%</span>
                                <div class="file-progress-stats">
                                    ${fileObj.speed > 0 ? `<span>${formatSpeed(fileObj.speed)}</span>` : ''}
                                    ${fileObj.eta > 0 ? `<span>ETA: ${formatTime(fileObj.eta)}</span>` : ''}
                                </div>
                            </div>
                            <div class="file-progress-bar">
                                <div class="file-progress-fill ${fileObj.status}" style="width: ${fileObj.progress}%"></div>
                            </div>
                            ${getStatusMessage(fileObj)}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize icons
    lucide.createIcons();
}

function getStatusMessage(fileObj) {
    switch (fileObj.status) {
        case 'error':
            return '<div class="file-status-message error">Upload failed. Click retry to try again.</div>';
        case 'completed':
            return '<div class="file-status-message completed">Upload completed successfully!</div>';
        case 'paused':
            return '<div class="file-status-message paused">Upload paused. Click play to resume.</div>';
        default:
            return '';
    }
}

function removeFile(fileId) {
    state.files = state.files.filter(f => f.id !== fileId);
    updateUploadDisplay();
}

function pauseFile(fileId) {
    const file = state.files.find(f => f.id === fileId);
    if (file) {
        file.status = 'paused';
        renderFileList();
    }
}

function resumeFile(fileId) {
    const file = state.files.find(f => f.id === fileId);
    if (file) {
        file.status = 'uploading';
        simulateUpload(file);
    }
}

function retryFile(fileId) {
    const file = state.files.find(f => f.id === fileId);
    if (file) {
        file.progress = 0;
        file.status = 'uploading';
        simulateUpload(file);
    }
}

// Notification system
function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: var(--primary-foreground);
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-elegant);
        z-index: 9999;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add CSS animation
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Location Modal Logic
const locationBtn = document.querySelector('.location-btn');
const locationModal = document.getElementById('locationModal');
const closeLocationModal = document.getElementById('closeLocationModal');
const locationForm = document.getElementById('locationForm');
const locationSelect = document.getElementById('locationSelect');

if(locationBtn && locationModal && closeLocationModal && locationForm && locationSelect) {
  locationBtn.addEventListener('click', function() {
    locationModal.classList.add('show');
  });
  closeLocationModal.addEventListener('click', function() {
    locationModal.classList.remove('show');
  });
  window.addEventListener('click', function(e) {
    if(e.target === locationModal) {
      locationModal.classList.remove('show');
    }
  });
  locationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    locationBtn.textContent = locationSelect.value;
    locationModal.classList.remove('show');
  });
}

// Mobile Search Toggle
const mobileSearchBtn = document.querySelector('.nav-btn.mobile-only');
const mobileSearchBar = document.querySelector('.mobile-search');
if(mobileSearchBtn && mobileSearchBar) {
  mobileSearchBtn.addEventListener('click', function() {
    mobileSearchBar.style.display = (mobileSearchBar.style.display === 'block') ? 'none' : 'block';
  });
}

// Cart Button Redirect
const cartBtn = document.querySelector('.cart-btn');
if(cartBtn) {
  cartBtn.addEventListener('click', function() {
    window.location.href = 'cart.html';
  });
}

// User Button Modal (placeholder)
const userBtn = document.querySelectorAll('.nav-btn')[2];
if(userBtn) {
  userBtn.addEventListener('click', function() {
    alert('User modal coming soon!');
  });
}

// Mobile Menu Toggle (placeholder)
const mobileMenuBtn = document.querySelectorAll('.nav-btn.mobile-only')[1];
if(mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function() {
    alert('Mobile menu coming soon!');
  });
}

// Hero Search Button Action
const heroSearchBtn = document.querySelector('.search-btn');
const heroSearchInput = document.querySelector('.hero-search input[type="text"]');
if(heroSearchBtn && heroSearchInput) {
  heroSearchBtn.addEventListener('click', function() {
    alert('Searching for: ' + heroSearchInput.value);
  });
}

// Quick Search Dropdown Logic
const mainSearchInput = document.getElementById('mainSearchInput');
const searchDropdown = document.getElementById('searchDropdown');

function quickSearch(query) {
  const results = [];
  const q = query.trim().toLowerCase();
  if (!q) return results;
  // Search products
  products.forEach(product => {
    if (product.title.toLowerCase().includes(q)) {
      results.push({
        type: 'product',
        id: product.id,
        title: product.title,
        icon: 'shopping-bag',
        price: product.price
      });
    }
  });
  // Search features (hardcoded for now)
  const features = [
    { title: 'Smart Categorization', description: 'AI-powered product categorization and intelligent search', icon: 'package' },
    { title: 'Advanced Upload System', description: 'Upload multiple files with progress tracking', icon: 'upload' },
    { title: 'Real-time Analytics', description: 'Track your listings performance with detailed analytics', icon: 'trending-up' }
  ];
  features.forEach(feature => {
    if (
      feature.title.toLowerCase().includes(q) ||
      feature.description.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'feature',
        title: feature.title,
        description: feature.description,
        icon: feature.icon
      });
    }
  });
  return results;
}

function renderSearchDropdown(results) {
  if (!results.length) {
    searchDropdown.innerHTML = '<div class="no-results">No results found</div>';
    searchDropdown.style.display = 'block';
    return;
  }
  let html = '';
  const productResults = results.filter(r => r.type === 'product');
  const featureResults = results.filter(r => r.type === 'feature');
  if (productResults.length) {
    html += '<div class="dropdown-title">Products</div>';
    productResults.forEach((r, idx) => {
      html += `<div class="dropdown-item" data-type="product" data-idx="${idx}"><i data-lucide="${r.icon}"></i> ${r.title} <span style="margin-left:auto;color:#007bff;font-weight:500;">₵${r.price}</span></div>`;
    });
  }
  if (featureResults.length) {
    html += '<div class="dropdown-title">Features</div>';
    featureResults.forEach((r, idx) => {
      html += `<div class="dropdown-item" data-type="feature" data-idx="${idx}"><i data-lucide="${r.icon}"></i> <div><div>${r.title}</div><div style='font-size:0.9em;color:#888;'>${r.description}</div></div></div>`;
    });
  }
  searchDropdown.innerHTML = html;
  searchDropdown.style.display = 'block';
  lucide.createIcons();

  // Add click handlers
  const items = searchDropdown.querySelectorAll('.dropdown-item');
  items.forEach(item => {
    item.addEventListener('click', function(e) {
      const type = item.getAttribute('data-type');
      const idx = parseInt(item.getAttribute('data-idx'));
      if (type === 'product') {
        const product = productResults[idx];
        window.location.href = `product-${product.id}.html`;
      } else if (type === 'feature') {
        const feature = featureResults[idx];
        window.location.href = `feature.html?name=${encodeURIComponent(feature.title)}`;
      }
      searchDropdown.style.display = 'none';
    });
  });
}

if (mainSearchInput && searchDropdown) {
  mainSearchInput.addEventListener('input', function() {
    const val = mainSearchInput.value;
    if (!val.trim()) {
      searchDropdown.style.display = 'none';
      return;
    }
    const results = quickSearch(val);
    renderSearchDropdown(results);
  });
  // Hide dropdown on outside click
  document.addEventListener('click', function(e) {
    if (!searchDropdown.contains(e.target) && e.target !== mainSearchInput) {
      searchDropdown.style.display = 'none';
    }
  });
  // Optional: Hide dropdown on blur
  mainSearchInput.addEventListener('blur', function() {
    setTimeout(() => { searchDropdown.style.display = 'none'; }, 200);
  });

  // Event delegation for dropdown clicks
  searchDropdown.addEventListener('mousedown', function(e) {
    const item = e.target.closest('.dropdown-item');
    if (!item) return;
    const type = item.getAttribute('data-type');
    const idx = parseInt(item.getAttribute('data-idx'));
    const results = quickSearch(mainSearchInput.value);
    const productResults = results.filter(r => r.type === 'product');
    const featureResults = results.filter(r => r.type === 'feature');
    if (type === 'product') {
      const product = productResults[idx];
      window.location.href = `product-${product.id}.html`;
    } else if (type === 'feature') {
      const feature = featureResults[idx];
      window.location.href = `feature.html?name=${encodeURIComponent(feature.title)}`;
    }
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    renderCategories();
    renderProducts();
    initializeFileUpload();
    updateCartBadge();
    
    // Filter toggle
    const filterToggle = document.getElementById('filterToggle');
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            state.showFilters = !state.showFilters;
            const categoryGrid = document.getElementById('categoryGrid');
            if (categoryGrid) {
                categoryGrid.style.display = state.showFilters ? 'grid' : 'none';
            }
        });
    }
    
    // Clear filters
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllCategories);
    }
    
    // Upload toggle
    const toggleUpload = document.getElementById('toggleUpload');
    const uploadCard = document.getElementById('uploadCard');
    if (toggleUpload && uploadCard) {
        toggleUpload.addEventListener('click', () => {
            state.showUpload = !state.showUpload;
            uploadCard.style.display = state.showUpload ? 'block' : 'none';
            toggleUpload.innerHTML = state.showUpload 
                ? '<i data-lucide="upload"></i> Hide Upload Demo'
                : '<i data-lucide="upload"></i> Try Upload Demo';
            lucide.createIcons();
        });
    }
    
    // Initialize Lucide icons
    lucide.createIcons();

    // Redirect All button to categories.html
    const allBtn = document.getElementById('allBtn');
    if (allBtn) {
        allBtn.addEventListener('click', function() {
            window.location.href = 'categories.html';
        });
    }

    // Redirect Traditional Wear button to traditional-wear.html
    const twBtn = document.querySelector('.category-btn:not(#allBtn)');
    if (twBtn) {
        twBtn.addEventListener('click', function() {
            window.location.href = 'traditional-wear.html';
        });
    }

    // Redirect Crafts button to crafts.html
    const craftsBtn = document.querySelectorAll('.category-btn:not(#allBtn)')[1];
    if (craftsBtn) {
        craftsBtn.addEventListener('click', function() {
            window.location.href = 'crafts.html';
        });
    }

    // Redirect Local Food button to local-food.html
    const localFoodBtn = document.querySelectorAll('.category-btn:not(#allBtn)')[2];
    if (localFoodBtn) {
        localFoodBtn.addEventListener('click', function() {
            window.location.href = 'local-food.html';
        });
    }

    // Redirect Beauty button to beauty.html
    const beautyBtn = document.querySelectorAll('.category-btn:not(#allBtn)')[3];
    if (beautyBtn) {
        beautyBtn.addEventListener('click', function() {
            window.location.href = 'beauty.html';
        });
    }

    // Redirect Phones button to phones.html
    const phonesBtn = document.querySelectorAll('.category-btn:not(#allBtn)')[4];
    if (phonesBtn) {
        phonesBtn.addEventListener('click', function() {
            window.location.href = 'phones.html';
        });
    }

    // Redirect Groceries button to groceries.html
    const groceriesBtn = document.querySelectorAll('.category-btn:not(#allBtn)')[5];
    if (groceriesBtn) {
        groceriesBtn.addEventListener('click', function() {
            window.location.href = 'groceries.html';
        });
    }

    // Redirect Hot Deals button to hot-deals.html
    const hotDealsBtn = document.querySelectorAll('.category-btn:not(#allBtn)')[6];
    if (hotDealsBtn) {
        hotDealsBtn.addEventListener('click', function() {
            window.location.href = 'hot-deals.html';
        });
    }
    // Redirect Start Shopping button to shop.html
    const startShoppingBtn = document.getElementById('startShoppingBtn');
    if (startShoppingBtn) {
        startShoppingBtn.addEventListener('click', function() {
            window.location.href = 'shop.html';
        });
    }
    // Redirect Become a Seller button to become-seller.html
    const becomeSellerBtn = document.getElementById('becomeSellerBtn');
    if (becomeSellerBtn) {
        becomeSellerBtn.addEventListener('click', function() {
            window.location.href = 'become-seller.html';
        });
    }
});

// Make functions global for onclick handlers
window.addToCart = addToCart;
window.toggleLike = toggleLike;
window.viewProduct = viewProduct;
window.removeFile = removeFile;
window.pauseFile = pauseFile;
window.resumeFile = resumeFile;
window.retryFile = retryFile;

