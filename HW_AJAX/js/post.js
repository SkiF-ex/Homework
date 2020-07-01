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

const renderPost = (data) => {
  ifAudioType(data);
  if (data.imgLink != 'null') {
    document.getElementById('postImg').setAttribute('src',data.imgLink);
  }
  document.getElementById('postTitle').innerHTML = data.title;
  document.getElementById('postAuthor').innerHTML = data.author;
  document.getElementById('postDate').innerHTML = data.date;
  document.getElementById('postDescription').innerHTML = data.description;
  document.getElementById('postQuote').innerHTML = data.quote;
}

getPostById();
