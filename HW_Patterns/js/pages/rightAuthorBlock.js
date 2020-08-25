let deleteTarget = '';

import {allPosts} from './render.js';

export default class RenderRightTitles {
  renderAllTitles(targetName, target) {    
    const docFrag = document.createDocumentFragment();

    if (deleteTarget.length === undefined) {
      deleteTarget.classList.remove('left-block-author_name-block-container-name-active');
      while (deleteTarget.parentNode.childNodes.length > 6) {
        deleteTarget.parentNode.removeChild(deleteTarget.parentNode.lastChild);
      }
    }
    
    allPosts.forEach((post) => {
      if(targetName === post.author) {
        const element = document.createElement('div');
    
        element.setAttribute('class', 'right-block-author-postsblock');
        element.insertAdjacentHTML('beforeend', `<div class="right-block-author-postsblock-postcontainer">
        <h3 class="title left-block-author_titles-block-container-title">${post.title}</h3>
        </div>`)
    
        docFrag.appendChild(element);
      }
      
    })
    let i;
    for (i = 0; i < document.querySelectorAll('.right_author_block').length; i++) {
      if (document.querySelectorAll('.right_author_block')[i].innerHTML === targetName){
        const target = document.querySelectorAll('.right_author_block')[i];
        deleteTarget = target;
        target.classList.add('left-block-author_name-block-container-name-active');
        target.parentNode.appendChild(docFrag);
      }
    }
  }
}
