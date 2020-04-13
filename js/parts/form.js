function form() {
  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  let form = document.querySelector('.main-form'),
      contactForm = document.querySelector('#form'),
      input = document.getElementsByTagName('input'),
      statusMessage = document.createElement('div');
    
   statusMessage.classList.add('status');

  form.addEventListener('submit', sendForm);
  contactForm.addEventListener('submit', sendForm);
  
  function sendForm (event) {
    event.preventDefault();
    event.target.appendChild(statusMessage);
 
    let formData = new FormData(event.target);
    let obj = {};
    formData.forEach(function (value, key) {
      obj[key] = value;
    });
    let json = JSON.stringify(obj);

    function postData (data) {
      return new Promise ( (resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        request.send(json);

        request.addEventListener('readystatechange', () => {
          if(request.readyState < 4) {
            statusMessage.innerHTML = message.loading;
          } else if (request.readyState === 4 && request.status === 200) {
            statusMessage.innerHTML = message.success;
          } else {
            statusMessage.innerHTML = message.failure;
          }
        });
      });
    }

    for (let i = 0; i < input.length; i++) {
      input[i].value = '';
    }
    postData(json)
      .then(() => statusMessage.innerHTML = message.loading)
      .then(() => statusMessage.innerHTML = message.success)
      .catch(() => statusMessage.innerHTML = message.failure);
  }
}

module.exports = form;