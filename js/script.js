/*
document.getElementById('test-button').addEventListener ('click', function(){
    const links = document.querySelectorAll ('.titles a');
    console.log('links:', links);
  });*/
  
  const titleClickHandler = function(){
    event.preventDefault();
    const clickedElement = this;
    
  
  
  /*[done] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* [in progress] add class 'active' to the clicked link */
  
    clickedElement.classList.add('active');
    
  
  /* [done] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll( ' .posts .active');
  
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [done] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  
  /* [done] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector (articleSelector);
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('Link was clicked!','event:', targetArticle ) ;
  
}
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }