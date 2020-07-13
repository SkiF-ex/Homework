class Slider {

  constructor() {
    this.autoSlide;
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

    Slider.autoSlide = setTimeout(function oneMoreTime() {
      blockUp.rightCard();
      Slider.autoSlide = setTimeout(oneMoreTime, 5000)
    }, 5000);
  }

  stopSlide() {
    clearTimeout(Slider.autoSlide);
  }
}

///////////////////////////////////////////

class BlockUp extends Slider{

  constructor() {
    super();
    this.className = 'portfolio_block-resize'
  }

  blockAddMargin(event) {
    const target = event.target;

    if(target.classList.value === 'portfolio_block-target-box') {
      target.parentElement.classList.add('portfolio_block-resize');
    }
  }
  blockRemoveMargin(event) {
    const target = event.target;

    if(target.classList.value === 'portfolio_block-target-box portfolio_block-target-box-shadow') {
      target.parentElement.classList.remove('portfolio_block-resize');
    }
  }

  blockAddShadow(event) {
    const target = event.target;

    if(target.classList.value === 'portfolio_block-target-box') {
      target.classList.add('portfolio_block-target-box-shadow');
    }
  }

  blockRemoveShadow(event) {
    const target = event.target;

    if(target.classList.value === 'portfolio_block-target-box portfolio_block-target-box-shadow') {
      target.classList.remove('portfolio_block-target-box-shadow');
    }
  }
}

const blockUp = new BlockUp();

document.getElementById('portfolioBlock').addEventListener('mouseover', (event) => {
  const target = event.target;

    if(target.classList.value === 'portfolio_block-target-box portfolio_block-target-box-shadow') {
      blockUp.stopSlide(event);
    }
  blockUp.blockAddMargin(event);
  blockUp.blockAddShadow(event);
})

document.getElementById('portfolioBlock').addEventListener('mouseout', (event) => {
  const target = event.target;

    if(target.classList.value === 'portfolio_block-target-box portfolio_block-target-box-shadow') {
      blockUp.goSlide(event);
    }
  blockUp.blockRemoveMargin(event);
  blockUp.blockRemoveShadow(event);
})

document.getElementById('buttonsContainer').addEventListener('click',(event) => {
  blockUp.slideSide(event);
});
