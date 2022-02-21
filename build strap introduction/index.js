const root=document.getElementById('root')
// root.innerHTML=`<ul> ${getItems()}<ul></ul>`
// function  range(from, length){
//     const res=[]
//     for (let i=0;i<length;i++){
//         res.push(i+from)
//     }
//         return res;
// }
// function  getItems(){
//     return range(1,100).map(i=>`<li><img src="img1.jpg">item ${i}</li>`).join('')
//
// }
function displayPage(page){
    console.log(page)
}
const paginator=new Paginator(5,'root',displayPage())
