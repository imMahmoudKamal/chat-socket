const users = [];

export function joinNewUser(id, userName, room) {
  const user = { id, userName, room };
  users.push(user);
  return user;
}

export function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

export function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

export function formateMessage(user, message) {
  const date = new Date();
  const [hours, minute, when] = date.toLocaleTimeString().split(':');

  return {
    user,
    message,
    time: `${hours}:${minute} ${when.split(' ')[1]}`,
  };
}
