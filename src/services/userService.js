const KEYS = {
  users: "users",
  userId: "userId",
  userEmail: "email",
};

export const insertUser = (data) => {
  let users = getAllUsers();
  data["id"] = generateUserId();
  users = users || [];
  users.push(data);
  localStorage.setItem(KEYS.users, JSON.stringify(users));
};

export function generateUserId() {
  if (localStorage.getItem(KEYS.userId) == null)
    localStorage.setItem(KEYS.userId, "0");
  var id = parseInt(localStorage.getItem(KEYS.userId));
  localStorage.setItem(KEYS.userId, (++id).toString());
  return id;
}

export function getAllUsers() {
  if (localStorage.getItem(KEYS.users == null)) {
    localStorage.setItem(KEYS.users, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(KEYS.users));
}
export function getUser(email, password) {
  let users = getAllUsers();
  let usersEmail = [];
  let usersPassword = [];
  for (let i = 0; i < users.length; i++) {
    usersEmail.push(users[i].email);
    usersPassword.push(users[i].password);
  }
  for (let j = 0; j < users.length; j++) {
    if (email === usersEmail[j] && password === usersPassword[j]) {
      return true;
    } else {
      return false;
    }
  }
}
export function checkEmail(email) {
  let users = getAllUsers();
  users = users || [];
  let usersEmail = [];
  for (let i = 0; i < users.length; i++) {
    usersEmail.push(users[i].email);
  }
  for (let j = 0; j < users.length; j++) {
    if (email === usersEmail[j]) {
      return true;
    } else {
      return false;
    }
  }
}
export const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};
