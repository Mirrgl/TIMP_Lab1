import { api } from "./api";

export async function loginUser(login, password) {
  const response = await api.get("/users", { params: { name: login } });

  if (login == response.data[0]?.name && password == response.data[0]?.password) {
    localStorage.setItem("isAuth", "true");
  }
  else {
    throw new Error;
  }
}

export function logoutUser() {
  localStorage.removeItem("isAuth");
}

export function isAuthenticated() {
  return localStorage.getItem("isAuth") === "true";
}
