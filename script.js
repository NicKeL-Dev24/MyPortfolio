// Projects Data
       const projects = [
            {
                title: "Intramurals Leaderboard and Points System",
                description: "Designed to systematically track and rank college intramural teams, the Intramurals Leaderboard and Point System records points for performance, participation, and sportsmanship to ensure transparency, fairness, and organized competition.",
                images: [
                    "assets/ILPS/assets/ilps1.jpg",
                    "assets/ILPS/assets/ilps2.jpg",
                    "assets/ILPS/assets/ilps3.jpg"
                ],
            },
            {
                title: "U'Sign",
                description: "A Bidirectional Sign Language and Speech Translator for Frontline Services at the University of Southeastern Philippines Tagum Unit using 3D Avatar Animation for Deaf Individual Students.",
                images: [
                    "assets/USIGN/assets/Flash Page.png"
                ],
            },
        ];

        let currentPageNum = 1;
        const projectsPerPage = 2;
        const totalPages = Math.ceil(projects.length / projectsPerPage);

        // Modal variables
        let currentModalImages = [];
        let currentModalIndex = 0;

        function openImageModal(images, startIndex = 0) {
            currentModalImages = images;
            currentModalIndex = startIndex;
            updateModalImage();
            document.getElementById('imageModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeImageModal() {
            document.getElementById('imageModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function changeModalImage(direction) {
            currentModalIndex += direction;
            if (currentModalIndex < 0) currentModalIndex = currentModalImages.length - 1;
            if (currentModalIndex >= currentModalImages.length) currentModalIndex = 0;
            updateModalImage();
        }

        function updateModalImage() {
            document.getElementById('modalImage').src = currentModalImages[currentModalIndex];
            document.getElementById('modalCounter').textContent = 
                `${currentModalIndex + 1} / ${currentModalImages.length}`;
        }

        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeImageModal();
            if (e.key === 'ArrowLeft') changeModalImage(-1);
            if (e.key === 'ArrowRight') changeModalImage(1);
        });

        // Close modal on background click
        document.getElementById('imageModal').addEventListener('click', function(e) {
            if (e.target === this) closeImageModal();
        });

        function renderProjects() {
            const container = document.getElementById('projectsContainer');
            const startIndex = (currentPageNum - 1) * projectsPerPage;
            const endIndex = startIndex + projectsPerPage;
            const currentProjects = projects.slice(startIndex, endIndex);

            container.innerHTML = currentProjects.map((project, index) => {
                const carouselId = `projectCarousel${startIndex + index}`;
                const hasMultipleImages = project.images.length > 1;
                
                return `
                <div class="project-section-featured">
                    <div class="project-content-featured">
                        <div class="project-label-featured">Featured Project</div>
                        <h2 class="project-title-featured">${project.title}</h2>
                        <div class="project-description-featured">
                            ${project.description}
                        </div>
                    </div>
                    <div class="project-image-featured">
                        <div class="mockup-container-featured">
                            <div class="mockup-header-featured">
                                <div class="mockup-dot-featured"></div>
                                <div class="mockup-dot-featured"></div>
                                <div class="mockup-dot-featured"></div>
                            </div>
                            <div class="mockup-content-featured" onclick="openImageModal(${JSON.stringify(project.images).replace(/"/g, '&quot;')}, 0)">
                                ${hasMultipleImages ? `
                                    <div id="${carouselId}" class="carousel slide project-carousel" data-bs-ride="carousel" data-bs-interval="3000">
                                        ${project.images.length > 1 ? `
                                            <div class="carousel-indicators">
                                                ${project.images.map((_, imgIndex) => `
                                                    <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${imgIndex}" ${imgIndex === 0 ? 'class="active"' : ''}></button>
                                                `).join('')}
                                            </div>
                                        ` : ''}
                                        <div class="carousel-inner">
                                            ${project.images.map((img, imgIndex) => `
                                                <div class="carousel-item ${imgIndex === 0 ? 'active' : ''}">
                                                    <img src="${img}" alt="${project.title} ${imgIndex + 1}">
                                                </div>
                                            `).join('')}
                                        </div>
                                        ${project.images.length > 1 ? `
                                            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon"></span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                                                <span class="carousel-control-next-icon"></span>
                                            </button>
                                        ` : ''}
                                    </div>
                                ` : `
                                    <img src="${project.images[0]}" alt="${project.title}">
                                `}
                            </div>
                        </div>
                    </div>
                </div>
            `}).join('');

            document.getElementById('currentPage').textContent = currentPageNum;
            document.getElementById('totalPages').textContent = totalPages;
            
            document.getElementById('prevBtn').disabled = currentPageNum === 1;
            document.getElementById('nextBtn').disabled = currentPageNum === totalPages;
        }

        function changePage(direction) {
            currentPageNum += direction;
            if (currentPageNum < 1) currentPageNum = 1;
            if (currentPageNum > totalPages) currentPageNum = totalPages;
            renderProjects();
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }

        // Initialize
        renderProjects();

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
            const body = encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:nm.rasonable@gmail.com?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
            this.reset();
        });

        // Cards
        const cards = document.querySelectorAll('.card-stack');
        let activeIndex = 0;

        function updatePositions(index) {
            cards.forEach((card, i) => {
                card.style.zIndex = 1;
                card.style.opacity = 0.5;

                if(i === index) {
                    card.style.transform = 'translateX(0) translateZ(0) scale(1)';
                    card.style.zIndex = 3;
                    card.style.opacity = 1;
                } else if(i === (index + 1) % cards.length) {
                    card.style.transform = 'translateX(150px) translateZ(-100px) rotateY(-15deg) scale(0.85)';
                    card.style.zIndex = 2;
                } else if(i === (index - 1 + cards.length) % cards.length) {
                    card.style.transform = 'translateX(-150px) translateZ(-100px) rotateY(15deg) scale(0.85)';
                    card.style.zIndex = 2;
                } else {
                    card.style.transform = 'translateX(0) translateZ(-200px) scale(0.7)';
                    card.style.zIndex = 1;
                }
            });
        }

        cards.forEach((card, i) => {
            card.addEventListener('click', () => {
                activeIndex = i;
                updatePositions(activeIndex);
            });
        });

        setInterval(() => {
            activeIndex = (activeIndex + 1) % cards.length;
            updatePositions(activeIndex);
        }, 5000);

        updatePositions(activeIndex);

        // Typing effect
        const titles = ['NicKeL', 'Web Developer', 'UI/UX Designer'];
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
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typingSpeed = 500;
            }

            setTimeout(typeEffect, typingSpeed);
        }

        setTimeout(typeEffect, 1000);