import { blogDict } from "../typing/blogType";
import { getUserName } from "../utils";

const baseUrl = process.env.BACKEND_URL;

export const getBlogs = (keyword = undefined): Promise<blogDict[]> => {
  if (keyword === undefined) {
    return fetch(`${baseUrl}/api/blogs/`).then((request) => request.json());
  } else {
    return fetch(`${baseUrl}/api/blogs/?keyword=${keyword}`).then((request) =>
      request.json()
    );
  }
};

export const getBlogById = (id: number): Promise<blogDict> =>
  fetch(`${baseUrl}/api/blogs/${id}`).then((request) => request.json());

export const createBlog = (content: string, imageFile: any): void => {
  const formData = new FormData();
  formData.append("name", getUserName());
  formData.append("content", content);
  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  fetch(`${baseUrl}/api/blogs/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(JSON.stringify(data));
      return JSON.stringify(data);
    })
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
  const apiKey = process.env.NEWS_API_KEY;
  const url =
    "https://newsapi.org/v2/top-headlines?" + "country=jp&" + `apiKey=${apiKey}`;
  const req = new Request(url);

  return fetch(req)
    .then((response) => response.json())
    .then((res) => res.articles.slice(0, 5))
    .catch((error) => console.error(error));
};
