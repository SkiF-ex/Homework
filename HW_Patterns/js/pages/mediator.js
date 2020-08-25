import RenderLeftTitles from './leftAuthorBlock.js';
import RenderRightTitles from './rightAuthorBlock.js';
import RenderDescription from './postDescription.js';
import {getAllPosts} from './render.js';

const mediator = (function () {
  let subscribers = {};

  return {
    subscribe: (event, callback) => {
      subscribers[event] = subscribers[event] || [];
      subscribers[event].push(callback);
    },

    publish: (event, data, target) => {
      if (subscribers[event]) { 
        subscribers[event].forEach((callback) => {
          callback(data, target);
        });
      }
    }
  };
}());

const subcribe = () => {
  const horizontalMenu = new RenderLeftTitles();
  const verticalMenu = new RenderRightTitles();

  mediator.subscribe('click', horizontalMenu.renderAllTitles);
  mediator.subscribe('click', verticalMenu.renderAllTitles);
  mediator.subscribe('render', getAllPosts);

  mediator.publish('render');

  document.addEventListener('click', (event) => {
    const target = event.target;
    if(target.classList.contains('author_block')) {
      const targetName = target.innerHTML;
      mediator.publish('click', targetName, target);
    }
  })
};

document.addEventListener('DOMContentLoaded', () => {
  subcribe();
});
