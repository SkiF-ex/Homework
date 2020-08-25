class RenderDescription {
  getAllPosts (target) {
    fetch('http://localhost:3000/api/list',
    {
      method: 'GET'
    })
    .then((respone) => {
      return respone.json();
    })
    .then((data) => {
      this.render(data, target);
    })
    .catch((error) => {
      console.dir(error);
    })
  }

  render(data, target) {
    data.forEach((post) => {
      if(document.querySelector('.left-block-author_name-block-container-name-active').innerHTML === post.author 
        && target.innerHTML === post.title) {
        document.querySelector('.left-block-author_post-titlecontainer-title').innerHTML = post.title;
        document.querySelector('.left-block-author_post-descriptioncontainer-description').innerHTML = post.description;
      }
    })
  }
}

const renderDescription = new RenderDescription();
let deleteTarget = '';

document.addEventListener('click', (event) => {
  const target = event.target;
  if (deleteTarget.length === undefined) {
    for (let i = 0; i < document.querySelectorAll('.title').length; i++) {
      if (document.querySelectorAll('.title')[i].innerHTML === deleteTarget.innerHTML) {
        document.querySelectorAll('.title')[i].removeAttribute('style');
      }
    }
  }
  if (target.classList.contains('title')) {
    renderDescription.getAllPosts(target);
    for (let i = 0; i < document.querySelectorAll('.title').length; i++) {
      if (document.querySelectorAll('.title')[i].innerHTML === target.innerHTML){
        document.querySelectorAll('.title')[i].setAttribute('style', 'color:#0f5d7c');
        deleteTarget = target;
      }
    }
  }
});
