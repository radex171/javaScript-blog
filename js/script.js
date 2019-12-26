const titleClickHandler = function(){
  event.preventDefault();
  const clickedElement = this;
  console.log(clickedElement);
  /*[done] remove class 'active' from all article links  */

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
  clickedElement.classList.add('active');
  targetArticle.classList.add('active');
};
  
//-----------------------------------------------------

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optArticleAuthorSelectorLink = '.post-author a',
  optTagListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';
  
  
function generateTitleLinks(customSelector = ''){
  
  /* remove contents of titleList */
  let titleList = document.querySelector (optTitleListSelector);
  titleList.innerHTML = '';
  
  
  /* for each article */
  let html = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  
  for (let article of articles){
    
    /* get the article id */
    const articleId = article.getAttribute('id');
    
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    /* insert link into titleList */
   
    
    /* insert link into html variable */
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
  console.log('minMax object created');

  const minMax = {
    max : 0,
    min : 999,
  };

  for (let tag of Object.keys(tags)) {
    console.log(tag + ' used ' + tags[tag] + ' times');

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
  console.log('class calculated');

  const normalizedValue = value - minMax.min;
  console.log('normalizedvalue: ', normalizedValue);

  const normalizedMax = minMax.max - minMax.min;
  console.log('normalizedMax: ', normalizedMax);

  const percentage = normalizedValue / normalizedMax;
  console.log('percentage: ', percentage);

  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  console.log('classNumber: ', classNumber);

  const className = optCloudClassPrefix + classNumber;
  console.log('className: ', className);

  return className;
}

function generateTags(){
  /* create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll (optArticleSelector);
 
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    let tagsWrapper = article.querySelector (optArticleTagsSelector);
    
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
    /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">'  + tag + '</a></li> ';
    
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      
      }
    /* END LOOP: for each tag */
    } 
    /* insert HTML of all the links into the tags wrapper */ 
    tagsWrapper.innerHTML = html;
    
  /* [done] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  
  
  const tagsParams = calcParams(allTags);
  console.log('tagsparams', tagsParams);
  let allTagsHTML = '';
  for (let tag in allTags){
    allTagsHTML += '<li><a href="#tag-' + tag + '" class=" inline ' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag  + '</a></li>';
    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams)
    console.log(tagLinkHTML)
  }
 
  tagList.innerHTML = allTagsHTML;
}


generateTags();
/*-----------------*/

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
 
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href="#tag-"]');
  
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTagLinks){
  /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
  /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '" ]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linksToTag = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for (let linkToTag of linksToTag) {
  /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

/*------GenerateAuthors--------*/


function generateAuthors(){
  let allAuthors = document.querySelectorAll(optArticleSelector);
  
  for(let articleAuthor of allAuthors){
    
    const authorWrapper = articleAuthor.querySelector(optArticleAuthorSelector); 
    let html = '';
    const author = articleAuthor.getAttribute('data-author');
    const linkAuthor = '<li><a href="#author-' + author + '">' + author + '</a></li>' + '';

    html = html + linkAuthor;
    authorWrapper.innerHTML = html;
    console.log(authorWrapper);
  }

}
generateAuthors();
function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-','');
  const activeAuthorlinks = document.querySelectorAll('a.active[href^="#author-"]');
  for ( let activeAuthor of activeAuthorlinks){
    activeAuthor.classList.remove('actve');
  }
  const authorslinks = document.querySelectorAll('a[href^="#author-' + href + '"]');
  for(let authorlink of authorslinks){
    authorlink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const linkToAuthors = document.querySelectorAll(optArticleAuthorSelector + optArticleAuthorSelectorLink);
  for(let linkToAuthor of linkToAuthors){
    linkToAuthor.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
