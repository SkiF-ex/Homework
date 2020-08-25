class Slider {

  constructor() {
    this.target;
    this.slidePortfolio;
    this.slideTestimonials
  }

  render(selector, container, margin, sideSlide) {
    const quanElems = document.querySelectorAll(`.${selector}`).length - 1;
    let divCardHtml;
    const divCard = document.createElement('div');
    const docFrag = document.createDocumentFragment();

    divCard.setAttribute('class', selector);
    docFrag.appendChild(divCard);
    
    if (sideSlide === false) {
      divCardHtml = document.querySelectorAll(`.${selector}`)[quanElems].innerHTML;
      divCard.innerHTML = divCardHtml;
      divCard.setAttribute('style', margin);
      document.querySelector(`.${selector}`).removeAttribute('style')
      document.querySelector(container).prepend(docFrag);
      document.querySelectorAll(`.${selector}`)[quanElems + 1].remove();
    } else {
      divCardHtml = document.querySelector(`.${selector}`).innerHTML;
      divCard.innerHTML = divCardHtml;
      document.querySelectorAll(`.${selector}`)[1].setAttribute('style', margin);
      document.querySelector(`.${selector}`).remove();
      document.querySelector(container).append(docFrag);
    }
  }

  checkFunc(event) {
    this.target = event.target;
  
    if (this.target.classList.value === 'portfolio_block-target-box') {
      return true;
    }
  }
}

class ProtfolioSide extends Slider {

  constructor() {
    super();
    this.selector = 'portfolio_block';
    this.container = '.portfolio_block-all'
    this.margin = 'margin-left: -380px'
  }

  leftSide() {
    const sideSlide = false;
    this.render(this.selector, this.container, this.margin, sideSlide);
  }
  rightSide() {
    const sideSlide = true;
    this.render(this.selector, this.container, this.margin, sideSlide);
  }
} 

class TestimonialsSide extends Slider {

  constructor() {
    super();
    this.selector = 'section-testimonials-container-box'
    this.container = '.section-testimonials-container'
    this.margin = 'margin-left: -600px;'
  }
  rightSide() {
    const sideSlide = true;
    this.render(this.selector, this.container, this.margin, sideSlide);
  }
  leftSide() {
    const sideSlide = false;
    this.render(this.selector, this.container, this.margin, sideSlide);
  }
}

class SwapSlide{

  constructor() {
    this.mousedownX;
    this.mouseupX;
    this.rightSlide = -100;
    this.leftSlide = 100;
  }

  swap() {
    const dotDifferent = this.mouseupX - this.mousedownX;
    
    if (event.target.classList.value === 'portfolio_block-target-box') {
      if (dotDifferent >= this.leftSlide) {
        protfolioSide.leftSide();
      }
  
      if (dotDifferent <= this.rightSlide) {
        protfolioSide.rightSide();
      }
    }

    if (event.target.classList.value === 'section-testimonials-container-box') {
      if (dotDifferent >= this.leftSlide) {
        testimonialsSide.leftSide();
      }
  
      if (dotDifferent <= this.rightSlide) {
        testimonialsSide.rightSide();
      }
    }
  }
}

class PortfolioAutoSlide extends Slider {
  goSlide() {
    protfolioSide.rightSide();
  }

  slideAuto() {
    const timer = 3000;
    this.slidePortfolio = setInterval(autoSlidePortfolio.goSlide,timer)
  }

  stopSlide() {
    clearInterval(this.slidePortfolio);

    delete this.slidePortfolio;
  }
}

class TestimonialsAutoSlide extends Slider {
  goSlide() {
    testimonialsSide.rightSide();
  }

  slideAuto() {
    const timer = 3000;
    this.slideTestimonials = setInterval(autoSlideTestimonials.goSlide,timer)
  }

  stopSlide() {
    clearInterval(this.slideTestimonials);

    delete this.slideTestimonials;
  }
}

class Buttons {
  slideSide(event) {
    let target = event.target;

    if (target.id === 'buttonGoRight'){
      autoSlidePortfolio.stopSlide();
      protfolioSide.rightSide();
      autoSlidePortfolio.slideAuto();
    }

    if (target.id === 'buttonGoLeft'){
      autoSlidePortfolio.stopSlide();
      protfolioSide.leftSide();
      autoSlidePortfolio.slideAuto();
    }

    if (target.id === 'testimonialsGoLeft'){
      autoSlideTestimonials.stopSlide();
      testimonialsSide.leftSide();
      autoSlideTestimonials.slideAuto();
    }
    if (target.id === 'testimonialsGoRight'){
      autoSlideTestimonials.stopSlide();
      testimonialsSide.rightSide();
      autoSlideTestimonials.slideAuto();
    }

  }
}

const protfolioSide = new ProtfolioSide();
const autoSlidePortfolio = new PortfolioAutoSlide();
const autoSlideTestimonials = new TestimonialsAutoSlide();
const buttons = new Buttons();
const swapSlide = new SwapSlide();
const testimonialsSide = new TestimonialsSide();

autoSlidePortfolio.slideAuto();
autoSlideTestimonials.slideAuto();

document.addEventListener('mouseover', (event) => {
  if (autoSlidePortfolio.checkFunc(event) === true) {
    autoSlidePortfolio.stopSlide();
  }
  if (event.target.classList.value === 'section-testimonials-container-box') {
    autoSlideTestimonials.stopSlide();
  }
})

document.addEventListener('mouseout', (event) => {
  if (autoSlidePortfolio.checkFunc(event) === true) {
   autoSlidePortfolio.slideAuto();
  }
  if (event.target.classList.value === 'section-testimonials-container-box') {
    autoSlideTestimonials.slideAuto();
  }
})

document.querySelector('main').addEventListener('click',(event) => {
  buttons.slideSide(event);
});

document.addEventListener('mousedown', (event) => {
  if (autoSlidePortfolio.checkFunc(event) === true || 
  event.target.classList.value === 'section-testimonials-container-box') {
    swapSlide.mousedownX = event.clientX;
  }
});

document.addEventListener('mouseup', (event) => {
  if (autoSlidePortfolio.checkFunc(event) === true || 
  event.target.classList.value === 'section-testimonials-container-box') {
    swapSlide.mouseupX = event.clientX;
    swapSlide.swap();
  }
});