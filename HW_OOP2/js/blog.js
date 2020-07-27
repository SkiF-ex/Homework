class Post {
  getAllPosts () {
    fetch('http://localhost:3000/api/list',
    {
      method: 'GET'
    })
    .then((respone) => {
      return respone.json();
    })
    .then((data) => {
      checkPostType.postType(data);
    })
      .catch((error) => {
        console.dir(error);
      })
  }

  render(data) {
    const docFrag = document.createDocumentFragment();

    data.forEach((post) => {
      const firstElement = document.createElement('div');
      const secondElement = document.createElement('div');
      const blogSectionElement = document.createElement('div');
      const blogSectionContentElement = document.createElement('div');
      const blogContentAuthorElement = document.createElement('div');
      const blogAuthorImgElement = document.createElement('img');
      const blogAuthornemedescElement = document.createElement('div');
      const blogAuthorNameElement = document.createElement('div');
      const blogUndernameElement = document.createElement('div');
      const blogUndernameDetailElement = document.createElement('div');
      const blogDateElement = document.createElement('div');
      const blogTimeElement = document.createElement('div');
      const blogCommentsElement = document.createElement('div');
      const blogPostStarsBlockElement = document.createElement('div');
      const blogPostStarsElement = document.createElement('div');
      const blogTitleElement = document.createElement('div');
      const blogDescriptionsElement = document.createElement('div');
      const buttonElement = document.createElement('button');

      secondElement.setAttribute('class','row');
      blogSectionElement.setAttribute('class', `blog_section-block  ${this.firstPost(data, post)}`);
      blogSectionElement.classList.add(`blog_id-${post.id}`);
      blogSectionContentElement.setAttribute('class', `blog_section-block-content`);
      blogContentAuthorElement.setAttribute('class', 'blog_section-block-content-authorblock');
      blogAuthorImgElement.setAttribute('src', './img/blog-page/noavatar.png')
      blogAuthorImgElement.setAttribute('class', 'blog_section-block-content-photo')
      blogAuthornemedescElement.setAttribute('class', 'blog_section-block-content-authorblock-namedesc');
      blogAuthorNameElement.setAttribute('class', 'blog_section-block-content-name');
      blogAuthorNameElement.innerHTML = post.author;
      blogUndernameElement.setAttribute('class', 'blog_section-block-content-undername');
      blogUndernameDetailElement.setAttribute('class', 'blog_section-block-content-undername-detailblock');
      blogDateElement.setAttribute('class', 'blog_section-block-content-date blog_section-block-content-details');
      blogDateElement.innerHTML = post.date;
      blogTimeElement.setAttribute('class', 'blog_section-block-content-time blog_section-block-content-details');
      blogTimeElement.innerHTML = '7 min read'
      blogCommentsElement.setAttribute('class', 'blog_section-block-content-comments');
      blogCommentsElement.classList.add('blog_section-block-content-details')
      blogCommentsElement.innerHTML = '19';
      blogPostStarsElement.setAttribute('class', 'blog_section-block-content-stars twohalf--stars');
      blogPostStarsElement.classList.add('blog_section-block-content-details');
      blogTitleElement.setAttribute('class', 'blog_section-block-content-header')
      blogTitleElement.innerHTML = post.title;
      blogDescriptionsElement.setAttribute('class', 'blog_section-block-content-description');
      blogDescriptionsElement.classList.add('blog_section-block-content-description-fullblock');
      blogDescriptionsElement.innerHTML = this.ifFunc(post);
      buttonElement.setAttribute('id', post.id);
      buttonElement.setAttribute('class', 'blog_section-block-content-button');
      buttonElement.innerHTML = 'Read more';

      firstElement
      .appendChild(secondElement)
      .appendChild(blogSectionElement)
      .appendChild(blogSectionContentElement)
      .appendChild(blogContentAuthorElement)
      .after(blogTitleElement);

      blogSectionContentElement
      .appendChild(blogDescriptionsElement)
      .after(buttonElement);
      
      blogContentAuthorElement
      .appendChild(blogAuthorImgElement)
      .after(blogAuthornemedescElement);

      blogAuthornemedescElement
      .appendChild(blogAuthorNameElement)
      .after(blogUndernameElement);

      blogUndernameElement
      .appendChild(blogUndernameDetailElement)
      .after(blogPostStarsBlockElement);

      blogPostStarsBlockElement.appendChild(blogPostStarsElement);

      blogUndernameDetailElement
      .appendChild(blogDateElement)
      .after(blogTimeElement)

      docFrag.appendChild(firstElement);
    });
    document.getElementById('blogSection').appendChild(docFrag);
  }

  imageClass(post) {
    const _imgBlock = document.createElement('div');

    document.querySelector(`.blog_id-${post.id}`).classList.add('blog_section-block-withpic');
    document.querySelector(`.blog_id-${post.id}`).classList.add(`blog_section-block-${post.type}`);

    document.querySelector(`.blog_id-${post.id}`)
    .querySelector('.blog_section-block-content')
    .classList.add('blog_section-block-content-withpic');

    document.querySelector(`.blog_id-${post.id}`)
    .querySelector('.blog_section-block-content-description-fullblock')
    .classList.remove('blog_section-block-content-description-fullblock');

    _imgBlock.setAttribute('style', `background-image: url(${post.imgLink});`);
    _imgBlock.setAttribute('alt', `image`);
    _imgBlock.setAttribute('class', 'blog_section-block-picture');

    document.querySelector(`.blog_id-${post.id}`).prepend(_imgBlock);
  }

  ifFunc(post) {
    if (post.author === 'Sarah Healy') {
      return `Fog down the river, where it rolls deified among the tiers of 
      shipping and the waterside pollutions of a great (and dirty)...`;
    } else {
      return post.description;
    }
  }

  firstPost(data, post) {
    if (data[0].id === post.id) {
      return 'blog_section-block-first';
    } else {
      return '';
    }
  }
}

