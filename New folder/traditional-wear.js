// Sample data for traditional wear products
const traditionalProducts = [
    {
        name: "Kente Cloth (Ashanti)",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        description: "Handwoven Kente from Kumasi, perfect for special occasions.",
        price: "GHS 350"
    },
    {
        name: "Northern Smock (Fugu)",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        description: "Authentic Batakari smock, made in Tamale.",
        price: "GHS 220"
    },
    {
        name: "Beaded Necklace Set",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        description: "Handcrafted beads for weddings and festivals.",
        price: "GHS 80"
    },
    {
        name: "Kente Scarf",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        description: "Vibrant Kente scarf for all occasions.",
        price: "GHS 60"
    },
    {
        name: "Ladies' African Print Dress",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        description: "Stylish Ankara dress, made in Accra.",
        price: "GHS 180"
    },
    {
        name: "Men's Agbada Set",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
        description: "Elegant Agbada for weddings and ceremonies.",
        price: "GHS 400"
    }
];

function renderTraditionalProducts() {
    const grid = document.getElementById('traditionalProductsGrid');
    if (!grid) return;
    grid.innerHTML = traditionalProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">${product.price}</div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderTraditionalProducts); 