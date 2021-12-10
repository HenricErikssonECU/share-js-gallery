let menuOpen = false;
const onHomePage = document.querySelector(".hero-video-overlay");
const onAboutPage = document.querySelector(".about-wrapper");
const onGalleryPage = document.querySelector("#gallery-image-container");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileHeaderLink = document.getElementsByClassName("mobile-header-link");

toggleMenu = () => { 
    if(!menuOpen){ 
        mobileMenuButton.classList.add("open"); 
        menuOpen = true; 
        mobileMenu.style.right = "0%"; 
        if(onHomePage){ 
            onHomePage.style.display = "none"; 
        }else if(onAboutPage){ 
            onAboutPage.style.display = "none"; 
        }else if(onGalleryPage){ 
            onGalleryPage.style.display = "none"; 
        }
    }else{
        mobileMenuButton.classList.remove("open");
        menuOpen = false;
        mobileMenu.style.right = "-100%";
        if(onHomePage){
            onHomePage.style.display = "flex"; 
        }else if(onAboutPage){
            onAboutPage.style.display = "flex"; 
        }else if(onGalleryPage){
            onGalleryPage.style.display = "flex"; 
        }
    }
}


window.addEventListener("load", () => {
    mobileMenuButton.addEventListener("click", toggleMenu); 
})






















































