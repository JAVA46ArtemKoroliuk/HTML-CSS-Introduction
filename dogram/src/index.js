/*jshint esversion: 6 */
console.log("hello World!!!");
var detailsTitle=document.querySelector(".details-title");
let detailImage=document.querySelector(".details-image");
let mainContentE1=document.querySelector(main-content);
let anchors = document.querySelectorAll(".thambnails-anchor"); //all HTML elements to the class thambnails-anchor
let selectedItim;
for(var i=0; i<anchors.length;i++) {
    anchors[i].addEventListener("click", function(event){
            event.preventDefault();
            showDetails();
            setDetails (anchors[i]);
    })
       
}
         function setDetails(anchor){ 
            let hrefvalue=anchor.getAttribute("href");
            detailImage.setAttribute("src",hrefvalue);
            detailsTitle.textContent=anchor.getAttribute("data-details-title");
           if(selectedItim){
               selectedItim.classList.remove("selected");
           }
           selectedItim=anchor.parentElement;
            let thumbnailsitem= `[href="${hrefvalue}"] .thambnails-title`;
            let thambnailsTitle= document.querySelector(thumbnailsTitileSelector);
            detailsTitle.textContent=`${thambnailsTitleE1.textContent}:${anchor.getAttribute('data-details-title')}`;
            anchor.parentElement.classList.add(selected);

}

function showDetails(){
    mainContentE1.classList.remove('hidden');


}
function hideDetails(){
    mainContentE1.classList.add('hidden');
}
