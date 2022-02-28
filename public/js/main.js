// field animation
const fieldElement = document.querySelector('[data-felid]');

fieldElement &&
  fieldElement.addEventListener('blur', (event) => {
    const isValue = event.currentTarget.value.trim();
    if (isValue) {
      fieldElement.classList.add('form__group__field--full');
    } else {
      fieldElement.classList.remove('form__group__field--full');
    }
  });

const socket = io();

// join room
const currentUserData = JSON.parse(userData);
socket.emit('joinRoom', currentUserData);

socket.addEventListener('message', (message) => {
  const messageBox = document.querySelector('[data-message-box]');

  messageBox && (messageBox.innerHTML += outputMessags(message));
});

function outputMessags(message) {
  let html = '';

  switch (message.user) {
    // me
    case currentUserData.name:
      html = `
        <div class="message-box__item message-box__item--me" data-user-name="${message.user.substr(0, 1)}">
          <span class="message-box__item__message">${message.message}</span>
          <span class="message-box__item__time">${message.time}</span>
        </div>
      `;
      break;

    // bot
    case 'bot':
      html = `
        <div class="message-box__item message-box__item--bot">
          <span class="message-box__item__message">${message.message}</span>
          <span class="message-box__item__time">${message.time}</span>
        </div>
      `;
      break;

    // others
    default:
      html = `
        <div class="message-box__item" data-user-name="${message.user.substr(0, 1)}">
          <span class="message-box__item__message">${message.message}</span>
          <span class="message-box__item__user">${message.user}</span>
          <span class="message-box__item__time">${message.time}</span>
        </div>
      `;
      break;
  }

  return html;
}

// subimt message
const form = document.querySelector('[data-form]');

form &&
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const messageField = event.target[0];

    // send message
    socket.emit('sendMessage', messageField.value.trim());

    // clear input field
    messageField.value = '';
  });
