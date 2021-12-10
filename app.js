/***************************************   HEADER   ***************************************/

/*Deklarering av globala variabler*/
/*const-variablerna är skapade för att förkorta "kod-plotter" och göra koden mer överskådlig*/
let menuOpen = false; /*boolean som berättar om mobil-menyn är öppen eller stängd*/
const onHomePage = document.querySelector(".hero-video-overlay");
const onAboutPage = document.querySelector(".about-wrapper");
const onGalleryPage = document.querySelector("#gallery-image-container");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileHeaderLink = document.getElementsByClassName("mobile-header-link");

toggleMenu = () => { /*När man klickar på meny-knappen*/
    if(!menuOpen){ /*om menyn är stängd*/
        mobileMenuButton.classList.add("open"); /*lägg till en klass som heter "open" på menyknappen*/
        menuOpen = true; /*sätt menuOpen till true, eftersom menyn nu är öppen*/
        mobileMenu.style.right = "0%"; /*sätt style 'right' till 0% (den ligger som -100% som default i css'en när menyn är stängd)*/
        if(onHomePage){ /*IF/ELSE 1: här kollar jag ifall jag är på en viss html-sida genom kolla om en viss klass eller ID finns och sätter "störande" element som ligger bakom menyn (när den är öppen) till display: none*/
            onHomePage.style.display = "none"; /*döljer klassen "hero-video-overlay" när menyn öppnas på index.html*/
        }else if(onAboutPage){ /*se IF/ELSE 1*/
            onAboutPage.style.display = "none"; /*döljer klassen "about-wrapper när menyn öppnas på about.html*/
        }else if(onGalleryPage){ /*se IF/ELSE 1*/
            onGalleryPage.style.display = "none"; /*döljer ID "gallery-image-container" när menyn öppnas på gallery.html*/
        }
    }else{
        mobileMenuButton.classList.remove("open");
        menuOpen = false;
        mobileMenu.style.right = "-100%";
        if(onHomePage){
            onHomePage.style.display = "flex"; /*sätter klassen "hero-video-overlay" till display: flex när menyn stängs på index.html*/
        }else if(onAboutPage){
            onAboutPage.style.display = "flex"; /*sätter klassen "about-wrapper till display: flex när menyn stängs på about.html*/
        }else if(onGalleryPage){
            onGalleryPage.style.display = "flex"; /*sätter ID "gallery-image-container till display: flex när menyn stängs på gallery.html*/
        }
    }
}


/*event-listeners*/
window.addEventListener("load", () => {
    mobileMenuButton.addEventListener("click", toggleMenu); /*onclick-event på 'toggleMenu'*/
})






















































