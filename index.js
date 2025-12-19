document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const navBar = document.querySelector('nav');
    const sections = Array.from(document.querySelectorAll('section')); // about, skills, project, contact
    let sectionOffsets = [0, ...sections.map(section => section.offsetTop)]; // [0 (home), aboutTop, skillsTop, projectTop, contactTop]

    const getCurrentIndex = (scrollTop) => {
        for (let i = 1; i < sectionOffsets.length; i++) {
            if (scrollTop < sectionOffsets[i]) {
                return i - 1;
            }
        }
        return sectionOffsets.length - 1; // Last (contact) if at or past its start
    };

    let ticking = false;
    const updateNav = () => {
        const scrollTop = window.pageYOffset;
        const currentIndex = getCurrentIndex(scrollTop);

        // Remove active from all, add to current
        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === currentIndex);
        });

        // Toggle scrolled on nav (not home)
        if (navBar) {
            navBar.classList.toggle('scrolled', currentIndex > 0);
        }

        // TEMP DEBUG: Log to console—remove after testing
        console.log('ScrollTop:', scrollTop, 'CurrentIndex:', currentIndex, '(0=HOME,4=CONTACT)', 'Offsets:', sectionOffsets);

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    });

    // Initial state
    updateNav();

    // Recalc offsets on resize (for responsive tweaks)
    window.addEventListener('resize', () => {
        sectionOffsets = [0, ...sections.map(section => section.offsetTop)];
        updateNav();
    });
});