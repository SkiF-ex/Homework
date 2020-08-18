const objForm = {
  form: document.getElementById('postform'),

  createForm(data) {
    const docFrag = document.createDocumentFragment();
    const formBlock = document.createElement('div');

    formBlock.classList.add('header-content-left-postform');
    formBlock.setAttribute('id', 'postform');
    formBlock.insertAdjacentHTML('afterbegin', `${data[0].html}`)

    docFrag.appendChild(formBlock);
    document.getElementById('addNewPost').after(docFrag);
  },

  clickNear(event) {
    event = event.target;

    if (event.id === 'addNewPost') {
      if (document.querySelector('.header-content-left-postform-container').childNodes.length === 2) {
        this.closeForm();
        return;
      } else { 
          this.openForm();
        }
    }

    if (event.classList.contains('header-content-left-postform-block') 
      || event.parentNode.classList.contains('header-content-left-postform-block') 
      || event.classList.contains('header-content-left-postform')
      || event.classList.contains('header-content-left-postform-block-create')) {
      return;
    }

    if (document.querySelector('.header-content-left-postform-container').childNodes.length === 1) {
      return;
    } else {
        this.closeForm();
      }
  },

  closeForm() {
    document.getElementById('postform').remove();
  },

  openForm() {
    getForm();
  }
};

const getForm = async () => {
  try {
    const respone = await fetch('http://localhost:3000/api/htmlCode');
    const data = await respone.json();
    objForm.createForm(data);

    document.getElementById('formTitle').addEventListener('blur', function(){
      objTitleValidation.isFirstLetterUpper();
      objTitleValidation.isTitleLengthValid();
      objTitleValidation.isCorrectCharacters();
      objTitleValidation.styleChanger();
    });

    document.getElementById('formTitle').oninput = function(){
      objTitleValidation.isFirstLetterUpper();
      objTitleValidation.isCorrectCharacters();
      objTitleValidation.isTitleLengthValid();
      objTitleValidation.styleChanger();
    };

    document.getElementById('createPost').addEventListener('click', () => {  
      getAllPostsForId();
    });
  }
  catch (error) {
    console.dir(error);
  }
}

const createPost = (data, id) => {
  fetch('http://localhost:3000/api/create-article',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    window.location.href = `post.html?id=${id.id}`
  })
    .catch((error) => {
      console.dir(error);
    })
};

const getAllPostsForId = async () => {
  try {
    const respone = await fetch('http://localhost:3000/api/list');
    const data = await respone.json();
    const identifier = data[data.length - 1].id + 1;

    let collectData = {
      id: identifier,
      type: document.getElementById('formType').value,
      imgLink: document.getElementById('formImgSrc').value,
      title: document.getElementById('formTitle').value,
      author: document.getElementById('formAuthor').value,
      date: document.getElementById('formDate').value,
      description: document.getElementById('formDescription').value,
      quote: document.getElementById('formQuote').value
    }
    createPost(collectData, collectData);
  }
  catch (error) {
    console.error(error);
  }
};
let a;
const objTitleValidation = {
  ruleCheckBox : [false, false, false],

  ruleColorWrong : (rule) => {
    document.getElementById(rule).classList.remove('header-content-left-postform-block-container-message-correct');
    document.getElementById(rule).classList.add('header-content-left-postform-block-container-message-wrong');
  },

  ruleColorCorrect : (rule) => {
    document.getElementById(rule).classList.remove('header-content-left-postform-block-container-message-wrong');
    document.getElementById(rule).classList.add('header-content-left-postform-block-container-message-correct');
  },

  validationCorrectCharacters : (inputString) => inputString.split('').map((num) => num.match(/[a-zA-Z0-9!,.?: -]/)),

  isCorrectCharacters : () => {
    const charactersRule = 'wrongCharacters'

    for (let i = 0; i < document.getElementById('formTitle').value.length; i++) {
      if (objTitleValidation.validationCorrectCharacters(document.getElementById('formTitle').value)[i] === null) {
        objTitleValidation.ruleCheckBox.splice(0, 1, false);
        objTitleValidation.ruleColorWrong(charactersRule);
        break;
      } else {
        objTitleValidation.ruleColorCorrect(charactersRule);
        objTitleValidation.ruleCheckBox.splice(0, 1, true);
      }
    }
  },

  isFirstLetterUpper : () => {
    const firstLetterRule = 'wrongFirstLetter'

    if(/[A-Z]/.test(document.getElementById('formTitle').value.split('')[0])) {
      objTitleValidation.ruleCheckBox.splice(1, 1, true);
      objTitleValidation.ruleColorCorrect(firstLetterRule);
    } else {
      objTitleValidation.ruleColorWrong(firstLetterRule);
      objTitleValidation.ruleCheckBox.splice(1, 1, false);
      return;
    }
  },

  isTitleLengthValid : () => {
    const lengthRule = 'wrongLength'

    if (document.getElementById('formTitle').value.length > 2 && document.getElementById('formTitle').value.length < 20){
      objTitleValidation.ruleCheckBox.splice(2, 1, true);
      objTitleValidation.ruleColorCorrect(lengthRule);
    } else {
      objTitleValidation.ruleColorWrong(lengthRule);
      objTitleValidation.ruleCheckBox.splice(2, 1, false);
      return;
    }   
  },

  styleChanger : () => {
    if (objTitleValidation.ruleCheckBox[0] === true && objTitleValidation.ruleCheckBox[1] === true && objTitleValidation.ruleCheckBox[2] === true) {
      document.getElementById('formTitle').classList.remove('header-content-left-postform-block-input-bad');
      document.getElementById('createPost').removeAttribute('disabled', 'disabled')
      document.getElementById('messageBox').classList.add('header-content-left-postform-block-container-none');
    } else {
      document.getElementById('formTitle').classList.add('header-content-left-postform-block-input-bad');
      document.getElementById('createPost').setAttribute('disabled', 'disabled')
      document.getElementById('messageBox').classList.remove('header-content-left-postform-block-container-none');
    }
  },
}

document.addEventListener('keyup', (event) => {
  if (document.querySelector('.header-content-left-postform-container').childNodes.length === 2 && event.key ==='Escape') {
    objForm.closeForm()
  }
})

document.addEventListener('mousedown', (event) => {
  objForm.clickNear(event);
});