const products = [];

fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
        data.categories.forEach(category => {
            category.category_products.forEach(product => {
                products.push({
                    ...product,
                    category: category.category_name.toLowerCase()
                });
            });
        });
        switchTab('Men');
    })
    .catch(error => console.error('Error fetching the products:', error));

function switchTab(tab) {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = '';

    const filteredProducts = products.filter(product => product.category === tab.toLowerCase());
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            ${product.badge_text ? `<div class="badge">${product.badge_text}</div>` : ''}
            <div class="product-details">
                <h2 class="product-title">${product.title}</h2>
                <p class="dot">•</p>
                <p class="vendor">${product.vendor}</p>
                <div class="price-details">
                    <span class="price">Rs.${product.price}</span>
                    <span class="compare-at-price">${product.compare_at_price}</span>
                    <span class="discount">${calculateDiscount(product.price, product.compare_at_price)}%off</span>
                </div>
                <button class="add-to-cart">Add to cart</button>
            </div>
        `;
        productContainer.appendChild(productCard);
    });

    document.querySelectorAll('.tab').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.tab.${tab}`).classList.add('active');
}

function calculateDiscount(price, compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return discount.toFixed(2);
}
