class Slider {

  constructor() {
    this.autoSlide;
    this.target;
    this.goSlide();
  }

  rightCard() {
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

  leftCard() {
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

  slideSide(event) {
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

  onMouseButton() {
    this.goSlide();
  }

  goSlide() {
    clearTimeout(Slider.autoSlide);
    const timer = 5000;

    Slider.autoSlide = setTimeout(function oneMoreTime() {
      blockUp.rightCard();
      Slider.autoSlide = setTimeout(oneMoreTime, timer)
    }, timer);
  }

  stopSlide() {
    clearTimeout(Slider.autoSlide);
  }
  
  checkFunc(event) {
    this.target = event.target;

    if (this.target.classList.value === 'portfolio_block-target-box portfolio_block-target-box-shadow'||
        this.target.classList.value === 'portfolio_block-target-box') {
      return true;
    }
  }
}

class BlockUp extends Slider{

  constructor() {
    super();
    this.className = 'portfolio_block-up'
  }

  blockAddMargin() {
    this.target.parentElement.classList.add('portfolio_block-up');
  }
  blockRemoveMargin() {
    this.target.parentElement.classList.remove('portfolio_block-up');
  }

  blockAddShadow() {
    this.target.classList.add('portfolio_block-target-box-shadow');
  }

  blockRemoveShadow() {
  this.target.classList.remove('portfolio_block-target-box-shadow');
  }
}

class AnimationBlock extends Slider {
  resizeOnClick(target) {
    target.parentElement.setAttribute('style', 'margin-top:30px');
    target.parentElement.querySelector('img').classList.add('portfolio_block-img-resize');
  }
  
  resizeOnMouseOut(event) {
    event.target.parentElement.removeAttribute('style');
    event.target.parentElement.querySelector('img').classList.remove('portfolio_block-img-resize');
  }

  rotateFirst(event) {
    if (event.target.parentElement.querySelector('img').classList.value === 
        'portfolio_block-img portfolio_block-img-resize portfolio_block-img-rotateFirst'||
        event.target.parentElement.querySelector('img').classList.value === 
        'portfolio_block-img portfolio_block-img-rotateFirst portfolio_block-img-resize') {
      event.target.parentElement.querySelector('img').classList.remove('portfolio_block-img-rotateFirst');
      return;
    }  
    if (event.target.parentElement.querySelector('img').classList.value === 
        'portfolio_block-img portfolio_block-img-resize') {
      event.target.parentElement.querySelector('img').classList.add('portfolio_block-img-rotateFirst');
    }
  }
}

const blockUp = new BlockUp();
const animation = new AnimationBlock();

document.getElementById('portfolioBlock').addEventListener('mouseover', (event) => {
  if (blockUp.checkFunc(event) === true) {
    blockUp.stopSlide();
    blockUp.blockAddMargin();
    blockUp.blockAddShadow();
  }
})

document.getElementById('portfolioBlock').addEventListener('mouseout', (event) => {
  if (blockUp.checkFunc(event) === true) {
    blockUp.goSlide();
    blockUp.blockRemoveMargin();
    blockUp.blockRemoveShadow();
    animation.resizeOnMouseOut(event);
  }
  event.target.removeAttribute('style', 'background-color: rgba(0, 0, 0, 0)')
})

document.getElementById('portfolioBlock').addEventListener('click', (event) => {
  const target = event.target;
  animation.rotateFirst(event);
  if (target.classList.value === 'portfolio_block-target-box portfolio_block-target-box-shadow') {
    animation.resizeOnClick(target);
  }
  event.target.setAttribute('style', 'background-color: rgba(0, 0, 0, 0)')
})

document.getElementById('buttonsContainer').addEventListener('click',(event) => {
  blockUp.slideSide(event);
});
