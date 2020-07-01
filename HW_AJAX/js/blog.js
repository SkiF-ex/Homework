let imgTag;
let fullBlockTag = ``;

const getAllPosts = () => {
  fetch('http://localhost:3000/api/list',
  {
    method: 'GET'
  })
  .then((respone) => {
    return respone.json();
  })
  .then((data) => {
    renderPosts(data);
  })
    .catch((error) => {
      console.dir(error);
    })
};

const findParagraph = (post) => {
  if (post.author === 'Sarah Healy') {
    return `Fog down the river, where it rolls deified among the tiers of 
    shipping and the waterside pollutions of a great (and dirty)...`;
  }

  let stringArray = post.description.split(' ');
  let newParagraphPosition;
  let unnecessaryWords;

  for (let i = 0; i < stringArray.length; i++) {
    if (stringArray[i] === '/*/'){
      newParagraphPosition = i;
      break;
    }
  }

  unnecessaryWords = stringArray.length - newParagraphPosition;
  stringArray.splice(newParagraphPosition, unnecessaryWords);
  return stringArray.join(' ');
}

const withPic = (post) => {
  if (post.type === 'Text') {
    imgTag = () => ``;
    fullBlockTag = `blog_section-block-content-description-fullblock`;
    return 'blog_section-block-withoutpic';
  } else {
    imgTag = (post) => `<div style="background-image: url(${post.imgLink});" 
      class="blog_section-block-picture ${ifVideoType(post)}"></div>`;
    return 'blog_section-block-withpic';
  }
};

const ifVideoType = (post) => {
  if (post.type === 'Video') {
    return `blog_section-block-picture-video`;
  } else {
    return '';
  }
}

const ifAudioType = (post) => {
  if (post.type === 'Audio') {
    return `<audio src="../HW_Task/img/audio.mp3" controls="controls" class="blog_section-block-content-audio">
    </audio>`;
  } else {
    return ``;
  }
}

const firstPost = (data, post) => {
  if (data[0].id === post.id) {
    return 'blog_section-block-first';
  } else {
    return '';
  }
}

const withFieldPic = (post) => {
  if (!post.imgLink === true) {
    return 'blog_section-block-content-withoutpic';
  } else {
    return 'blog_section-block-content-withpic';
  }
}

const renderPosts = (data) => {
  const docFrag = document.createDocumentFragment();
  data.forEach((post) => {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin',
    `<div class="row">
      <div class="blog_section-block ${withPic(post)} ${firstPost(data, post)} blog_section-block-${post.type}">
        ${imgTag(post)}
        <div class="blog_section-block-content ${withFieldPic(post)}">
          <div class="blog_section-block-content-authorblock">
            <img src="./img/blog-page/noavatar.png" class="blog_section-block-content-photo"></img>
            <div class="blog_section-block-content-authorblock-namedesc">
              <div class="blog_section-block-content-name">${post.author}</div>
              <div class="blog_section-block-content-undername">
                <div class="blog_section-block-content-undername-detailblock">
                  <div class="blog_section-block-content-date blog_section-block-content-details">${post.date}</div>
                  <div class="blog_section-block-content-time blog_section-block-content-details">7 min read</div>
                  <div class="blog_section-block-content-comments blog_section-block-content-details">19</div>
                </div>
                <div>
                  <div class="blog_section-block-content-stars twohalf--stars blog_section-block-content-details"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="blog_section-block-content-header" id="contentHeader">${post.title}</div>${ifAudioType(post)}
          <div class="blog_section-block-content-description ${fullBlockTag}">${findParagraph(post)} …</div>
          <button id="${post.id}" name="buttonReadMore" class="blog_section-block-content-button">Read more</button>
        </div>
      </div>
    </div>`);

    docFrag.appendChild(element);
  });
  document.getElementById('blogSection').appendChild(docFrag);

  document.getElementById('blogSection').addEventListener('click', (event) => {
    const target = event.target;
    if (event.target.tagName === 'BUTTON') {
      window.location.href = `post.html?id=${target.id}`;
    }
  });
}

getAllPosts();

