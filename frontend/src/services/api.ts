import { blogDict } from "../typing/blogType";
import { getUserName } from "../utils";

const baseUrl = process.env.BACKEND_URL;

export const getBlogs = (): Promise<blogDict[]> =>
  fetch(`${baseUrl}/api/blogs/`).then((request) => request.json());

export const getBlogById = (id: number): Promise<blogDict> =>
  fetch(`${baseUrl}/api/blogs/${id}`).then((request) => request.json());

export const createBlog = (content: string): void => {
  fetch(`${baseUrl}/api/blogs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ name: getUserName(), content }),
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
