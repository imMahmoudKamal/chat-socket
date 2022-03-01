import http from 'http';
import express from 'express';
import env from 'dotenv';
import path from 'path';
import { Server } from 'socket.io';
import { formatMessage, getCurrentUser, joinNewUser, removeUser } from './utils/utils.js';

env.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const ROOMS = ['Room_1', 'Room_2', 'Room_3', 'Room_4', 'Room_5'];

// setup ejs as static server
app.set('view engine', 'ejs');
app.set('/views', express.static(path.join(__dirname, '/views')));
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: true }));

// open socket connection
io.addListener('connection', (socket) => {
  // join room
  socket.addListener('joinRoom', ({ name, room }) => {
    const user = joinNewUser(socket.id, name, room);

    socket.join(user.room);

    // new user connects
    socket.broadcast.to(user.room).emit('message', formatMessage('bot', `${user.userName} has joined the chat!`));
  });

  // get message
  socket.addListener('sendMessage', (message) => {
    const user = getCurrentUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', formatMessage(user.userName, message));
    }
  });

  // user left chat
  socket.addListener('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', formatMessage('bot', `${user.userName} has left the chat!`));
    }
  });

  // chat
  app.get('/chat', (req, res) => {
    const user = getCurrentUser(socket.id);

    if (!user) return res.redirect('/');

    res.render('index', { ROOMS: false, user: req.body });
  });

  app.post('/chat', (req, res) => {
    res.render('index', { ROOMS: false, user: req.body });
  });
});

app.get('/', (req, res) => {
  res.render('index', { ROOMS });
});

server.listen(PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});
