<p align="center">
  <a href="https://chatting-app-socket.herokuapp.com/">
    <img src="https://chatting-app-socket.herokuapp.com/public/img/send.svg" alt="Chatting App By Mahmoud Kamal" width="200" height="200">
  </a>
</p>

<h1 align="center">Chatting App usign Socket.IO</h1>

<p align="center">Made with ❤️ by Mahmoud Kamal &copy; 2022</p>

This is a simple Chatting App with rooms you can join room and start the chat.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Choose any room and join the chat
- View different message styles
- Show sender name and time

### Screenshot

![](./screenshot.jpg)

### Links

- Live Site URL: [Chatting App](https://chatting-app-socket.herokuapp.com/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Sass](https://sass-lang.com/) - CSS pre-processor
- [Express](https://expressjs.com/) - Node.Js Framework
- [Socket.IO](https://socket.io/) - WebSocket connections

### What I learned

- Deploy a node js app to heroku
- Using Ejs lib and making html templates

#### Write semantic html

```html
<main class="chatting" data-main>
  <div class="chatting__container">
    <h1>using semantic html && BEM naming convention 🎉🎉</h1>
  </div>
</main>
```

#### Linear gradient for font color

```css
@mixin gradient-font-clr($gradient) {
  background: $gradient;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; // fallback
}
```

#### Format message helper function

```js
function formatMessage(user, message) {
  const date = new Date();
  const [hours, minute, when] = date.toLocaleTimeString().split(':');

  return {
    user,
    message,
    time: `${hours}:${minute} ${when.split(' ')[1]}`,
  };
}
```

## Author

- LinkedIn - [@immahmoudkamal](https://www.twitter.com/immahmoudkamal/)
