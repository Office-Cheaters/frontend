import axios from "axios";
import { GoogleVerifyResponse } from "../type/type";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const authUrl = import.meta.env.VITE_APP_AUTH_URL;
const socialRedirectUrl = import.meta.env.VITE_APP_SOCIAL_REDIRECT_URL;

export const getPromptResult = async (file: File, prompt: string) => {
  // console.log(file);
  // console.log(prompt);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("prompt", prompt);

  // console.log(baseUrl);

  const result = await axios.post(`${baseUrl}/prompt`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result;
};

export const verifySocialId = (code: string) => {
  return axios.post<GoogleVerifyResponse>(`${authUrl}/user/social_login/`, {
    code: code,
    state: "google",
    redirect_uri: socialRedirectUrl,
  });
};
