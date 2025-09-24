// Create security particles
function createSecurityParticles() {
    const particles = document.getElementById('security-particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'security-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
        particle.style.width = particle.style.height = (Math.random() * 15 + 10) + 'px';
        particles.appendChild(particle);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createSecurityParticles();
    initializePaymentMethods();
    initializeFormValidation();
});

// Payment method switching
function initializePaymentMethods() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentForms = document.querySelectorAll('.payment-form');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const method = this.dataset.method;
            
            // Remove active class from all options and forms
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            paymentForms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked option and corresponding form
            this.classList.add('active');
            document.getElementById(`${method}-form`).classList.add('active');
            
            // Show success message
            showPaymentMessage(`💳 ${this.querySelector('.payment-name').textContent} selected!`, 'success');
        });
    });
    
    // Mobile Money provider selection
    const momoProviders = document.querySelectorAll('.momo-provider');
    momoProviders.forEach(provider => {
        provider.addEventListener('click', function() {
            momoProviders.forEach(p => p.classList.remove('selected'));
            this.classList.add('selected');
            showPaymentMessage(`📱 ${this.querySelector('.provider-name').textContent} selected!`, 'success');
        });
    });
    
    // Bank selection
    const bankOptions = document.querySelectorAll('.bank-option');
    bankOptions.forEach(bank => {
        bank.addEventListener('click', function() {
            bankOptions.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            showPaymentMessage(`🏦 ${this.querySelector('.provider-name').textContent} selected!`, 'success');
        });
    });
}

// Form validation with real-time feedback
function initializeFormValidation() {
    const cardNumber = document.getElementById('card-number');
    const cardExpiry = document.getElementById('card-expiry');
    const cardCvv = document.getElementById('card-cvv');
    const cardName = document.getElementById('card-name');
    const momoNumber = document.getElementById('momo-number');
    const accountNumber = document.getElementById('account-number');
    
    // Card number validation and formatting
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
            
            validateCardNumber(value.replace(/\s/g, ''));
        });
    }
    
    // Expiry date formatting
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
            
            validateExpiry(value);
        });
    }
    
    // CVV validation
    if (cardCvv) {
        cardCvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
            validateCvv(e.target.value);
        });
    }
    
    // Name validation
    if (cardName) {
        cardName.addEventListener('input', function(e) {
            validateName(e.target.value);
        });
    }
    
    // Mobile number validation
    if (momoNumber) {
        momoNumber.addEventListener('input', function(e) {
            validateMomoNumber(e.target.value);
        });
    }
    
    // Account number validation
    if (accountNumber) {
        accountNumber.addEventListener('input', function(e) {
            validateAccountNumber(e.target.value);
        });
    }
}

// Card validation functions
function validateCardNumber(number) {
    const cardTypeIcon = document.getElementById('card-type');
    const validationIndicator = document.getElementById('card-validation');
    
    // Detect card type
    if (number.startsWith('4')) {
        cardTypeIcon.textContent = '💳'; // Visa
    } else if (number.startsWith('5') || number.startsWith('2')) {
        cardTypeIcon.textContent = '💳'; // Mastercard
    } else if (number.startsWith('3')) {
        cardTypeIcon.textContent = '💳'; // American Express
    } else {
        cardTypeIcon.textContent = '💳';
    }
    
    // Validate using Luhn algorithm
    const isValid = number.length >= 13 && luhnCheck(number);
    updateValidationIndicator(validationIndicator, isValid);
    
    return isValid;
}

function validateExpiry(expiry) {
    const validationIndicator = document.getElementById('expiry-validation');
    const isValid = /^\d{2}\/\d{2}$/.test(expiry);
    
    if (isValid) {
        const [month, year] = expiry.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        const isValidDate = 
            month >= 1 && month <= 12 &&
            (year > currentYear || (year == currentYear && month >= currentMonth));
        
        updateValidationIndicator(validationIndicator, isValidDate);
        return isValidDate;
    }
    
    updateValidationIndicator(validationIndicator, false);
    return false;
}

function validateCvv(cvv) {
    const validationIndicator = document.getElementById('cvv-validation');
    const isValid = cvv.length >= 3 && cvv.length <= 4;
    updateValidationIndicator(validationIndicator, isValid);
    return isValid;
}

function validateName(name) {
    const validationIndicator = document.getElementById('name-validation');
    const isValid = name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    updateValidationIndicator(validationIndicator, isValid);
    return isValid;
}

function validateMomoNumber(number) {
    const validationIndicator = document.getElementById('momo-validation');
    const isValid = /^\+250\s?7[0-9]{8}$/.test(number);
    updateValidationIndicator(validationIndicator, isValid);
    return isValid;
}

function validateAccountNumber(account) {
    const validationIndicator = document.getElementById('account-validation');
    const isValid = account.length >= 10 && /^\d+$/.test(account);
    updateValidationIndicator(validationIndicator, isValid);
    return isValid;
}

