const rightCard = () => {
  const cardObj = {
    quanElems : document.querySelectorAll('.portfolio_block').length - 1,
    headerFirstCard : document.querySelector('.portfolio_block').querySelector('.portfolio_block-header').innerHTML,
    descrFirstCard : document.querySelector('.portfolio_block').querySelector('.portfolio_block-description').innerHTML,
    imgFirstCard : document.querySelector('.portfolio_block').querySelector('.portfolio_block-img').getAttribute('src')
  }
  document.querySelectorAll('.portfolio_block')[1].setAttribute('style', `margin-left:-380px`);

  const docFrag = document.createDocumentFragment();
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'portfolio_block');
  cardDiv.insertAdjacentHTML(`afterbegin`, `
  <img class="portfolio_block-img" src="${cardObj.imgFirstCard}">
    <div class="portfolio_block-text-container">
    <h3 class="portfolio_block-header">${cardObj.headerFirstCard}</h3>
      <p class="portfolio_block-description">${cardObj.descrFirstCard}</p>
    </div>`);
  docFrag.appendChild(cardDiv);
  
  document.querySelectorAll('.portfolio_block')[cardObj.quanElems].after(docFrag);
  document.querySelector('.portfolio_block').remove()
}

const leftCard = () => {
  const quanElems = document.querySelectorAll('.portfolio_block').length - 1;
  const cardObj = {  
    header : document.querySelectorAll('.portfolio_block')[quanElems],
    descr : document.querySelectorAll('.portfolio_block')[quanElems],
    img : document.querySelectorAll('.portfolio_block')[quanElems]
  }
  const headerFirstCard = cardObj.header.querySelector('.portfolio_block-header').innerHTML;
  const descrFirstCard = cardObj.descr.querySelector('.portfolio_block-description').innerHTML;
  const imgFirstCard = cardObj.img.querySelector('.portfolio_block-img').getAttribute('src');
  
  document.querySelectorAll('.portfolio_block')[quanElems].remove();
  document.querySelector('.portfolio_block').removeAttribute('style');

  const docFrag = document.createDocumentFragment();
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'portfolio_block');
  cardDiv.setAttribute('style', `margin-left:-380px`)
  cardDiv.insertAdjacentHTML(`afterbegin`, `
  <img class="portfolio_block-img" src="${imgFirstCard}">
    <div class="portfolio_block-text-container">
    <h3 class="portfolio_block-header">${headerFirstCard}</h3>
      <p class="portfolio_block-description">${descrFirstCard}</p>
    </div>`);
  docFrag.appendChild(cardDiv);
  document.querySelector('.portfolio_block').before(docFrag);
}

document.getElementById('buttonGoRight').addEventListener('click',() => {
  rightCard();

  clearTimeout(autoSlide);

  autoSlide = setTimeout(function oneMoreTime () {
    rightCard();
    autoSlide = setTimeout(oneMoreTime, timer)
  }, timer);
});

document.getElementById('buttonGoLeft').addEventListener('click',() => {
  leftCard();
    
  clearTimeout(autoSlide);

  autoSlide = setTimeout(function oneMoreTime () {
    rightCard();
    autoSlide = setTimeout(oneMoreTime, timer)
  }, timer);
});

// авто переключение 
let timer = 5000;
let autoSlide = setTimeout(function oneMoreTime () {
  rightCard();
  autoSlide = setTimeout(oneMoreTime, timer)
}, timer);

document.getElementById('portfolioBlock').addEventListener('mouseover', () => {
  clearTimeout(autoSlide);
})

document.getElementById('portfolioBlock').addEventListener('mouseout', () => {
  autoSlide = setTimeout(function oneMoreTime () {
    rightCard();
    autoSlide = setTimeout(oneMoreTime, timer)
  }, timer);
})