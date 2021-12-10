/***************************************   GALLERY   ***************************************/


const mediaCheck = window.matchMedia("(max-width: 800px)");
const mainImage = document.querySelector("#gallery-main-image");
const mainImageText = document.querySelector("#gallery-main-image-text");

const images = [ 
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

const imageThumbs = images.map((img) => 
    `<img alt="${img.alt}" src="../media/img/gallery-images/${img.filename}" 
    onclick ="mainImageSetter('${img.filename}', '${img.alt}')" class="gallery-thumbnail">`
).join("");



const openLightbox = (filename, alt) =>{
    mainImageSetter(filename, alt);
    document.querySelector("#gallery-lightbox-wrapper").style.display = "flex";
}

const mainImageSetter = (filename, alt) =>{
    mainImage.setAttribute("src", `../media/img/gallery-images/${filename}`);
    mainImage.setAttribute("alt", `${alt}`);
    activeThumbnailSetter();
    mainImageText.textContent = `Bild ${mainImage.alt} / ${images.length}`;
} 

const activeThumbnailSetter = () =>{
    const thumbnailNodelist = document.querySelectorAll(".gallery-thumbnail"); 
    for(let i = 0; i < thumbnailNodelist.length; i++){ 
        if(thumbnailNodelist[i].src === mainImage.src){ 
            if(mediaCheck.matches){ 
                thumbnailNodelist[i].style.boxShadow = "0px 0px 5px 2px #8f8f8f"; 
                thumbnailNodelist[i].style.transform = "scale(1.1)"; 
            }else{ 
                thumbnailNodelist[i].style.boxShadow = "0px 0px 10px 4px #8f8f8f"; 
                thumbnailNodelist[i].style.transform = "scale(1.1)"; 
            }
        }else{ 
            thumbnailNodelist[i].style.boxShadow = "";
            thumbnailNodelist[i].style.transform = "scale(1)";
        }
    }
}

const prevImg = () =>{ 
    const thumbnailNodelist = document.querySelectorAll(".gallery-thumbnail"); 
    for(let i = 0; i < thumbnailNodelist.length; i++){
        if(thumbnailNodelist[i].src === mainImage.src && i !== 0){ 
            mainImage.setAttribute("src", thumbnailNodelist[i -= 1].src); 
            activeThumbnailSetter(); 
            mainImageText.textContent = `Bild ${thumbnailNodelist[i].alt} / ${thumbnailNodelist.length}`; 
        }else if(thumbnailNodelist[i].src === mainImage.src && i === 0){ 
            mainImage.setAttribute("src", thumbnailNodelist[i += (thumbnailNodelist.length - 1)].src);
            activeThumbnailSetter(); 
            mainImageText.textContent = `Bild ${thumbnailNodelist[i].alt} / ${thumbnailNodelist.length}`; 
        }
    }
}

const nextImg = () =>{ 
    const thumbnailNodelist = document.querySelectorAll(".gallery-thumbnail"); 
    for(let i = 0; i < thumbnailNodelist.length; i++){ 
        if(thumbnailNodelist[i].src === mainImage.src && i !== (thumbnailNodelist.length - 1)){ 
            mainImage.setAttribute("src", thumbnailNodelist[i += 1].src); 
            mainImageText.textContent = `Bild ${thumbnailNodelist[i].alt} / ${thumbnailNodelist.length}`; 
            activeThumbnailSetter(); 
        }else if(thumbnailNodelist[i].src === mainImage.src && i === (thumbnailNodelist.length - 1)){ 
            mainImage.setAttribute("src", thumbnailNodelist[0].src); 
            mainImageText.textContent = `Bild ${thumbnailNodelist[0].alt} / ${thumbnailNodelist.length}`; 
            activeThumbnailSetter(); 
        }
    }
}

const closeLightbox = () =>{ 
    document.querySelector("#gallery-lightbox-wrapper").style.display = "none"; 
}




window.addEventListener("load", () =>{
    document.querySelector("#gallery-image-wrapper").innerHTML = imageElems; 
    document.querySelector("#gallery-thumbnails-wrapper").innerHTML = imageThumbs; 
});
mediaCheck.addEventListener 













































































