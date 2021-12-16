function createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  };

class Modal {
    constructor() {
      this.elem = createElement(`
      <div class="modal border">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
            X
            </button>
    
            <h3 class="modal__title text-center">
          
            </h3>
          </div>
    
          <div class="modal__body text-center">
          
          </div>
        </div>
    
      </div>`);
  
    }
  
    open() {
      document.body.classList.add('is-modal-open');
      document.body.append(this.elem);
      
      this.elem.querySelector('.modal__close').addEventListener('click', this.closeButton);
      
      document.addEventListener('keydown', this.closeKey);
      
    }
  
    setTitle(title) {
      this.elem.querySelector('.modal__title').innerHTML = title;
    }
  
    setBody(node) {
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').append(node);
    }
  
    closeButton = (event) => {
      if(this.elem) {
        this.elem.remove();
      }
      document.body.classList.remove('is-modal-open');
      this.elem.querySelector('.modal__close').removeEventListener('click', this.closeButton);
    }
  
    closeKey = (event) => {
      if(event.code === 'Escape') {
        this.elem.remove();
        document.body.classList.remove('is-modal-open');
      }
      document.removeEventListener('keydown', this.closeKey)
    }
  
    close() {
      if(this.elem) {
        this.elem.remove();
        document.body.classList.remove('is-modal-open');
      }
    }
  }
  

let registerUrl="https://httpbin.org/post"
let forms = document.forms;
let registerForm = forms.register;
let userName = registerForm.elements.firstName;
let userLast = registerForm.elements.lastName;
let userMail = registerForm.elements.email;
let userPhone = registerForm.elements.phone;
let userCity = registerForm.elements.city;
let userZip = registerForm.elements.zip;
let userCv = registerForm.elements.cv;
let userLetter = registerForm.elements.letter;
let isAgreedOnTermsField = registerForm.elements.isAgreedOnTermsField;


registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  let user = {
    firstName: userName.value,
    lastName: userLast.value,
    mail: userMail.value,
    phone: userPhone.value,
    city: userCity.value,
    zip: userZip.value,
    cv: userCv.value,
    letter: userLetter.value,
    isAgreedOnTerms: isAgreedOnTermsField.checked
  }

  if(user.firstName == '' || user.lastName == '' || user.mail == '' || 
  user.phone == '' || user.city == '' || user.zip == '' || user.cv == '' ||
  user.letter == '' || user.isAgreedOnTerms == false) {
    return;
  } else {
    fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user),
  })
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
  });
  }
  let modal = new Modal;
  modal.setTitle('Success!');
  modal.setBody('After verification the data, we will notify you about the results');
  modal.open();
});