// Luhn algorithm for card validation
function luhnCheck(cardNumber) {
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

// Update validation indicator
function updateValidationIndicator(indicator, isValid) {
    if (!indicator) return;
    
    indicator.classList.remove('valid', 'invalid');
    
    if (isValid) {
        indicator.textContent = '✅';
        indicator.classList.add('valid');
    } else {
        indicator.textContent = '❌';
        indicator.classList.add('invalid');
    }
}

// Process payment with spectacular animation
function processPayment() {
    const button = document.querySelector('.complete-payment-btn');
    const activePaymentMethod = document.querySelector('.payment-option.active');
    const methodName = activePaymentMethod.querySelector('.payment-name').textContent;
    
    // Validate current payment method
    if (!validateCurrentPaymentMethod()) {
        showPaymentMessage('❌ Please fill in all required fields correctly', 'error');
        return;
    }
    
    // Start processing animation
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Processing Payment... <span class="processing">🔄</span>';
    button.disabled = true;
    
    // Add processing effects
    button.style.background = 'linear-gradient(45deg, rgba(255, 193, 7, 0.8), rgba(255, 235, 59, 0.8))';
    button.style.animation = 'securityPulse 1s infinite';
    
    // Simulate payment processing
    setTimeout(() => {
        // Success state
        button.innerHTML = '✅ Payment Successful!';
        button.style.background = 'linear-gradient(45deg, rgba(76, 175, 80, 0.8), rgba(129, 199, 132, 0.8))';
        button.style.animation = '';
        
        // Show success animation
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = 'linear-gradient(45deg, rgb(83, 216, 214), rgb(190, 227, 87))';
            
            // Success message and redirect
            showPaymentMessage(
                `🎉 Payment Successful!\n\n💳 Method: ${methodName}\n💰 Amount: 1,001,000 RWF\n📧 Confirmation sent to your email\n\n✨ Redirecting to confirmation page...`,
                'success'
            );
            
            setTimeout(() => {
                alert('🔄 Redirecting to order confirmation...\n\nIn a real implementation, this would navigate to the confirmation page with order details.');
            }, 2000);
            
        }, 2000);
    }, 4000);
}

// Validate current payment method
function validateCurrentPaymentMethod() {
    const activeForm = document.querySelector('.payment-form.active');
    const activeMethod = document.querySelector('.payment-option.active').dataset.method;
    
    switch (activeMethod) {
        case 'card':
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCvv = document.getElementById('card-cvv').value;
            const cardName = document.getElementById('card-name').value;
            
            return validateCardNumber(cardNumber) && 
                    validateExpiry(cardExpiry) && 
                    validateCvv(cardCvv) && 
                    validateName(cardName);
        
        case 'momo':
            const selectedProvider = document.querySelector('.momo-provider.selected');
            const momoNumber = document.getElementById('momo-number').value;
            return selectedProvider && validateMomoNumber(momoNumber);
        
        case 'bank':
            const selectedBank = document.querySelector('.bank-option.selected');
            const accountNumber = document.getElementById('account-number').value;
            return selectedBank && validateAccountNumber(accountNumber);
        
        case 'paypal':
            return true; // PayPal validation happens on their side
        
        default:
            return false;
    }
}

// Show payment messages with advanced animations
function showPaymentMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    const isSuccess = type === 'success';
    
    messageDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, 
                ${isSuccess ? 'rgba(76, 175, 80, 0.95), rgba(129, 199, 132, 0.95)' : 'rgba(244, 67, 54, 0.95), rgba(255, 152, 0, 0.95)'});
            color: white;
            padding: 2.5rem 3rem;
            border-radius: 25px;
            box-shadow: 0 25px 60px ${isSuccess ? 'rgba(76, 175, 80, 0.4)' : 'rgba(244, 67, 54, 0.4)'};
            backdrop-filter: blur(20px);
            border: 2px solid rgba(255, 255, 255, 0.3);
            z-index: 10000;
            text-align: center;
            font-weight: 600;
            font-size: 1.2rem;
            line-height: 1.8;
            max-width: 450px;
            animation: ${isSuccess ? 'paymentSuccess' : 'paymentError'} 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        ">
            ${message.replace(/\n/g, '<br>')}
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.firstElementChild.style.animation = 'paymentMessageOut 0.4s ease-in forwards';
        setTimeout(() => messageDiv.remove(), 400);
    }, isSuccess ? 4000 : 3000);
}

