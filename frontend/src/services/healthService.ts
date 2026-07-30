import API from "./api";

export async function checkBackend() {
  try {
    await API.get("/auth/me");
    return true;
  } catch {
    return false;
  }
}