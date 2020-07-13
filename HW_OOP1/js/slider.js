function Slider() {
  this.rightCard = function() {
    const cardObj = {
      quanElems : document.querySelectorAll('.portfolio_block').length - 1,
      header : document.querySelector('.portfolio_block'),
      descr : document.querySelector('.portfolio_block'),
      img : document.querySelector('.portfolio_block')
    }
    const headerFirstCard = cardObj.header.querySelector('.portfolio_block-header').innerHTML;
    const descrFirstCard = cardObj.descr.querySelector('.portfolio_block-description').innerHTML;
    const imgFirstCard = cardObj.img.querySelector('.portfolio_block-img').getAttribute('src');

    document.querySelectorAll('.portfolio_block')[1].setAttribute('style', `margin-left:-380px`);
  
    const docFrag = document.createDocumentFragment();
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'portfolio_block');
    cardDiv.insertAdjacentHTML(`afterbegin`, `
    <img class="portfolio_block-img" src="${imgFirstCard}">
      <div class="portfolio_block-text-container">
      <h3 class="portfolio_block-header">${headerFirstCard}</h3>
        <p class="portfolio_block-description">${descrFirstCard}</p>
      </div>
      <div class="portfolio_block-target-box"></div>`);
    docFrag.appendChild(cardDiv);
    
    document.querySelectorAll('.portfolio_block')[cardObj.quanElems].after(docFrag);
    document.querySelector('.portfolio_block').remove()
  }

  this.leftCard = function () {
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
      </div>
      <div class="portfolio_block-target-box"></div>`);
    docFrag.appendChild(cardDiv);
    document.querySelector('.portfolio_block').before(docFrag);
  }
  
  this.checkFunc = function(event) {
    this.target = event.target;

    if (this.target.classList.value === 'portfolio_block-target-box portfolio_block-target-box-shadow'||
        this.target.classList.value === 'portfolio_block-target-box') {
      return true;
    }
  }
}

function SwapSlide() {
  Slider.call(this);
  AutoSlide.call(this)

  this.slideSide = function(event) {
    let target = event.target;

    if (target.id === 'buttonGoRight'){
      this.rightCard();
      this.onMouseButton();
    }

    if (target.id === 'buttonGoLeft'){
      this.leftCard();
      this.onMouseButton();
    }
  }
}

function AutoSlide() {
  Slider.call(this);

  this.onMouseButton = function() {
    this.goSlide();
  }

  this.goSlide = function() {
    clearTimeout(Slider.autoSlide);
    const timer = 5000;

    Slider.autoSlide = setTimeout(function oneMoreTime() {
      autoSlide.rightCard();
      Slider.autoSlide = setTimeout(oneMoreTime, timer)
    }, timer);
  }

  this.stopSlide = function() {
    clearTimeout(Slider.autoSlide);
  }
}

const autoSlide = new AutoSlide();
const swapSlide = new SwapSlide();

autoSlide.goSlide();

document.getElementById('buttonsContainer').addEventListener('click',(event) => {
  swapSlide.slideSide(event);
});

document.getElementById('portfolioBlock').addEventListener('mouseover', (event) => {
  if (autoSlide.checkFunc(event) === true) {
    autoSlide.stopSlide();
  }
})

document.getElementById('portfolioBlock').addEventListener('mouseout', (event) => {
  if (autoSlide.checkFunc(event) === true) {
    autoSlide.goSlide();
  }
})