/*jshint esversion: 6 */
console.log("script launched");
let detailsImage = document.querySelector(".details-image");
let detailsTitle = document.querySelector(".details-title");
let mainContentEl = document.querySelector(".main-content");

let dogSound=document.querySelector(".dog-sound");

let selectedItem;
let anchors = 
document.querySelectorAll(".thumbnails-anchor");//all HTML elements belonging to the clas thumbnails-anchor
for(let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener("click", function(event) {
        event.preventDefault(); //canceling default behavior of anchor element hitting
        showDetails();
        setDetails(anchors[i]); //setDetails function call with passing reference to appropriate anchor
        
    })
}

function setDetails(anchor) {
    console.log("anchor element  was pressed", anchor);
    let hrefValue = anchor.getAttribute("href");
    detailsImage.setAttribute("src", hrefValue );
    anchor.parentElement.classList.add("selected");
    if (selectedItem) {
        selectedItem.classList.remove("selected")
    }
    selectedItem = anchor.parentElement;
    //get element with class thumbnails-title inside the given anchor
    let thumbnailsTitleSelector = `[href="${hrefValue}"] .thumbnails-title`;
    let thumbnailsTitleEl = document.querySelector(thumbnailsTitleSelector);
    //dog name exists inside thumbnailsTitleEl.textContent
    detailsTitle.textContent = `${thumbnailsTitleEl.textContent}: ${anchor.getAttribute('data-details-title')}` ;  
   
}

function showDetails() {
    mainContentEl.classList.remove('hidden');
    detailsImage.parentElement.classList.add('is-tiny');
    setTimeout(removeIsTiny);
   
}
function removeIsTiny() {
    detailsImage.parentElement.classList.remove('is-tiny');
}
function hideDetails() {
    mainContentEl.classList.add('hidden') ;
    if (selectedItem) {
        selectedItem.classList.remove('selected')
    }
}