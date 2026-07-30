import API from "./api";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export async function getProfile() {
  const response = await API.get<UserProfile>("/auth/me");
  return response.data;
}