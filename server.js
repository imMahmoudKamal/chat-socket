import http from 'http';
import express from 'express';
import env from 'dotenv';
import path from 'path';
import { Server } from 'socket.io';
import { formateMessage, getCurrentUser, joinNewUser, removeUser } from './utils/utils.js';

const __dirname = path.resolve();
const PORT = env.PORT || 5000;
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
    socket.broadcast.to(user.room).emit('message', formateMessage('bot', `${user.userName} has joined the chat!`));
  });

  // get message
  socket.addListener('sendMessage', (message) => {
    const user = getCurrentUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', formateMessage(user.userName, message));
    }
  });

  // user left chat
  socket.addListener('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', formateMessage('bot', `${user.userName} has left the chat!`));
    }
  });
});

app.get('/', (req, res) => {
  res.render('index', { ROOMS });
});

app.post('/chat', (req, res) => {
  res.render('index', { ROOMS: false, user: req.body });
});

server.listen(PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});
