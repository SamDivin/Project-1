  // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Initialize particles
        createParticles();

        // Main functionality
        const overlayBtn = document.getElementById('overlay-btn');
        const container = document.getElementById('container');
        const overlayTitle = document.getElementById('overlay-title');
        const overlayText = document.getElementById('overlay-text');

        let isSignUpMode = false;

        overlayBtn.addEventListener('click', () => {
            // Add loading state
            overlayBtn.classList.add('loading');
            
            setTimeout(() => {
                if (!isSignUpMode) {
                    // Switch to sign-up mode
                    container.classList.add("right-panel-active");
                    overlayTitle.textContent = "Welcome Back!";
                    overlayText.textContent = "Enter your personal details to use all of site features";
                    overlayBtn.textContent = "Sign In";
                    isSignUpMode = true;
                } else {
                    // Switch to sign-in mode
                    container.classList.remove("right-panel-active");
                    overlayTitle.textContent = "Hello, Friend!";
                    overlayText.textContent = "Register with your personal details to use all of site features";
                    overlayBtn.textContent = "Sign Up";
                    isSignUpMode = false;
                }
                
                overlayBtn.classList.remove('loading');
            }, 300);
        });

        // Add form validation feedback
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.length > 0) {
                    this.style.borderColor = '#4facfe';
                    this.style.backgroundColor = 'rgba(79, 172, 254, 0.05)';
                } else {
                    this.style.borderColor = 'transparent';
                    this.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                }
            });
        });

        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s linear;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);