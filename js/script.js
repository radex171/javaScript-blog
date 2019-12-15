
{
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
}
  
//-----------------------------------------------------

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
  let titleList = document.querySelector (optTitleListSelector);
  titleList.innerHTML = '';
  
  
  /* for each article */
  let html = '';
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles){
    
    /* get the article id */
    const articleId = article.getAttribute('id');
    
    /* find the title element */
    ElementArticleTitle = article.querySelector(optTitleSelector);
    
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    /* insert link into titleList */
    article.insertAdjacentHTML ('afterbegin', 'linkHTML');

    /* insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);  
  }
}