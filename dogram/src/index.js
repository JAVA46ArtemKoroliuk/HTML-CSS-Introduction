console.log("hello World!!!");
let detailsTitle=document.querySelector(".details-title");
let detailImage=document.querySelector(".details-image");
let anchors = document.querySelectorAll(".thambnails-anchor"); //all HTML elements to the class thambnails-anchor
for(let i=0; i<anchors.length;i++) {
    anchors[i].addEventListener("click", function(event){
            event.preventDefault();
            setDetails (anchors[i]);
    })
       
}
         function setDetails(anchor){ 
            detailImage.setAttribute("src",anchor.getAttribute("href"));
            detailsTitle.textContent=anchor.getAttribute;
            
}