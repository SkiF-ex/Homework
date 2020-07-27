const querry = window.location.search.substring(1);
const querryArr = querry.split('=');

const getPostById = async () => {
 try {
    const response = await fetch(`http://localhost:3000/api/list/${querryArr[1]}`);
    const data = await response.json();
    renderPost(data);
  }
  catch (error) {
    console.dir(error);
  }
};

const getAllComments = async () => {
  try {
    const respone = await fetch('http://localhost:3000/api/listComments');
    const data = await respone.json();
    renderReviews(data);
  }
  catch (error) {
    console.dir(error);
  }
};

const ifAudioType = (data) => {
  if (data.type === 'Audio') {
    const docFrag = document.createDocumentFragment();
    const element = document.createElement('audio');
    element.setAttribute('src', '../HW_Task/img/audio.mp3');
    element.setAttribute('controls', 'controls');
    element.setAttribute('class', 'blog_section-block-content-audio')

    docFrag.appendChild(element);
    document.getElementById('postImg').after(docFrag);
  } else {
    return;
  }
}

const renderReviews = (data) => {
  const docFrag = document.createDocumentFragment();
  const reviewsBlockFirst = document.createElement('div');
  reviewsBlockFirst.setAttribute('class', 'post_block-article-review post_block-article-review-first');
  reviewsBlockFirst.insertAdjacentHTML('afterbegin',
  `<div class="post_block-article-review-photo post_block-article-review-photo-first"></div>
  <div class="post_block-article-review-container">
    <div class="post_block-article-review-container-author">
      <div class="post_block-article-review-container-author-block">
        <div class="post_block-article-review-container-author-name">Jack Johnson</div>
        <div class="post_block-article-review-container-author-stars one--star"></div>
      </div>
      <div class="post_block-article-review-container-author-time">11 min ago</div>
    </div>
    <div class="post_block-article-review-container-text">${data[0].comment}</div>
    <a class="post_block-article-review-container-link">Read more</a>
  </div>
</div>`);

  const reviewsBlockSecond = document.createElement('div');
  reviewsBlockSecond.setAttribute('class', 'post_block-article-review');
  reviewsBlockSecond.insertAdjacentHTML('afterbegin', 
  `<div class="post_block-article-review-photo post_block-article-review-photo-second"></div>
  <div class="post_block-article-review-container">
    <div class="post_block-article-review-container-author">
      <div class="post_block-article-review-container-author-block">
        <div class="post_block-article-review-container-author-name">Emma Garcia</div>
        <div class="post_block-article-review-container-author-stars five--stars"></div>
      </div>
      <div class="post_block-article-review-container-author-time">3 days ago</div>
    </div>
    <div class="post_block-article-review-container-text">${data[1].comment}</div>
    <a class="post_block-article-review-container-link">Read less</a>
  </div>`);

  const reviewsBlockThird = document.createElement('div');
  reviewsBlockThird.setAttribute('class', 'post_block-article-review');
  reviewsBlockThird.insertAdjacentHTML('afterbegin', 
  `<div class="post_block-article-review-photo post_block-article-review-photo-third"></div>
  <div class="post_block-article-review-container">
    <div class="post_block-article-review-container-author">
      <div class="post_block-article-review-container-author-block">
        <div class="post_block-article-review-container-author-name">Ann Moore</div>
        <div class="post_block-article-review-container-author-stars twohalf--stars"></div>
      </div>
      <div class="post_block-article-review-container-author-time">a week ago</div>
    </div>
    <div class="post_block-article-review-container-text">${data[2].comment}</div>
  </div> `);

  docFrag.appendChild(reviewsBlockFirst);
  docFrag.appendChild(reviewsBlockSecond);
  docFrag.appendChild(reviewsBlockThird);
  document.getElementById('reviews').after(docFrag);
}

const renderPost = (data) => {
  ifAudioType(data);
  if (data.imgLink != 'null') {
    document.getElementById('postImg').setAttribute('src',data.imgLink);
    //document.getElementById('postImg').setAttribute('alt','picture');
  }
  document.getElementById('postTitle').innerHTML = data.title;
  document.getElementById('postAuthor').innerHTML = data.author;
  document.getElementById('postDate').innerHTML = data.date;
  document.getElementById('postDescription').innerHTML = data.description;
  document.getElementById('postQuote').innerHTML = data.quote;
}

getAllComments();
getPostById();