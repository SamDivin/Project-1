document.addEventListener('DOMContentLoaded', function() {
    
    // User Options Toggle
    const guestOption = document.getElementById('guest-option');
    const loginOption = document.getElementById('login-option');
    
    guestOption.addEventListener('click', function() {
        guestOption.classList.add('active');
        loginOption.classList.remove('active');
    });
    
    loginOption.addEventListener('click', function() {
        loginOption.classList.add('active');
        guestOption.classList.remove('active');
        alert('🔐 Sign In\n\nRedirect to login form or show login modal here.');
    });
    
    // Shipping Options
    const shippingOptions = document.querySelectorAll('.shipping-option');
    const shippingCost = document.getElementById('shipping-cost');
    
    shippingOptions.forEach(option => {
        option.addEventListener('click', function() {
            shippingOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const price = parseInt(this.dataset.price);
            shippingCost.textContent = price === 0 ? 'FREE' : `${price.toLocaleString()} RWF`;
            updateTotals();
        });
    });
    
    // Payment Methods
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelectorAll('.payment-form');
    const codFeeRow = document.getElementById('cod-fee-row');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all payment forms
            paymentForms.forEach(form => form.style.display = 'none');
            
            // Show selected payment form
            const methodType = this.dataset.method;
            const selectedForm = document.getElementById(`${methodType}-form`);
            if (selectedForm) {
                selectedForm.style.display = 'block';
            }
            
            // Show/hide COD fee
            if (methodType === 'cod') {
                codFeeRow.style.display = 'flex';
            } else {
                codFeeRow.style.display = 'none';
            }
            
            updateTotals();
        });
    });
    
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
        });
    }
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Province auto-fill based on city
    const cityInput = document.getElementById('city');
    const provinceSelect = document.getElementById('province');
    
    if (cityInput && provinceSelect) {
        cityInput.addEventListener('blur', function() {
            const city = this.value.toLowerCase();
            if (city.includes('kigali')) {
                provinceSelect.value = 'Kigali';
            }
        });
    }
});

// Update quantity function
function updateQty(button, change) {
    const qtyElement = button.parentElement.querySelector('.qty-number');
    let currentQty = parseInt(qtyElement.textContent);
    const newQty = Math.max(1, currentQty + change);
    qtyElement.textContent = newQty;
    
    // Update item price
    const cartItem = button.closest('.cart-item');
    const itemName = cartItem.querySelector('.item-name').textContent;
    const itemPriceElement = cartItem.querySelector('.item-price');
    
    let unitPrice;
    if (itemName.includes('Smartphone')) unitPrice = 749000;
    else if (itemName.includes('Shoes')) unitPrice = 129000;
    else if (itemName.includes('T-Shirt')) unitPrice = 39000;
    
    const newPrice = unitPrice * newQty;
    itemPriceElement.textContent = `${newPrice.toLocaleString()} RWF`;
    
    updateTotals();
}

// Apply promo code
function applyPromo() {
    const promoInput = document.getElementById('promoCode');
    const promoCode = promoInput.value.trim().toUpperCase();
    const discountRow = document.getElementById('discount-row');
    const discountAmount = document.getElementById('discount');
    
    let discount = 0;
    
    switch (promoCode) {
        case 'WELCOME10':
            discount = 0.1;
            alert('🎉 Promo Applied!\n\n10% discount applied to your order!');
            break;
        case 'SAVE20':
            discount = 0.2;
            alert('🎉 Promo Applied!\n\n20% discount applied to your order!');
            break;
        case 'FREESHIP':
            alert('🎉 Promo Applied!\n\nFree shipping on your order!');
            // Handle free shipping logic
            break;
        default:
            if (promoCode) {
                alert('❌ Invalid Promo Code\n\nPlease check your promo code and try again.');
                return;
            }
    }
    
    if (discount > 0) {
        const subtotal = calculateSubtotal();
        const discountValue = subtotal * discount;
        discountAmount.textContent = `-${discountValue.toLocaleString()} RWF`;
        discountRow.style.display = 'flex';
    }
    
    updateTotals();
}

// Calculate subtotal
function calculateSubtotal() {
    let subtotal = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.item-price').textContent;
        const price = parseInt(priceText.replace(/[^\d]/g, ''));
        subtotal += price;
    });
    
    return subtotal;
}

// Update totals
function updateTotals() {
    const subtotal = calculateSubtotal();
    const subtotalElement = document.getElementById('subtotal');
    subtotalElement.textContent = `${subtotal.toLocaleString()} RWF`;
    
    // Get shipping cost
    const activeShipping = document.querySelector('.shipping-option.active');
    const shippingCost = activeShipping ? parseInt(activeShipping.dataset.price) : 0;
    
    // Get discount
    const discountElement = document.getElementById('discount');
    const discountText = discountElement.textContent.replace(/[^\d]/g, '');
    const discount = discountText ? parseInt(discountText) : 0;
    
    // Calculate tax (18% VAT)
    const taxableAmount = subtotal - discount;
    const tax = Math.round(taxableAmount * 0.18);
    document.getElementById('tax').textContent = `${tax.toLocaleString()} RWF`;
    
    // COD fee
    const activePayment = document.querySelector('.payment-method.active');
    const codFee = activePayment && activePayment.dataset.method === 'cod' ? 2000 : 0;
    
    // Calculate final total
    const finalTotal = subtotal + shippingCost + tax - discount + codFee;
    document.getElementById('final-total').textContent = `${finalTotal.toLocaleString()} RWF`;
    document.getElementById('order-total').textContent = `${finalTotal.toLocaleString()} RWF`;
}

// Place order function
function placeOrder() {
    // Basic form validation
    const requiredFields = [
        'email', 'phone', 'firstName', 'lastName', 
        'address1', 'city', 'province', 'country'
    ];
    
    let isValid = true;
    let firstInvalidField = null;
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field.value.trim()) {
            field.style.borderColor = '#ff4444';
            if (!firstInvalidField) firstInvalidField = field;
            isValid = false;
        } else {
            field.style.borderColor = 'rgba(83, 216, 214, 0.3)';
        }
    });
    
    // Validate payment method specific fields
    const activePayment = document.querySelector('.payment-method.active');
    if (activePayment) {
        const method = activePayment.dataset.method;
        if (method === 'card') {
            const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
            cardFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff4444';
                    if (!firstInvalidField) firstInvalidField = field;
                    isValid = false;
                }
            });
        }
    }
    
    if (!isValid) {
        alert('❌ Please fill in all required fields\n\nMissing information has been highlighted in red.');
        if (firstInvalidField) {
            firstInvalidField.focus();
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Show loading state
    const button = document.querySelector('.place-order-btn');
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Processing Order...';
    button.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Show success message
        alert(`🎉 Order Placed Successfully!\n\n📧 Confirmation sent to: ${document.getElementById('email').value}\n📦 Order Number: #EXM${Date.now().toString().slice(-6)}\n\n✨ Thank you for shopping with ExoraMarket!\n\n🚚 You'll receive tracking information once your order ships.\n📞 Questions? Call: +250 788 123 456`);
        
        // Redirect to confirmation page (simulate)
        setTimeout(() => {
            alert('🔄 Redirecting to order confirmation page...');
        }, 2000);
        
    }, 3000);
}

// Initialize totals on page load
updateTotals();