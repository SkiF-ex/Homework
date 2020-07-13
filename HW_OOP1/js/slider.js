class SlideBlocks {
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
}

class StartSlides extends SlideBlocks{

  constructor() {
    super();
    this.autoSlide;
    this.goSlide();
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

  goSlide() {
    clearTimeout(StartSlides.autoSlide);

    StartSlides.autoSlide = setTimeout(function oneMoreTime() {
      startSlide.rightCard();
      StartSlides.autoSlide = setTimeout(oneMoreTime, 5000)
    }, 5000);
  }

  stopSlide() {
    clearTimeout(StartSlides.autoSlide);
    
  }

  onMouseButton() {
    this.goSlide();
  }
}

class BlockUp extends StartSlides{

  constructor() {
    super();
    this.className = 'portfolio_block-resize'
  }

  blockAddMargin(event) {
    let target = event.target;

    if(target.classList.value === 'portfolio_block-target-box') {
      target.parentElement.classList.add('portfolio_block-resize');
    }
  }
  blockRemoveMargin(event) {
    let target = event.target;

    if(target.classList.value === 'portfolio_block-target-box') {
      target.parentElement.classList.remove('portfolio_block-resize');
    }
  }
}

const blockUp = new BlockUp();
const startSlide = new StartSlides();

document.getElementById('portfolioBlock').addEventListener('mouseover', (event) => {
  let target = event.target;

    if(target.classList.value === 'portfolio_block-target-box') {
      startSlide.stopSlide(event);
    }
  blockUp.blockAddMargin(event);
})

document.getElementById('portfolioBlock').addEventListener('mouseout', (event) => {
  let target = event.target;

    if(target.classList.value === 'portfolio_block-target-box') {
      startSlide.goSlide(event);
    }
  blockUp.blockRemoveMargin(event);
})

document.getElementById('buttonsContainer').addEventListener('click',(event) => {
  startSlide.slideSide(event);
});
