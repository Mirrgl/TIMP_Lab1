const LOGIN = import.meta.env.VITE_LOGIN;
const PASSWORD = import.meta.env.VITE_PASSWORD;

export function loginUser(login, password) {
  return new Promise((resolve, reject) => {
    if (login === LOGIN && password === PASSWORD) {
      localStorage.setItem("isAuth", "true");
      resolve();
    } else {
      reject(new Error("Неверный логин или пароль"));
    }
  });
}

export function logoutUser() {
  localStorage.removeItem("isAuth");
}

export function isAuthenticated() {
  return localStorage.getItem("isAuth") === "true";
}
