import Data from "./timeline";
import Modal from "./modal";

let timeline=document.getElementById("timeline")
let timelineHtml="";

Data.forEach(item => {
    timelineHtml+=`
        <div class="timeline-item">
            <h1 class="timeline-data">${item.title}</h1>
            <p class="timeline-data">${item.detail}</p>
            <p class="timeline-data">${item.date}</p>
            <i class="${item.iconSrc}"></i>
        </div> 
    `;
});
timeline.innerHTML=timelineHtml

let projectsPage=document.getElementById("project-grid")
let projectCard=""
Modal.forEach(item => {
    projectCard+=`
        <div class="project-item" onclick="UserDetails(${item.id})"><img src="${item.Img}">
            <h1>${item.H}</h1>
            <p>${item.category}</p>
        </div> `
});
projectsPage.innerHTML=projectCard



document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const navBar = document.querySelector('nav');
    const sections = Array.from(document.querySelectorAll('section')); 
    let scroll = [0, ...sections.map(section => section.offsetTop)]; 

    const curIndex = (scrollTop) => {
        for (let i = 1; i < scroll.length; i++) {
            if (scrollTop < scroll[i]) {
                return i - 1;
            }
        }
        return scroll.length - 1;
    };

    let ticking = false;
    const nav = () => {
        const scrollTop = window.pageYOffset;
        const currentIndex = curIndex(scrollTop);

        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === currentIndex);
        });

        if (navBar) {
            navBar.classList.toggle('scrolled', currentIndex > 0);
        }

        console.log('ScrollTop:', scrollTop, 'CurrentIndex:', currentIndex, '(0=HOME,4=CONTACT)', 'Offsets:', scroll);

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(nav);
            ticking = true;
        }
    });

    nav();


    window.addEventListener('resize', () => {
        scroll = [0, ...sections.map(section => section.offsetTop)];
        nav();
    });
});


window.UserDetails=function(index){
    const i=Modaldata[index];
    document.getElementById("modalH").textContent=i.H;
    document.getElementById("modalText").textContent=i.Text;
    document.getElementById("modalLanguage").textContent=i.Languages;
    document.getElementById("modalimage").src = i.Img;
    const x=document.getElementById("deployed");
    if (i.Dep && i.Dep!="") {
        x.href = i.Dep;
        x.classList.add('link');
        x.target = '_blank';

    }
    else {
        x.target="";
        x.removeAttribute("href");
        x.classList.remove('link');
        
    }

    document.getElementById("details").onclick = () => {
        window.open(i.Link, "_blank");
    };

    document.getElementById("modal").style.display = "flex";
    document.getElementById("modal").classList.add("active");
}


window.closeModal=function() {
    document.getElementById("modal").classList.remove("active");
    document.getElementById("modal").style.display="none";
}

window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        closeModal()
        
    }
}