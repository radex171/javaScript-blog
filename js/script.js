const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorTitleLink: Handlebars.compile(document.querySelector('#template-author-title').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink').innerHTML),
  authorList: Handlebars.compile(document.querySelector('#template-authorList').innerHTML),
};
const opt = {
  
  ArticleSelector: '.post',
  TitleSelector: '.post-title',
  TitleListSelector: '.titles',
  ArticleAuthorsSelector: '.post-author a',
  ArticlesTagsSelectors: '.post-tags .list',
  ArticleAuthorSelector: '.post-author',
  AuthorListMenu: ' .authors a',
  ArticleAuthorAll: 'data-author',
  CloudClassCount: '5',
  CloudClassPrefix: 'tag-size-',
};
const titleClickHandler = function(){
  event.preventDefault();
  const clickedElement = this;

  const activeLink = document.querySelector ('.titles a.active');
  if(activeLink) activeLink.classList.remove('active');

  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll( ' .posts .active');
  
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector (articleSelector);
  targetArticle.classList.add('active');
};
  
//-----------------------------------------------------

 
function generateTitleLinks (customSelector = ''){
  let titleList = document.querySelector (opt.TitleListSelector);
  titleList.innerHTML = '';
  let html = '';
  const articles = document.querySelectorAll(opt.ArticleSelector + customSelector);
  
  for (let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(opt.TitleSelector).innerHTML;
    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    console.log(linkHTMLData);
    const linkHTML = templates.articleLink(linkHTMLData);

    html += linkHTML;
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
  const classNumber = Math.floor(percentage * (opt.CloudClassCount - 1) + 1);
  const className = opt.CloudClassPrefix + classNumber;
  return className;
}

function generateTags(){
  let allTags = {};
  const articles = document.querySelectorAll (opt.ArticleSelector);
  for(let article of articles){
    let tagsWrapper = article.querySelector (opt.ArticlesTagsSelectors);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray){
    //  const linkHTML = '<li><a href="#tag-' + tag + '">'  + tag + '</a></li> ';
      const tagHTMLData = {tag: tag };
      const tagHTML = templates.tagLink(tagHTMLData);
      html += tagHTML;
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
  const allTagsData = {tags: []};
  for (let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams) 
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  const articles = document.querySelectorAll(opt.ArticleSelector);
  for(let article of articles){
    let wrapperAuthors = article.querySelector(opt.ArticleAuthorSelector);
    let html = '';
    const author = article.getAttribute(opt.ArticleAuthorAll);
    //const linkHTML = '<a href="#author-' + author + '">' + author + '</a>';
    const authorHTMLData = {author: author};
    const authorHTML = templates.authorTitleLink(authorHTMLData);
    html += authorHTML;
    console.log(html);
    if(!allAuthors.hasOwnProperty(author)){
      allAuthors[author] = 1;
    }
    else {
      allAuthors[author]++;
    }
  
    wrapperAuthors.innerHTML = html;
    
  }
  const allAuthorList = document.querySelector('.authors');
  const allAuthorsData = {authors:[]};
  for(let authorLink in allAuthors)
    //allAuthorsHTML += '<li><a href="#author-' + authorLink + '"class= "author-decoration">' + authorLink + ' (' + allAuthors[authorLink] + ')' + '</a></li>';
    allAuthorsData.authors.push({
      author: authorLink,
      count: allAuthors[authorLink],
    });
  allAuthorList.innerHTML = templates.authorList(allAuthorsData);
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
  const linksToAuthors = document.querySelectorAll(opt.ArticleAuthorsSelector + ' , ' + opt.AuthorListMenu);
  for ( let author of linksToAuthors){
    author.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();