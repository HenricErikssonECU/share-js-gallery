/***************************************   GALLERY   ***************************************/

/*deklarering av "globala variabler" för att förkorta koden och spara på mina stackars tangenter*/
const mediaCheck = window.matchMedia("(max-width: 800px)");
const mainImage = document.querySelector("#gallery-main-image");
const mainImageText = document.querySelector("#gallery-main-image-text");

const images = [ /*en array med objekt där varje objekt som innehåller bild-information*/
    {filename: "gallery-img-1.jpg", alt: "1"},
    {filename: "gallery-img-2.jpg", alt: "2"},
    {filename: "gallery-img-3.jpg", alt: "3"},
    {filename: "gallery-img-4.jpg", alt: "4"},
    {filename: "gallery-img-5.jpg", alt: "5"},
    {filename: "gallery-img-6.jpg", alt: "6"},
    {filename: "gallery-img-7.jpg", alt: "7"},
    {filename: "gallery-img-8.jpg", alt: "8"},
    {filename: "gallery-img-9.jpg", alt: "9"},
    {filename: "gallery-img-10.jpg", alt: "10"},
    {filename: "gallery-img-11.jpg", alt: "11"},
    {filename: "gallery-img-12.jfif", alt: "12"},
    {filename: "gallery-img-13.jfif", alt: "13"},
    {filename: "gallery-img-14.jpg", alt: "14"}
];


const imageElems = images.map((img) => 
    `<div><img alt="${img.alt}" src="../media/img/gallery-images/${img.filename}" 
    onclick="openLightbox('${img.filename}', '${img.alt}')"></div>`
).join("");
/*images.map() itereras igenom en gång och en kopia sparas i 'imageElems'. Varje img i imageElems får en div med ett img-element inuti.
img-elementen får ett alt- och src-attribut som ges av varje images[i].filename respektive images[i].alt (egentligen img[i].filename/alt eftersom kopian är sparad i imageElems där 'img' representerar varje objekt).
(src-attributet sätts först (för alla img-element) till "gallery-images"-mappen, sedan läggs respektive filename för till för varje spicifikt index)
onclick: openLightbox-funktionen körs när man klickar på någon av img-elementen och parametrarna 'filename' & 'alt' skickas med till funktionen 'openLightbox'*/

const imageThumbs = images.map((img) => 
    `<img alt="${img.alt}" src="../media/img/gallery-images/${img.filename}" 
    onclick ="mainImageSetter('${img.filename}', '${img.alt}')" class="gallery-thumbnail">`
).join("");
/*fungerar på samma sätt som ovan (undantag att jag la med en div i den ovanför) men här läggs det även till
en klass på varje img-element ("gallery-thumbnail"), som jag använder för att skapa en nodelist av img-elementen som jag kan 
iterera igenom för att targeta (och highlighta) ett img-element med ett specifikt index*/



/*Öppna lightboxen*/
const openLightbox = (filename, alt) =>{
    mainImageSetter(filename, alt);
    document.querySelector("#gallery-lightbox-wrapper").style.display = "flex";
}
/*anropar mainImageSetter-funktionen och sätter ID "gallery-lightbox-wrapper" till display: flex*/


/*Sätter src-attributet för ID "gallery-main-image"*/
const mainImageSetter = (filename, alt) =>{
    mainImage.setAttribute("src", `../media/img/gallery-images/${filename}`);
    mainImage.setAttribute("alt", `${alt}`);
    activeThumbnailSetter();
    mainImageText.textContent = `Bild ${mainImage.alt} / ${images.length}`;
} /*mainImageSetter-funktionen sätter src-attributet för ID "gallery-main-image" till /sökväg/bildensFilNamn.
alt-attributet sätts till den klickade bildens alt.
(alt-attributet för alla bilder är just nu nummer, för att kunna se vilken bild man är på uppe i vänstra hörnet av main imagen)
ActiveThumbnailSetter-funktionen anropas.
span'et med ID "gallery-main-image-text"s content sätts till en textsträng innehållande main bildens alt-attribut och images-arrayens totala längd. (vit text uppe i vänstra hörnet på main imagen)
Note to self: eftersom gallery.html ligger i en undermapp måste vi gå upp en nivå innan sökvägen kan skrivas (därav en extra punkt "../")
*/


const activeThumbnailSetter = () =>{
    const thumbnailNodelist = document.querySelectorAll(".gallery-thumbnail"); /*thumbnailNodelist blir en nodelist (likt en array)*/
    for(let i = 0; i < thumbnailNodelist.length; i++){ /*itererar igenom thumbnailNodelist från början till slut*/
        if(thumbnailNodelist[i].src === mainImage.src){ /*om src-attributet för ett visst index i thumbnailNodelist är samma som src-attributet för mainImage*/
            if(mediaCheck.matches){ /*om @media (max-width: 800px)*/
                thumbnailNodelist[i].style.boxShadow = "0px 0px 5px 2px #8f8f8f"; /*lägg på en boxshadow på bilden med det indexet*/
                thumbnailNodelist[i].style.transform = "scale(1.1)"; /*gör även bilden med det indexet lite större*/
            }else{ /*om @media är större än 800px*/
                thumbnailNodelist[i].style.boxShadow = "0px 0px 10px 4px #8f8f8f"; /*lägg på en större boxshadow på bilden med det indexet*/
                thumbnailNodelist[i].style.transform = "scale(1.1)"; /*gör även bilden med det indexet lite större*/
            }
        }else{ /*om src-attributet för ett specifikt index i thumbnailNodelist INTE är samma som src-attributet för mainImage - sätt då stylingen till dess originalvärden*/
            thumbnailNodelist[i].style.boxShadow = "";
            thumbnailNodelist[i].style.transform = "scale(1)";
        }
    }
}

