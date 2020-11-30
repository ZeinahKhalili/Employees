const KEYS = {
  users: "users",
  userId: "userId",
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
  localStorage.setItem(KEYS.users, (++id).toString());
  return id;
}

export function getAllUsers() {
  if (localStorage.getItem(KEYS.users == null)) {
    localStorage.setItem(KEYS.users, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(KEYS.users));
}
