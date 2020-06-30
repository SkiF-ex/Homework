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



const renderPost = (data) => {
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
