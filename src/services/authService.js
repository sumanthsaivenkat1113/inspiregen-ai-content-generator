const USERS_KEY = "inspiregen_users";
function _loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function _saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function delay(ms = 600) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function signup({ name, email, password }) {
  await delay();
  const users = _loadUsers();

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    authProvider: "local",
  };

  users.push(newUser);
  _saveUsers(users);

  return { id: newUser.id, name, newUser, email, authProvider: "local" };
}

export async function login({ email, password }) {
  await delay();
  const users = _loadUsers();

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) throw new Error("Invalid email or password.");

  return { id: user.id, name: user.name, email: user.email, authProvider: "local" };
}

// ⭐ Google Signin / Signup (combined)
export async function googleSignin(googleUser) {
  await delay();
  const users = _loadUsers();

  let user = users.find((u) => u.email === googleUser.email);

  if (!user) {
    // Create google user
    user = {
      id: Date.now(),
      name: googleUser.name,
      email: googleUser.email,
      picture: googleUser.picture,
      sub: googleUser.sub,
      authProvider: "google",
    };
    users.push(user);
    _saveUsers(users);
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    authProvider: "google",
  };
}

export function signout() {
  return Promise.resolve();
}