// Add CSS animations for payment messages
const paymentStyle = document.createElement('style');
paymentStyle.textContent = `
    @keyframes paymentSuccess {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1) rotate(-90deg);
            opacity: 0.9;
        }
        100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
    }
    
    @keyframes paymentError {
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
    
    @keyframes paymentMessageOut {
        0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.3) rotate(90deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(paymentStyle);

// Add keyboard shortcuts for power users
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to process payment
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        processPayment();
    }
    
    // Tab through payment methods with number keys
    if (e.key >= '1' && e.key <= '4') {
        const paymentOptions = document.querySelectorAll('.payment-option');
        const index = parseInt(e.key) - 1;
        if (paymentOptions[index]) {
            paymentOptions[index].click();
        }
    }
});

// Add hover sound effect simulation (visual feedback)
document.querySelectorAll('.payment-option, .momo-provider, .bank-option, .complete-payment-btn').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) saturate(1.2)';
        this.style.transition = 'all 0.2s ease';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1) saturate(1)';
    });
});

// Real-time security indicators
function updateSecurityLevel() {
    const securityBadges = document.querySelectorAll('.security-badge');
    const securityFeatures = document.querySelector('.security-features');
    
    // Animate security badges
    securityBadges.forEach((badge, index) => {
        setTimeout(() => {
            badge.style.animation = 'securityGlow 0.5s ease-in-out';
            setTimeout(() => {
                badge.style.animation = 'securityGlow 2s infinite';
            }, 500);
        }, index * 200);
    });
    
    // Update security level based on user interaction
    setTimeout(() => {
        if (securityFeatures) {
            securityFeatures.style.border = '2px solid rgba(76, 175, 80, 0.5)';
            securityFeatures.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(129, 199, 132, 0.15))';
        }
    }, 2000);
}

// Initialize security updates
setTimeout(updateSecurityLevel, 1000);

// Add dynamic pricing updates (simulate real-time changes)
function simulatePriceUpdates() {
    const priceElements = document.querySelectorAll('.price-value');
    
    priceElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.color = 'rgb(190, 227, 87)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = this.classList.contains('savings-value') ? 'rgba(255, 100, 100, 0.8)' : 'rgb(83, 216, 214)';
        });
    });
}

simulatePriceUpdates();

// Add order item hover effects
document.querySelectorAll('.order-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Progressive form validation feedback
let validationScore = 0;

function updateValidationScore() {
    const activeForm = document.querySelector('.payment-form.active');
    if (!activeForm) return;
    
    const validInputs = activeForm.querySelectorAll('.validation-indicator.valid');
    const totalInputs = activeForm.querySelectorAll('.validation-indicator');
    
    const newScore = totalInputs.length > 0 ? (validInputs.length / totalInputs.length) * 100 : 0;
    
    if (newScore !== validationScore) {
        validationScore = newScore;
        updatePaymentButtonState(validationScore);
    }
}

function updatePaymentButtonState(score) {
    const button = document.querySelector('.complete-payment-btn');
    
    if (score >= 100) {
        button.style.background = 'linear-gradient(45deg, rgb(76, 175, 80), rgb(129, 199, 132))';
        button.style.transform = 'scale(1.02)';
        button.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.4)';
    } else if (score >= 50) {
        button.style.background = 'linear-gradient(45deg, rgb(255, 193, 7), rgb(255, 235, 59))';
    } else {
        button.style.background = 'linear-gradient(45deg, rgb(83, 216, 214), rgb(190, 227, 87))';
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 15px 35px rgba(21, 36, 22, 0.1)';
    }
}

// Monitor validation changes
setInterval(updateValidationScore, 500);

// Add staggered animations for page elements
setTimeout(() => {
    const elements = [
        ...document.querySelectorAll('.payment-option'),
        ...document.querySelectorAll('.order-item'),
        ...document.querySelectorAll('.security-feature')
    ];
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}, 500);

// Add welcome message
setTimeout(() => {
    showPaymentMessage('🔐 Welcome to Secure Payment!\n\n✨ Your transaction is protected with bank-level security.\n🛡️ All payment information is encrypted.\n💳 Choose your preferred payment method below.', 'success');
}, 2000);

// Intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.security-features, .trust-indicators').forEach(el => {
    observer.observe(el);
});

// Auto-focus first input when payment method is selected
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
        setTimeout(() => {
            const activeForm = document.querySelector('.payment-form.active');
            const firstInput = activeForm?.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
    });
});

// Add payment method specific hints
function showPaymentHints(method) {
    const hints = {
        card: '💡 Tip: Your card information is encrypted and never stored on our servers.',
        momo: '💡 Tip: You will receive an SMS prompt on your mobile phone to confirm payment.',
        bank: '💡 Tip: Bank transfers may take 1-2 business days to process.',
        paypal: '💡 Tip: You\'ll be redirected to PayPal\'s secure payment page.'
    };
    
    if (hints[method]) {
        setTimeout(() => {
            showPaymentMessage(hints[method], 'success');
        }, 1000);
    }
}

// Show hints when payment methods are selected
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
        const method = this.dataset.method;
        showPaymentHints(method);
    });
});
