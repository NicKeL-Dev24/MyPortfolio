        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:nm.rasonable@gmail.com?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
            this.reset();
        });


        //CARDS
        const cards = document.querySelectorAll('.card-stack');
        let activeIndex = 0;

        // Positions: left, center, right
        function updatePositions(index) {
            cards.forEach((card, i) => {
                card.style.zIndex = 1;
                card.style.opacity = 0.5;

                if(i === index) { // center
                    card.style.transform = 'translateX(0) translateZ(0) scale(1)';
                    card.style.zIndex = 3;
                    card.style.opacity = 1;
                } else if(i === (index + 1) % cards.length) { // right
                    card.style.transform = 'translateX(150px) translateZ(-100px) rotateY(-15deg) scale(0.85)';
                    card.style.zIndex = 2;
                } else if(i === (index - 1 + cards.length) % cards.length) { // left
                    card.style.transform = 'translateX(-150px) translateZ(-100px) rotateY(15deg) scale(0.85)';
                    card.style.zIndex = 2;
                } else { // hidden back cards (if more than 3)
                    card.style.transform = 'translateX(0) translateZ(-200px) scale(0.7)';
                    card.style.zIndex = 1;
                }
            });
        }

        // Click Carousel in About
        cards.forEach((card, i) => {
            card.addEventListener('click', () => {
                activeIndex = i;
                updatePositions(activeIndex);
            });
        });

        // Auto rotation every 5 seconds
        setInterval(() => {
            activeIndex = (activeIndex + 1) % cards.length;
            updatePositions(activeIndex);
        }, 5000);

        // Initialize
        updatePositions(activeIndex);

         // Typing effect for hero title
        const titles = ['NicKeL', 'Frontend Developer', 'UI/UX Designer'];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 10;
        const typingElement = document.querySelector('.typing-text');

        function typeEffect() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 100;
            } else {
                typingElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typingSpeed = 500; // Pause before starting new word
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Start typing effect after page loads
        setTimeout(typeEffect, 1000);

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

