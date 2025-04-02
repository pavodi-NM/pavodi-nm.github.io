// Main script functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Dark/Light theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        if (icon.classList.contains('fa-moon')) {
            // Switch to light theme
            document.documentElement.style.setProperty('--primary-bg', '#f8f9fa');
            document.documentElement.style.setProperty('--secondary-bg', '#e9ecef');
            document.documentElement.style.setProperty('--card-bg', '#dee2e6');
            document.documentElement.style.setProperty('--text-primary', '#212529');
            document.documentElement.style.setProperty('--text-secondary', '#495057');
            document.documentElement.style.setProperty('--border-color', '#ced4da');
            
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            // Switch to dark theme
            document.documentElement.style.setProperty('--primary-bg', '#0d1117');
            document.documentElement.style.setProperty('--secondary-bg', '#161b22');
            document.documentElement.style.setProperty('--card-bg', '#21262d');
            document.documentElement.style.setProperty('--text-primary', '#c9d1d9');
            document.documentElement.style.setProperty('--text-secondary', '#8b949e');
            document.documentElement.style.setProperty('--border-color', '#30363d');
            
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Add animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.opacity = '0';
        item.style.animation = 'fadeInUp 0.6s forwards';
    });
    
    // CV Modal functionality
    const cvModal = document.getElementById('cv-modal');
    const openCvModalBtn = document.getElementById('open-cv-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const viewFullCvBtn = document.getElementById('view-full-cv');
    
    // Modal tabs
    const timelineTab = document.getElementById('timeline-tab');
    const pdfTab = document.getElementById('pdf-tab');
    const timelineView = document.getElementById('timeline-view');
    const pdfView = document.getElementById('pdf-view');
    
    // Function to switch tabs
    function switchTab(activeTab, activeView, inactiveTab, inactiveView) {
        activeTab.classList.add('active');
        inactiveTab.classList.remove('active');
        activeView.style.display = 'block';
        inactiveView.style.display = 'none';
    }
    
    // Tab event listeners
    if (timelineTab && pdfTab) {
        timelineTab.addEventListener('click', () => {
            switchTab(timelineTab, timelineView, pdfTab, pdfView);
        });
        
        pdfTab.addEventListener('click', () => {
            switchTab(pdfTab, pdfView, timelineTab, timelineView);
        });
    }
    
    // Function to open modal
    function openModal() {
        cvModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling on background
        
        // Default to timeline view when opening modal
        if (timelineTab && pdfTab) {
            switchTab(timelineTab, timelineView, pdfTab, pdfView);
        }
        
        // Trigger scroll animation for timeline items
        setTimeout(animateOnScroll, 100);
    }
    
    // Function to close modal
    function closeModal() {
        cvModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    // Event listeners for modal
    if (openCvModalBtn) {
        openCvModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (viewFullCvBtn) {
        viewFullCvBtn.addEventListener('click', openModal);
    }
    
    // Close modal when clicking outside of modal content
    cvModal.addEventListener('click', (e) => {
        if (e.target === cvModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateOnScroll() {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial state for timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });
    
    // Check for scroll in modal
    if (cvModal) {
        const modalBody = cvModal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.addEventListener('scroll', animateOnScroll);
        }
    }
    
    // CV preview card hover effect
    const cvPreviewCards = document.querySelectorAll('.cv-preview-card');
    
    cvPreviewCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cvPreviewCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.6';
                    c.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            cvPreviewCards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = 'scale(1)';
            });
        });
    });
}); 