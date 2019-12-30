const titleClickHandler = function(){
  event.preventDefault();
  const clickedElement = this;

  const activeLink = document.querySelector ('.titles a.active');
  if(activeLink) activeLink.classList.remove('active');

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
};
  
//-----------------------------------------------------

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleAuthorsSelector= '.post-author a',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optAuthorListMenu = ' .authors a',
  optArticleAuthorAll = 'data-author',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';
 
  
function generateTitleLinks (customSelector = ''){
  
  let titleList = document.querySelector (optTitleListSelector);
  titleList.innerHTML = '';
  
  let html = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  
  for (let article of articles){
    
    const articleId = article.getAttribute('id');
    
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calcParams (tags) {
  
  const minMax = {
    max : 0,
    min : 999,
  };

  for (let tag of Object.keys(tags)) {
    
    if (tags[tag] > minMax.max) {
      minMax.max = tags[tag];
    }
    if (tags[tag] < minMax.min) {
      minMax.min = tags[tag];
    }
  }

  return minMax;
}

function calculateTagClass(value, minMax) {
 
  const normalizedValue = value - minMax.min;
 
  const normalizedMax = minMax.max - minMax.min;

  const percentage = normalizedValue / normalizedMax;

  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  const className = optCloudClassPrefix + classNumber;

  return className;
}

function generateTags(){
  let allTags = {};
  const articles = document.querySelectorAll (optArticleSelector);
  for(let article of articles){
    let tagsWrapper = article.querySelector (optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray){
      const linkHTML = '<li><a href="#tag-' + tag + '">'  + tag + '</a></li> ';
      html = html + linkHTML;
      if (!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }
    } 
    tagsWrapper.innerHTML = html;
  }
  const tagList = document.querySelector('.tags');
  const tagsParams = calcParams(allTags);
  let allTagsHTML = '';
  for (let tag in allTags){
    allTagsHTML += '<li><a href="#tag-' + tag + '" class=" inline ' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag  + '</a></li>';
    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    console.log(tagLinkHTML)
  }
  tagList.innerHTML = allTagsHTML;
  
}
generateTags();

/*-----------------*/

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href="#tag-"]');
  for(let activeTag of activeTagLinks){
    activeTag.classList.remove('active');
  }
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '" ]');
}

function addClickListenersToTags(){
  const linksToTag = document.querySelectorAll('.post-tags a');
  for (let linkToTag of linksToTag) {
    linkToTag.addEventListener('click', tagClickHandler);
    const listsToTags = document.querySelectorAll('.tags a');
    for(let listToTag of listsToTags){
      listToTag.addEventListener('click', tagClickHandler);
    }
  }
}
addClickListenersToTags();

/*------GenerateAuthors--------*/


function generateAuthors(){
  
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    let wrapperAuthors = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const author = article.getAttribute(optArticleAuthorAll);
    const linkHTML = '<a href="#author-' + author + '">' + author + '</a>';
    html = html + linkHTML;
  
    if(!allAuthors.hasOwnProperty(author)){
      allAuthors[author] = 1;
    }
    else {
      allAuthors[author]++;
    }
  
    wrapperAuthors.innerHTML = html;
    
  }
  const allAuthorList = document.querySelector('.authors');
  
  let allAuthorsHTML = '';

  for(let authorLink in allAuthors)
    allAuthorsHTML += '<li><a href="#author-' + authorLink + '"class= "author-decoration">' + authorLink + ' (' + allAuthors[authorLink] + ')' + '</a></li>';

  allAuthorList.innerHTML = allAuthorsHTML;
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const authorLink = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href="#author-"]');
  console.log(activeAuthors);
  for(let authorLink of activeAuthors){
    authorLink.classList.add('active');
  }
  
  generateTitleLinks ('[data-author="' + authorLink + '" ]');
  console.log(authorLink);
}

function addClickListenersToAuthors (){
  const linksToAuthors = document.querySelectorAll(optArticleAuthorsSelector + ' , ' + optAuthorListMenu);
  for ( let author of linksToAuthors){
    author.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();