const prevImg = () =>{ /*funktionen anropas när man klickar på elementet med onclick-eventet som heter prevImg*/
    const thumbnailNodelist = document.querySelectorAll(".gallery-thumbnail"); /*nodelist*/
    for(let i = 0; i < thumbnailNodelist.length; i++){/*itererar igenom thumbnailNodelist*/
        if(thumbnailNodelist[i].src === mainImage.src && i !== 0){ /*om src-attributet för ett visst index i thumbnailNodelist är samma som src-attributet för mainImage och 'i' SKILJER SIG från 0*/
            mainImage.setAttribute("src", thumbnailNodelist[i -= 1].src); /*Sätt mainImage' src-attribut till samma som: src-attributet för thumbnailNodelist som har 1 lägre index än det som stämde överens*/
            activeThumbnailSetter(); /*anropa activeThumbnailSetter-funktionen*/
            mainImageText.textContent = `Bild ${thumbnailNodelist[i].alt} / ${thumbnailNodelist.length}`; /*span'et med ID "gallery-main-image-text"s content sätts till en textsträng innehållande den aktiva thumbnail-bildens alt-attribut och arrayens totala längd.*/
        }else if(thumbnailNodelist[i].src === mainImage.src && i === 0){ /*Annars om src-attributet för ett visst index i thumbnailNodelist är samma som src-attributet för mainImage och 'i' = 0*/
            mainImage.setAttribute("src", thumbnailNodelist[i += (thumbnailNodelist.length - 1)].src);/*Sätt mainImage' src-attribut till samma som: src-attributet för thumbnailNodelist som har 1 lägre index än den arrayens totala längd*/
            activeThumbnailSetter(); /*anropa activeThumbnailSetter-funktionen*/
            mainImageText.textContent = `Bild ${thumbnailNodelist[i].alt} / ${thumbnailNodelist.length}`; /*span'et med ID "gallery-main-image-text"s content sätts till en textsträng innehållande den aktiva thumbnail-bildens alt-attribut och arrayens totala längd.*/
        }
    }
}

const nextImg = () =>{ /*funktionen anropas när man klickar på elementet med onclick-eventet som heter nextImg*/
    const thumbnailNodelist = document.querySelectorAll(".gallery-thumbnail"); /*nodelist*/
    for(let i = 0; i < thumbnailNodelist.length; i++){ /*itererar igenom thumbnailNodelist*/
        if(thumbnailNodelist[i].src === mainImage.src && i !== (thumbnailNodelist.length - 1)){ /*om src-attributet för ett visst index i thumbnailNodelist är samma som src-attributet för mainImage och 'i' SKILJER SIG från arrayens (totala längd - 1)*/
            mainImage.setAttribute("src", thumbnailNodelist[i += 1].src); /*Sätt mainImage' src-attribut till samma som: src-attributet för thumbnailNodelist som har 1 högre index än det som stämde överens*/
            mainImageText.textContent = `Bild ${thumbnailNodelist[i].alt} / ${thumbnailNodelist.length}`; /*span'et med ID "gallery-main-image-text"s content sätts till en textsträng innehållande main bildens alt-attribut och arrayens totala längd.*/
            activeThumbnailSetter(); /*anropa activeThumbnailSetter-funktionen*/
        }else if(thumbnailNodelist[i].src === mainImage.src && i === (thumbnailNodelist.length - 1)){ /*om src-attributet för ett visst index i thumbnailNodelist är samma som src-attributet för mainImage och 'i' = arrayens (totala längd - 1)*/
            mainImage.setAttribute("src", thumbnailNodelist[0].src); /*Sätt mainImage' src-attribut till samma som: src-attributet för thumbnailNodelist som har index 0*/
            mainImageText.textContent = `Bild ${thumbnailNodelist[0].alt} / ${thumbnailNodelist.length}`; /*span'et med ID "gallery-main-image-text"s content sätts till en textsträng innehållande thumbnail-bilden med index 0's alt-attribut och arrayens totala längd.*/
            activeThumbnailSetter(); /*anropa activeThumbnailSetter-funktionen*/
        }
    }
}


/*Stänga lightboxen*/
const closeLightbox = () =>{ /*funktionen anropas när man klickar på elementet med onclick-eventet som heter closeLightbox*/
    document.querySelector("#gallery-lightbox-wrapper").style.display = "none"; /*elementet med ID "gallery-lightbox-wrapper" till display: none*/
}



/*Eventlisteners*/
window.addEventListener("load", () =>{
    document.querySelector("#gallery-image-wrapper").innerHTML = imageElems; /*renderar ut det som ligger i imageElems arrayen*/
    document.querySelector("#gallery-thumbnails-wrapper").innerHTML = imageThumbs; /*renderar ut det som ligger i imageThumbs arrayen*/
});
mediaCheck.addEventListener /*eventlistener för mediaCheck (se längst upp)*/


/*
        OBS: 
Försökte skapa en const "thumbnailNodelist" med globalt scope istället för att skapa
nya variabler inom respektive funktion, men jag fick det inte att funka och jag lyckades inte lista ut vad problemet var heller. 

*/











































































