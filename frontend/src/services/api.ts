import { blogDict } from "../typing/blogType";
import { getUserName } from "../utils";

const baseUrl = process.env.BACKEND_URL;

export const getBlogs = (
  keyword = undefined,
  start: number,
  limit: number
): Promise<blogDict[]> => {
  let url = `${baseUrl}/api/blogs/?limit=${limit}&start=${start}`;
  if (keyword) {
    url = `${baseUrl}/api/blogs/?limit=${limit}&start=${start}&keyword=${keyword}`;
  }
  return fetch(url).then((request) => request.json());
};

export const getBlogById = (id: number): Promise<blogDict> =>
  fetch(`${baseUrl}/api/blogs/${id}`).then((request) => request.json());

export const createBlog = (
  content: string,
  imageFile: any,
  gifURL: string
): void => {
  const formData = new FormData();
  formData.append("name", getUserName());
  formData.append("content", content);
  formData.append("gifURL", gifURL);
  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  fetch(`${baseUrl}/api/blogs/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => JSON.stringify(data))
    .catch((error) => console.error(error));
};

export const deleteBlog = (id: number): Promise<unknown> => {
  return fetch(`${baseUrl}/api/blogs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((data) => JSON.stringify(data))
    .catch((error) => console.error(error));
};

export const updateBlog = (id: number, content: string): Promise<unknown> => {
  return fetch(`${baseUrl}/api/blogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ content }),
  }).catch((error) => console.error(error));
};

export const getNewsHeadline = (): Promise<Array<Record<string, unknown>>> => {
  const azureKey = process.env.AZURE_KEY;
  const url =
    "https://hensandroosters.cognitiveservices.azure.com/bing/v7.0/news";
  const req = new Request(url);

  return fetch(req, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Ocp-Apim-Subscription-Key": `${azureKey}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.value)
    .catch((error) => console.error(error));
};
