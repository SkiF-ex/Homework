let deleteTargetLeftBlock = '';

import {allPosts} from './render.js';

export default class RenderLeftTitles {  
  renderAllTitles(targetName, target) {
    document.querySelector('.left-block-author_titles-block').innerHTML = '';
    if (deleteTargetLeftBlock.length === undefined) {
      deleteTargetLeftBlock.classList.remove('left-block-author_name-block-container-name-active');
    }
    
    const docFrag = document.createDocumentFragment();
    
    allPosts.forEach((post) => {
      if(targetName === post.author) {
        const element = document.createElement('div');
    
        element.setAttribute('class', 'left-block-author_titles-block-container');
        element.insertAdjacentHTML('beforeend', `
        <h4 class="title left-block-author_titles-block-container-title">${post.title}</h4>`)
    
        deleteTargetLeftBlock = target;
        docFrag.appendChild(element);
      }
      document.querySelector('.left-block-author_titles-block').appendChild(docFrag);
      target.classList.add('left-block-author_name-block-container-name-active');
    })
  }
}
