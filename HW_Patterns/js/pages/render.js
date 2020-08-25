export let allPosts;

export const getAllPosts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/list');
    allPosts = await response.json();
    render.renderAuthorNames(allPosts);
  }
  catch (error) {
    console.dir(error);
  }
};

class Render {
  renderAuthorNames(data) {
    const leftDocFrag = document.createDocumentFragment();
    const rightDocFrag = document.createDocumentFragment();
    let authors = [];
    let ifThereAreRepitions;

    authors.push(data[0].author);

    data.forEach((post) => {
      for (let i = 0; i < authors.length; i++) {
        if (authors[i] === post.author) {
          ifThereAreRepitions = false;
          return;
        } else {
          ifThereAreRepitions = true;
          }
      }
      if (ifThereAreRepitions === true) {
        authors.push(post.author);
      }
    });

    authors.forEach((author) => {
      const leftSideElement = document.createElement('div');
      const rightSideElement = document.createElement('div');

      leftSideElement.setAttribute('class', 'left-block-author_name-block-container');
      leftSideElement.insertAdjacentHTML('afterbegin', `
      <a class="author_block  left_author_block left-block-author_name-block-container-name">${author}</a>
      `);
      rightSideElement.setAttribute('class', 'right-block-author-block');
      rightSideElement.insertAdjacentHTML('afterbegin', `
      <a class="author_block right_author_block left-block-author_name-block-container-name">${author}</a>
      `);
      rightSideElement.insertAdjacentHTML('afterbegin', `
      <div class="right-block-author-block-strip"></div>
      `);

      leftDocFrag.appendChild(leftSideElement);
      rightDocFrag.appendChild(rightSideElement);
    });

    document.querySelector('.left-block-author_name-block').appendChild(leftDocFrag);
    document.querySelector('.right-block').appendChild(rightDocFrag);
  }
}
const render = new Render();
