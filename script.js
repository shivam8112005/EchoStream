const apiKey="6e6312a61f6745ad9d227f8d22d095eb";
const blogCont=document.querySelector("#blog-container");
const input=document.getElementById("search-input");
const searchBtn=document.getElementById("search-btn");
async function fetchRandomNews(){
    try{
        //const url=  `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;
        const url=`https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=12&apiKey=${apiKey}`;
        const response=await fetch(url);
        const data=await response.json();
        console.log(data);
        console.log(data.articles);
        console.log("sexyyyy");
        return data.articles;
    }catch(e){
     console.error("Error in Fetching Random News !");
     return [];
    }
}
function displayBlogs(articles){
    blogCont.innerHTML="";
    articles.forEach((art) => {
       const card= document.createElement("div");
       card.setAttribute("class", "blog-card");
       const img=document.createElement("img");
       if(art.urlToImage==null){
        img.src="https://placehold.co/600x400";
       }else{
        img.src=art.urlToImage;
       }
      
       const truncateTitle=art.title.length >30 ? art.title.slice(0, 30)+"....":art.title;
      // img.alt=art.title;
       
       const title=document.createElement("h2");
       title.innerHTML=truncateTitle;
       const description=document.createElement("p");
       const truncateDescription=art.description.length >30 ? art.description.slice(0,30)+"....":art.description;
       description.innerHTML=truncateDescription;
       card.appendChild(img);
       card.appendChild(title);
       card.appendChild(description);
       blogCont.appendChild(card);
       card.addEventListener("click", ()=>{
        window.open(art.url, "_blank");
       })
    });
    
}
(async ()=>{
    try{
        const articles=await fetchRandomNews();
displayBlogs(articles);
    }catch(e){
        console.error("Error in Fetching Random News !");
    }
})();
searchBtn.addEventListener("click", async ()=>{
    const querry=input.value.trim();
    if(querry==""){

    }else{
        try{
            const articles=await fetchNewsQuerry(querry);
            displayBlogs(articles);
        }catch(e){
            console.error("Error Fetching News By Querry !", e);
            
        }
    }
});
async function fetchNewsQuerry(querry){
    try{
        //const url=  `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;
        const url=`https://newsapi.org/v2/everything?q=${querry}&pageSize=12&apiKey=${apiKey}`;
        const response=await fetch(url);
        const data=await response.json();
        console.log(data);
        return data.articles;
    }catch(e){
     console.error("Error in Fetching Random News !");
     return [];
    }
}