class CheckPostType extends Post {
  constructor() {
    super();
    this.getAllPosts()
}

  postType(data) {
    this.render(data);

    data.forEach((post) => {
      if(post.type === 'Audio') {
        postAudio.render(post);
      }
      if(post.type === 'Image') {
        postImg.render(post);
      }
      if(post.type === 'Video') {
        postVideo.render(post);
      }
      if(post.type === 'Text') {
        postText.render(post);
      }
    })
  }
}

class PostImg extends Post{
  render(post) {
    this.imageClass(post);
  }
}

class PostVideo extends Post{
  render(post) {
    this.imageClass(post);

    document.querySelector(`.blog_id-${post.id}`)
    .querySelector('.blog_section-block-picture')
    .classList.add('blog_section-block-picture-video');
  }
}

class PostAudio extends Post{
  render(post) {
    this.imageClass(post);

    const _audio = document.createElement('audio');

    _audio.setAttribute('src', '../HW_Task/img/audio.mp3');
    _audio.setAttribute('controls', 'controls');
    _audio.setAttribute('class', 'blog_section-block-content-audio');

    document.querySelector(`.blog_id-${post.id}`).querySelector('.blog_section-block-content-header').after(_audio);
  }
}

class PostText extends Post {
  render(post) {
    document.querySelector(`.blog_id-${post.id}`)
    .classList.add(`blog_section-block-${post.type}`);

    document.querySelector(`.blog_id-${post.id}`)
    .querySelector('.blog_section-block-content')
    .classList.add('blog_section-block-content-withoutpic');
  }
}

const postImg = new PostImg();
const postText = new PostText();
const postVideo = new PostVideo();
const postAudio = new PostAudio();
const checkPostType = new CheckPostType();

document.getElementById('blogSection').addEventListener('click', (event) => {
  const target = event.target;
  if (event.target.tagName === 'BUTTON') {
    window.location.href = `post.html?id=${target.id}`;
  }
});