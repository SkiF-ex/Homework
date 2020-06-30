const objForm = {
  bool : true,
  form : document.getElementById('postform'),

  formOpener (){    
    if (this.bool === false) {
      this.form.classList.add('header-content-left-postform-none');
      this.bool = true;
    } else {
      this.form.classList.remove('header-content-left-postform-none');
      this.bool = false;
    }
  }
}

document.getElementById('addNewPost').addEventListener('click', function(){
  objForm.formOpener();
});

document.getElementById('createPost').addEventListener('click', () => {  
  getAllPostsForId();
});

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
      id : identifier,
      type : document.getElementById('formType').value,
      imgLink : document.getElementById('formImgSrc').value,
      title : document.getElementById('formTitle').value,
      author : document.getElementById('formAuthor').value,
      date : document.getElementById('formDate').value,
      description : document.getElementById('formDescription').value,
      quote : document.getElementById('formQuote').value
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

  validationFirstStage : (elem) => elem.split('').map((num) => num.match(/[a-zA-Z0-9!-,.?: ]/)),

  validationLastStage : () => {
    if(/[A-Z]/.test(objTitleValidation.str.value.split('')[0])) {
      this.boolean = true;
    } else {
      return this.boolean = false;
    }
 
    if (objTitleValidation.str.value.length > 1 && objTitleValidation.str.value.length < 21){
      this.boolean = true;
    } else {
      return this.boolean = false;
    }   

    for (let i = 0; i < objTitleValidation.str.value.length; i++) {
      if (objTitleValidation.validationFirstStage(objTitleValidation.str.value)[i] === null) {
        this.boolean = false;
        break;
      } else {
        this.boolean = true;
      }
    }
  },

  classAdd : () => {
    if (this.boolean === true) {
      document.getElementById('formTitle').classList.remove('header-content-left-postform-block-input-bad');
      document.getElementById('createPost').removeAttribute('disabled', 'disabled')
    } else {
      document.getElementById('formTitle').classList.add('header-content-left-postform-block-input-bad');
      document.getElementById('createPost').setAttribute('disabled', 'disabled')
    }
  },
}

document.getElementById('formTitle').addEventListener('blur', function(){
  objTitleValidation.validationLastStage();
  objTitleValidation.classAdd();
});