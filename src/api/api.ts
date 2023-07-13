import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getPromptResult = async (file: File, prompt: string) => {
  console.log(file);
  console.log(prompt);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("prompt", prompt);

  console.log(baseUrl);

  const result = await axios.post(`${baseUrl}/prompt`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result;
};
