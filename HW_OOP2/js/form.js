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
      this.formOpener();
      return;
    }

    if (event.classList.contains('header-content-left-postform-block') 
    || event.parentNode.classList.contains('header-content-left-postform-block') 
    || event.classList.contains('header-content-left-postform')
    || event.classList.contains('header-content-left-postform-block-create')) {
      return;
    }

    if (document.querySelector('.header-content-left-postform-container').childNodes.length === 1){
      return;
    } else {
      this.closeForm();
    }
  },

  formOpener(){
    if (document.querySelector('.header-content-left-postform-container').childNodes.length === 2){
    this.closeForm();
    } else {
      this.openForm()
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
      objTitleValidation.validationFirstUpperLetter();
      objTitleValidation.styleChanger();
    });

    document.getElementById('formTitle').oninput = function(){
      objTitleValidation.validationFirstUpperLetter();
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
    let identifier = data[data.length - 1].id + 1;

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

const objTitleValidation = {
  str : document.getElementById('formTitle'),
  boolean : false,

  validationCorrectCharacters : (elem) => elem.split('').map((num) => num.match(/[a-zA-Z0-9!,.?: -]/)),

  validationCharactersConfirmation : () => {
    for (let i = 0; i < document.getElementById('formTitle').value.length; i++) {
      if (objTitleValidation.validationCorrectCharacters(document.getElementById('formTitle').value)[i] === null) {
        this.boolean = false;
        break;
      } else {
        this.boolean = true;
      }
    }
  },

  validationFirstUpperLetter : () => {
    if(/[A-Z]/.test(document.getElementById('formTitle').value.split('')[0])) {
      this.boolean = true;
    } else {
      return this.boolean = false;
    }
    objTitleValidation.validationTitleLength();
  },

  validationTitleLength : () => {
    if (document.getElementById('formTitle').value.length > 2 && document.getElementById('formTitle').value.length < 20){
      this.boolean = true;
    } else {
      return this.boolean = false;
    }   
    objTitleValidation.validationCharactersConfirmation();
  },

  styleChanger : () => {
    if (this.boolean === true) {
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
