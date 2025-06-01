import UserInfo from "@/types/UserInfo";
import instance from ".";
import { storeToken } from "./storage";

// LOGIN API
const login = async (userInfo: UserInfo) => {
  const { data } = await instance.post("/auth/login", userInfo);
  await storeToken(data.token); // Save token to secure storage
  return data;
};

// REGISTER API with image upload support
const register = async (userInfo: UserInfo, image: string) => {
  const formData = new FormData();

  // Append user info fields
  Object.entries(userInfo).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Append image
  formData.append("image", {
    uri: image,
    name: "profile.jpg",
    type: "image/jpeg",
  } as any); // "as any" to satisfy TypeScript for file blobs

  const { data } = await instance.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  await storeToken(data.token); // Save token
  return data;
};

// GET CURRENT AUTHENTICATED USER
const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

// ADMIN - GET ALL USERS
const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

export { login, register, me, getAllUsers };
