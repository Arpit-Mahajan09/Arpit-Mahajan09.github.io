document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const navBar = document.querySelector('nav');
    const sections = Array.from(document.querySelectorAll('section')); 
    let sectionOffsets = [0, ...sections.map(section => section.offsetTop)]; 
    const getCurrentIndex = (scrollTop) => {
        for (let i = 1; i < sectionOffsets.length; i++) {
            if (scrollTop < sectionOffsets[i]) {
                return i - 1;
            }
        }
        return sectionOffsets.length - 1;
    };

    let ticking = false;
    const updateNav = () => {
        const scrollTop = window.pageYOffset;
        const currentIndex = getCurrentIndex(scrollTop);

        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === currentIndex);
        });

        if (navBar) {
            navBar.classList.toggle('scrolled', currentIndex > 0);
        }

        console.log('ScrollTop:', scrollTop, 'CurrentIndex:', currentIndex, '(0=HOME,4=CONTACT)', 'Offsets:', sectionOffsets);

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    });

    updateNav();


    window.addEventListener('resize', () => {
        sectionOffsets = [0, ...sections.map(section => section.offsetTop)];
        updateNav();
    });
});


const modal1 ={
    H: "Personal Website",
    Text: "Created personal website as a project to show resume.",
    Languages: "HTML , JAVA , CSS",
    Link: "https://arpit-mahajan09.github.io", 
    Img: "images/image.png"
}

function UserDetails(i){
    document.getElementById("modalH").textContent=i.H;
    document.getElementById("modalText").textContent=i.Text;
    document.getElementById("modalLanguage").textContent=i.Languages;
    document.getElementById("modalimage").src = i.Img;


    document.getElementById("details").onclick = () => {
        window.open(i.Link, "_blank");
    };

    document.getElementById("modal").style.display = "flex";

}


function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        closeModal()
    }
}