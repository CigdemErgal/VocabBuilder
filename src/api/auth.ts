import { api } from "./client";

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export async function signUp(payload: SignUpPayload) {
  const { data } = await api.post("/users/signup", payload);
  return data;
}

export async function signIn(payload: SignInPayload) {
  const { data } = await api.post("/users/signin", payload);
  return data;
}

export async function getCurrentUser() {
  const { data } = await api.get("/users/current");
  return data;
}

export async function signOut() {
  const { data } = await api.post("/users/signout");
  return data;
}
