// Create floating particles
function createParticles() {
        const particles = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.width = particle.style.height = (Math.random() * 10 + 5) + 'px';
            particles.appendChild(particle);
        }
    }
    
    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        createParticles();
        updateCartTotals();
    });
    
    // Cart data structure
    const cartItems = {
        1: { name: 'Premium Smartphone Pro', unitPrice: 749000, originalPrice: 999000, quantity: 1 },
        2: { name: 'Athletic Running Shoes', unitPrice: 129000, originalPrice: 149000, quantity: 1 },
        3: { name: 'Designer Cotton T-Shirt', unitPrice: 39000, originalPrice: 49000, quantity: 2 },
        4: { name: 'Wireless Bluetooth Headphones', unitPrice: 45000, originalPrice: 60000, quantity: 1 }
    };
    
    // Update quantity with amazing animations
    function updateQuantity(itemId, change) {
        const qtyElement = document.getElementById(`qty-${itemId}`);
        const priceElement = document.getElementById(`price-${itemId}`);
        const item = cartItems[itemId];
        
        if (!item) return;
        
        const newQuantity = Math.max(1, item.quantity + change);
        const quantityChanged = newQuantity !== item.quantity;
        
        if (quantityChanged) {
            item.quantity = newQuantity;
            
            // Animate quantity change
            qtyElement.style.transform = 'scale(1.5) rotate(360deg)';
            qtyElement.style.background = 'linear-gradient(45deg, rgb(190, 227, 87), rgb(83, 216, 214))';
            qtyElement.style.borderRadius = '50%';
            
            setTimeout(() => {
                qtyElement.textContent = newQuantity;
                qtyElement.style.transform = 'scale(1) rotate(0deg)';
                qtyElement.style.background = 'rgba(255, 255, 255, 0.8)';
                qtyElement.style.borderRadius = '15px';
            }, 300);
            
            // Update price with animation
            const newPrice = item.unitPrice * newQuantity;
            setTimeout(() => {
                priceElement.style.transform = 'scale(1.2)';
                priceElement.style.color = 'rgb(190, 227, 87)';
                priceElement.textContent = `${newPrice.toLocaleString()} RWF`;
                
                setTimeout(() => {
                    priceElement.style.transform = 'scale(1)';
                    priceElement.style.color = 'rgb(83, 216, 214)';
                }, 300);
            }, 200);
            
            updateCartTotals();
            showSuccessMessage(`✨ Quantity updated to ${newQuantity}!`);
        }
    }
    
    // Remove item with spectacular animation
    function removeItem(itemId) {
        const confirmed = confirm('🗑️ Remove this item from your cart?\n\nThis action cannot be undone.');
        
        if (confirmed) {
            const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
            const itemName = cartItems[itemId]?.name || 'Item';
            
            // Epic removal animation
            itemElement.style.transform = 'translateX(100%) rotate(45deg) scale(0.5)';
            itemElement.style.opacity = '0';
            itemElement.style.filter = 'blur(5px)';
            
            setTimeout(() => {
                itemElement.remove();
                delete cartItems[itemId];
                updateCartTotals();
                showSuccessMessage(`🗑️ ${itemName} removed from cart!`);
                
                // Check if cart is empty
                if (Object.keys(cartItems).length === 0) {
                    showEmptyCart();
                }
            }, 500);
        }
    }
    
    // Clear entire cart
    function clearCart() {
        const confirmed = confirm('🗑️ Clear your entire cart?\n\nAll items will be removed. This action cannot be undone.');
        
        if (confirmed) {
            const cartItemsContainer = document.getElementById('cart-items');
            const items = cartItemsContainer.querySelectorAll('.cart-item');
            
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(-100px) rotate(180deg) scale(0)';
                    item.style.opacity = '0';
                    item.style.filter = 'blur(10px)';
                }, index * 100);
            });
            
            setTimeout(() => {
                Object.keys(cartItems).forEach(key => delete cartItems[key]);
                showEmptyCart();
                showSuccessMessage('🧹 Cart cleared successfully!');
            }, items.length * 100 + 500);
        }
    }
    
    // Show empty cart state
    function showEmptyCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3 class="empty-cart-title">Your cart is empty</h3>
                <p class="empty-cart-message">Looks like you haven't added any items to your cart yet.</p>
                <button class="start-shopping-btn" onclick="continueShopping()">
                    🛍️ Start Shopping
                </button>
            </div>
        `;
        
        // Reset totals
        document.getElementById('subtotal').textContent = '0 RWF';
        document.getElementById('total').textContent = '0 RWF';
        document.getElementById('savings').textContent = '0 RWF';
        document.getElementById('total-items').textContent = '0';
        document.getElementById('total-savings').textContent = '0';
    }
    
    // Apply promo code with fantastic effects
    function applyPromo() {
        const promoInput = document.getElementById('promoCode');
        const promoCode = promoInput.value.trim().toUpperCase();
        const discountRow = document.getElementById('discount-row');
        const promoDiscount = document.getElementById('promo-discount');
        
        if (!promoCode) {
            showErrorMessage('❌ Please enter a promo code');
            return;
        }
        
        let discountPercent = 0;
        let message = '';
        
        switch (promoCode) {
            case 'WELCOME10':
                discountPercent = 0.1;
                message = '🎉 WELCOME10 Applied!\n\n10% discount on your order!';
                break;
            case 'SAVE20':
                discountPercent = 0.2;
                message = '🎉 SAVE20 Applied!\n\n20% discount on your order!';
                break;
            case 'MEGA25':
                discountPercent = 0.25;
                message = '🎉 MEGA25 Applied!\n\n25% discount on your order!';
                break;
            case 'STUDENT15':
                discountPercent = 0.15;
                message = '🎉 STUDENT15 Applied!\n\n15% student discount!';
                break;
            case 'FREESHIP':
                message = '🚚 FREESHIP Applied!\n\nFree shipping confirmed!';
                break;
            default:
                showErrorMessage('❌ Invalid promo code\n\nTry: WELCOME10, SAVE20, MEGA25, STUDENT15, or FREESHIP');
                promoInput.focus();
                return;
        }
        
        if (discountPercent > 0) {
            const subtotal = calculateSubtotal();
            const discountAmount = subtotal * discountPercent;
            
            promoDiscount.textContent = `-${discountAmount.toLocaleString()} RWF`;
            discountRow.style.display = 'flex';
            
            // Animate the discount row
            discountRow.style.transform = 'scale(0)';
            discountRow.style.opacity = '0';
            setTimeout(() => {
                discountRow.style.transform = 'scale(1.1)';
                discountRow.style.opacity = '1';
                setTimeout(() => {
                    discountRow.style.transform = 'scale(1)';
                }, 300);
            }, 100);
        }
        
        // Success animation for promo input
        promoInput.style.border = '3px solid rgb(76, 175, 80)';
        promoInput.style.background = 'rgba(76, 175, 80, 0.1)';
        promoInput.disabled = true;
        
        setTimeout(() => {
            promoInput.style.border = '2px solid rgba(83, 216, 214, 0.3)';
            promoInput.style.background = 'rgba(255, 255, 255, 0.9)';
        }, 2000);
        
        updateCartTotals();
        showSuccessMessage(message);
    }
    
    // Add recommendation with amazing animation
    function addRecommendation(itemType) {
        const recommendations = {
            'smartwatch': { name: 'Smart Watch Pro', price: 180000, icon: '⌚' },
            'powerbank': { name: 'Power Bank 20K mAh', price: 35000, icon: '🔋' },
            'case': { name: 'Phone Protection Case', price: 15000, icon: '📱' },
            'charger': { name: 'Fast Wireless Charger', price: 25000, icon: '⚡' }
        };
        
        const item = recommendations[itemType];
        if (!item) return;
        
        // Create flying animation
        const recItem = event.target.closest('.recommendation-item');
        const clone = recItem.cloneNode(true);
        const cart = document.querySelector('.cart-summary');
        
        // Position clone at original location
        const rect = recItem.getBoundingClientRect();
        clone.style.position = 'fixed';
        clone.style.top = rect.top + 'px';
        clone.style.left = rect.left + 'px';
        clone.style.width = rect.width + 'px';
        clone.style.height = rect.height + 'px';
        clone.style.zIndex = '9999';
        clone.style.pointerEvents = 'none';
        
        document.body.appendChild(clone);
        
        // Animate to cart
        const cartRect = cart.getBoundingClientRect();
        setTimeout(() => {
            clone.style.transform = `translate(${cartRect.left - rect.left + 50}px, ${cartRect.top - rect.top + 50}px) scale(0.3) rotate(360deg)`;
            clone.style.opacity = '0.7';
        }, 100);
        
        setTimeout(() => {
            clone.remove();
            
            // Add sparkle effect to cart
            cart.style.transform = 'scale(1.05)';
            cart.style.boxShadow = '0 0 30px rgba(83, 216, 214, 0.6)';
            
            setTimeout(() => {
                cart.style.transform = 'scale(1)';
                cart.style.boxShadow = '0 15px 35px rgba(21, 36, 22, 0.1)';
            }, 300);
            
            showSuccessMessage(`✨ ${item.name} added to cart!\n\n🎉 Great choice! This item complements your current selection.`);
        }, 1000);
        
        // Original item bounce animation
        recItem.style.transform = 'scale(0.9)';
        setTimeout(() => {
            recItem.style.transform = 'scale(1.1)';
            setTimeout(() => {
                recItem.style.transform = 'scale(1)';
            }, 200);
        }, 100);
    }
    
    // Calculate subtotal
    function calculateSubtotal() {
        return Object.values(cartItems).reduce((total, item) => {
            return total + (item.unitPrice * item.quantity);
        }, 0);
    }
    
    // Calculate total savings
    function calculateSavings() {
        return Object.values(cartItems).reduce((total, item) => {
            return total + ((item.originalPrice - item.unitPrice) * item.quantity);
        }, 0);
    }
    
    // Update cart totals with animations
    function updateCartTotals() {
        const subtotal = calculateSubtotal();
        const savings = calculateSavings();
        const totalItems = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
        
        // Get promo discount
        const promoDiscountElement = document.getElementById('promo-discount');
        const promoDiscountText = promoDiscountElement.textContent.replace(/[^\d]/g, '');
        const promoDiscount = promoDiscountText ? parseInt(promoDiscountText) : 0;
        
        const finalTotal = subtotal - promoDiscount;
        
        // Update with animations
        animateNumberChange('subtotal', subtotal);
        animateNumberChange('total', finalTotal);
        animateNumberChange('savings', savings);
        animateNumberChange('total-items', totalItems);
        animateNumberChange('total-savings', Math.floor(savings / 1000) + 'K');
    }
    
    // Animate number changes
    function animateNumberChange(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.style.transform = 'scale(1.2)';
        element.style.color = 'rgb(190, 227, 87)';
        
        setTimeout(() => {
            if (typeof newValue === 'number' && newValue > 1000) {
                element.textContent = `${newValue.toLocaleString()} RWF`;
            } else {
                element.textContent = newValue;
            }
            
            element.style.transform = 'scale(1)';
            element.style.color = elementId.includes('savings') ? 'rgba(255, 100, 100, 0.8)' : 'rgb(83, 216, 214)';
        }, 300);
    }
    
    // Proceed to checkout with spectacular animation
    function proceedToCheckout() {
        const button = document.querySelector('.checkout-btn');
        const originalText = button.innerHTML;
        
        // Check if cart is empty
        if (Object.keys(cartItems).length === 0) {
            showErrorMessage('🛒 Your cart is empty!\n\nAdd some items before proceeding to checkout.');
            return;
        }
        
        // Loading animation
        button.innerHTML = '⏳ Processing... <span class="loading"></span>';
        button.disabled = true;
        
        // Add pulsing effect
        button.style.animation = 'pulse 1s infinite';
        
        setTimeout(() => {
            button.innerHTML = '✅ Redirecting to Checkout...';
            button.style.background = 'linear-gradient(45deg, rgb(76, 175, 80), rgb(129, 199, 132))';
            
            setTimeout(() => {
                // Reset button
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.animation = '';
                button.style.background = 'linear-gradient(45deg, rgb(83, 216, 214), rgb(190, 227, 87))';
                
                // Show success and redirect
                showSuccessMessage('🚀 Proceeding to Checkout!\n\n✨ You will be redirected to our secure checkout page.');
                
                setTimeout(() => {
                    alert('🔄 Redirecting to checkout page...\n\nIn a real implementation, this would navigate to the checkout page.');
                }, 1500);
            }, 2000);
        }, 3000);
    }
    
    // Continue shopping
    function continueShopping() {
        showSuccessMessage('🛍️ Happy Shopping!\n\n✨ Redirecting you back to our amazing products...');
        
        setTimeout(() => {
            alert('🔄 Redirecting to homepage...\n\nIn a real implementation, this would navigate back to the product catalog.');
        }, 1500);
    }
    
    // Show success message with beautiful animation
    function showSuccessMessage(message) {
        const alert = document.createElement('div');
        alert.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                background: linear-gradient(135deg, rgba(76, 175, 80, 0.95), rgba(129, 199, 132, 0.95));
                color: white;
                padding: 2rem 3rem;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(76, 175, 80, 0.4);
                backdrop-filter: blur(20px);
                border: 2px solid rgba(255, 255, 255, 0.3);
                z-index: 10000;
                text-align: center;
                font-weight: 600;
                font-size: 1.1rem;
                line-height: 1.6;
                max-width: 400px;
                animation: successSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            ">
                ${message.replace(/\n/g, '<br>')}
            </div>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.firstElementChild.style.animation = 'successSlideOut 0.3s ease-in forwards';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }
    
    // Show error message
    function showErrorMessage(message) {
        const alert = document.createElement('div');
        alert.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                background: linear-gradient(135deg, rgba(244, 67, 54, 0.95), rgba(255, 152, 0, 0.95));
                color: white;
                padding: 2rem 3rem;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(244, 67, 54, 0.4);
                backdrop-filter: blur(20px);
                border: 2px solid rgba(255, 255, 255, 0.3);
                z-index: 10000;
                text-align: center;
                font-weight: 600;
                font-size: 1.1rem;
                line-height: 1.6;
                max-width: 400px;
                animation: errorShake 0.6s ease-in-out forwards;
            ">
                ${message.replace(/\n/g, '<br>')}
            </div>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.firstElementChild.style.animation = 'successSlideOut 0.3s ease-in forwards';
            setTimeout(() => alert.remove(), 300);
        }, 4000);
    }
    
    // Add CSS animations for messages
    const style = document.createElement('style');
    style.textContent = `
        @keyframes successSlideIn {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(-180deg);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1) rotate(-90deg);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
                opacity: 1;
            }
        }
        
        @keyframes successSlideOut {
            0% {
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(0.3) rotate(90deg);
                opacity: 0;
            }
        }
        
        @keyframes errorShake {
            0%, 100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            10%, 30%, 50%, 70%, 90% {
                transform: translate(-45%, -50%) scale(1.05);
            }
            20%, 40%, 60%, 80% {
                transform: translate(-55%, -50%) scale(0.95);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard shortcuts for power users
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + D to clear cart
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            clearCart();
        }
        
        // Ctrl/Cmd + Enter to checkout
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            proceedToCheckout();
        }
        
        // Escape to continue shopping
        if (e.key === 'Escape') {
            continueShopping();
        }
    });
    
    // Add hover sound effect simulation (visual feedback)
    document.querySelectorAll('.cart-item, .recommendation-item, .checkout-btn, .qty-btn').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Save for later functionality
    document.querySelectorAll('.save-later-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemElement = this.closest('.cart-item');
            const itemName = itemElement.querySelector('.item-name').textContent;
            
            // Animation effect
            itemElement.style.transform = 'scale(0.95)';
            itemElement.style.opacity = '0.7';
            itemElement.style.filter = 'grayscale(50%)';
            
            setTimeout(() => {
                itemElement.style.transform = 'scale(1)';
                itemElement.style.opacity = '1';
                itemElement.style.filter = 'grayscale(0%)';
                
                showSuccessMessage(`💾 ${itemName} saved for later!\n\n✨ You can find it in your "Saved Items" section.`);
            }, 500);
        });
    });
    
    // Initialize some cool effects on page load
    setTimeout(() => {
        // Add staggered animation to cart items
        document.querySelectorAll('.cart-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
        
        // Add welcome message
        setTimeout(() => {
            showSuccessMessage('🎉 Welcome to your cart!\n\n✨ Your items are ready for checkout. Don\'t forget to check our recommendations!');
        }, 1500);
    }, 500);
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.recommendation-item, .cart-summary').forEach(el => {
        observer.observe(el);
    });