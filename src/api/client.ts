import axios from "axios";

export const api = axios.create({
  baseURL: "https://vocab-builder-backend.p.goit.global/api",
});

export function setAuthHeader(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearAuthHeader() {
  delete api.defaults.headers.common.Authorization;
}
