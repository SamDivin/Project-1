    document.addEventListener('DOMContentLoaded', function() {

    // -------------------
    // Account Dropdown
    // -------------------
    const authTrigger = document.querySelector('.auth-trigger');
    const authDropdown = document.querySelector('.auth-dropdown');
    const signinBtn = document.querySelector('.signin-btn');
    const startHereLink = document.querySelector('.new-customer a');

    signinBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('🔐 Sign In\n\nRedirecting to login page...\nEmail/Password authentication would be handled here.');
    });

    startHereLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('📝 Create Account\n\nRedirecting to registration page...\nNew customer signup form would be displayed here.');
    });

    // -------------------
    // Help Button
    // -------------------
    const helpBtn = document.querySelector('.help-btn');
    helpBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('📞 Customer Support\n\n✅ Phone: +250 788 123 456\n✅ Email: support@exoramarket.rw\n✅ Live Chat: Available 24/7\n✅ WhatsApp: +250 788 123 456\n🏢 Address: KG 15 Ave, Kigali, Rwanda');
    });

    // -------------------
    // Search Functionality
    // -------------------
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`🔍 Searching ExoraMarket for: "${searchTerm}"\n\n✨ Features include:\n• Smart product matching\n• Filter by price, brand, rating\n• Sort by relevance, price, newest\n• Visual search with images\n• Voice search capability`);
        }
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // -------------------
    // Cart Functionality
    // -------------------
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartIcon = document.querySelector('.nav-icon:has(.cart-count)');
    let currentCartCount = 3;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;

            const originalText = this.textContent;
            this.textContent = '✓ Added!';
            this.style.background = 'linear-gradient(45deg, rgb(190, 227, 87), rgb(161, 244, 255))';

            currentCartCount++;
            cartCount.textContent = currentCartCount;
            cartCount.style.animation = 'pulse 0.5s ease-in-out';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'linear-gradient(45deg, rgb(83, 216, 214), rgb(190, 227, 87))';
                cartCount.style.animation = '';
            }, 2000);

            setTimeout(() => {
                alert(`🛒 Product Added Successfully!\n\n📦 ${productTitle}\n💰 ${productPrice}\n\n🎉 Cart now has ${currentCartCount} items\n✨ Free shipping on orders over 50,000 RWF`);
            }, 100);
        });
    });

    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`🛒 Shopping Cart (${currentCartCount} items)\n\n🛍️ Your cart contains:\n• Premium Smartphone Pro - 749,000 RWF\n• Athletic Running Shoes - 129,000 RWF\n• Designer Cotton T-Shirt - 39,000 RWF\n\n💳 Total: 917,000 RWF\n🚚 FREE SHIPPING QUALIFIED!\n\n✨ Ready to checkout?`);
        });
    }

    // -------------------
    // Categories
    // -------------------
    const categoryLinks = document.querySelectorAll('.nav-category');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.textContent.trim();
            alert(`🏪 Browsing: ${category}\n\n✨ Category features:\n• 1000+ products available\n• Filter by price, brand, ratings\n• Sort by popularity, price, newest\n• Compare products side-by-side\n• Exclusive category deals`);
        });
    });

    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            const categoryDesc = this.querySelector('p').textContent;
            alert(`🎯 Exploring ${categoryName}\n\n📝 ${categoryDesc}\n\n🛍️ What you'll find:\n• Top brands and products\n• Exclusive deals and discounts\n• Customer reviews and ratings\n• Fast delivery options`);
        });
    });

    // -------------------
    // Products
    // -------------------
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const stars = card.querySelector('.stars');

        card.addEventListener('click', function(e) {
            if (e.target.closest('.add-to-cart') || e.target.closest('.stars')) return;

            const productTitle = this.querySelector('.product-title').textContent;
            const productPrice = this.querySelector('.current-price').textContent;
            const rating = this.querySelector('.rating-text').textContent;

            alert(`📱 ${productTitle}\n\n💰 Price: ${productPrice}\n⭐ Rating: ${rating}\n\n🔍 Product details:\n• High-quality materials\n• 1-year warranty included\n• Fast delivery available\n• Customer support included\n\nClick "Add to Cart" to purchase!`);
        });

        if (stars) {
            stars.addEventListener('click', function(e) {
                e.stopPropagation();
                const productTitle = card.querySelector('.product-title').textContent;
                const ratingText = card.querySelector('.rating-text').textContent;
                alert(`⭐ Reviews for ${productTitle}\n\n${ratingText}\n\n💬 Recent reviews:\n• "Amazing quality!" - Sarah M.\n• "Fast delivery, great product" - John D.\n• "Highly recommended!" - Alice K.\n\n📊 Rating breakdown:\n⭐⭐⭐⭐⭐ 85%\n⭐⭐⭐⭐ 12%\n⭐⭐⭐ 3%`);
            });
        }
    });

    // -------------------
    // Wishlist
    // -------------------
    const wishlistBtn = document.querySelector('.nav-icon[href="#"]:not(:has(.cart-count))');
    if (wishlistBtn && wishlistBtn.textContent.includes('Wishlist')) {
        wishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('💖 Your Wishlist\n\n📋 Saved items:\n• Wireless Headphones - 45,000 RWF\n• Smart Watch - 180,000 RWF\n• Laptop Bag - 25,000 RWF\n\n✨ Features:\n• Save items for later\n• Price drop notifications\n• Share with friends\n• Move to cart easily');
        });
    }

    // -------------------
    // Newsletter
    // -------------------
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('.newsletter-input').value.trim();
        if (email) {
            alert(`🎉 Welcome to ExoraMarket Newsletter!\n\n📧 ${email} successfully subscribed\n\n🎁 You'll receive:\n• Exclusive deals (up to 50% off)\n• New arrival notifications\n• Special member discounts\n• Early access to sales\n• Product recommendations\n\n✨ First-time subscriber bonus: 10% off your next order!`);
            this.querySelector('.newsletter-input').value = '';
        }
    });

    // -------------------
    // Hero Buttons
    // -------------------
    const shopNowBtn = document.querySelector('.btn-primary');
    const exploreCategoriesBtn = document.querySelector('.btn-secondary');

    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('🚀 Welcome to ExoraMarket Shopping!\n\n🎯 Featured Collections:\n• New Arrivals (50+ items)\n• Best Sellers (trending now)\n• Flash Deals (limited time)\n• Premium Brands\n\n✨ Special today:\n• Free shipping on all orders\n• 25% off electronics\n• Buy 2 Get 1 Free fashion items');
        });
    }

    if (exploreCategoriesBtn) {
        exploreCategoriesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('📂 All Categories - ExoraMarket\n\n🛍️ Browse by department:\n• Fashion & Accessories\n• Electronics & Gadgets\n• Home & Living\n• Sports & Outdoors\n• Beauty & Personal Care\n• Books & Education\n• Automotive & Tools\n\n🎯 Each category offers:\n• Thousands of products\n• Top brands\n• Best prices guaranteed');
        });
    }

    // -------------------
    // Scroll Animations
    // -------------------
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .product-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in-up');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // -------------------
    // Hover Effects
    // -------------------
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

});
