document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');
    const content = document.getElementById('content');
    const pageTitle = document.getElementById('pageTitle');
    const pageContent = document.getElementById('pageContent');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // Route handling
    function handleRouteChange(hash) {
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current link
        const currentLink = document.querySelector(`.nav-links a[href="${hash}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }

        // Update content based on route
        updateContent(hash);
    }

    // Update page content based on route
    function updateContent(hash) {
        const contentMap = {
            '#home': {
                title: 'Welcome to Our Website',
                text: 'This is the home page. Explore our website using the navigation menu above.'
            },
            '#about': {
                title: 'About Us',
                text: 'Learn more about our company, mission, and values on this about page.'
            },
            '#services': {
                title: 'Our Services',
                text: 'Discover the range of services we offer to meet your needs.'
            },
            '#portfolio': {
                title: 'Our Portfolio',
                text: 'View our portfolio of work and see examples of what we can do.'
            },
            '#contact': {
                title: 'Contact Us',
                text: 'Get in touch with our team for inquiries or collaborations.'
            }
        };

        const defaultContent = {
            title: 'Page Not Found',
            text: 'The page you are looking for does not exist.'
        };

        const routeContent = contentMap[hash] || defaultContent;
        pageTitle.textContent = routeContent.title;
        pageContent.textContent = routeContent.text;
    }

    // Initial route handling
    const initialHash = window.location.hash || '#home';
    handleRouteChange(initialHash);

    // Handle navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const hash = this.getAttribute('href');
            window.location.hash = hash;
            handleRouteChange(hash);
        });
    });

    // Handle browser back/forward
    window.addEventListener('hashchange', function() {
        handleRouteChange(window.location.hash);
    });
});
