import { BlogType } from "../typing/blogType";
import { NewsType } from "../typing/newsType";
import { NetworkStatusError, NetworkError } from "./errors";
import getUserName from "./utils";

const baseUrl = process.env.BACKEND_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleThrowError = (err: any) => {
  // fetch throws TypeError in case of network error
  if (err instanceof TypeError) {
    throw new NetworkError(`Network error`);
  } else {
    throw err;
  }
};

// Response body to json from api is any type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertToJson = (res: Response): Promise<any> => {
  if (res.ok) return res.json();
  throw new NetworkStatusError(res.status);
};
// Response json from api is any type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateAndGet = (value: any, type: string, defaultVaule: any) =>
  value && typeof value === type ? value : defaultVaule;

// Response json from api is any type.
// This function validates contentes and converts to BlogType.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBlogFromJson = (blog: any): BlogType => {
  return {
    name: validateAndGet(blog.name, "string", "Unknown"),
    id: validateAndGet(blog.id, "number", -1),
    content: validateAndGet(blog.content, "string", ""),
    imageURL: validateAndGet(blog.imageURL, "string", ""),
    gifURL: validateAndGet(blog.gifURL, "string", ""),
    createdAt: validateAndGet(blog.createdAt, "string", ""),
    updatedAt: validateAndGet(blog.updatedAt, "string", ""),
  };
};

const getBlogsListFromJson = (data: []): BlogType[] =>
  data.map((blog) => getBlogFromJson(blog)).filter((blog) => blog.id !== -1);

export const getBlogs = (
  keyword: string | string[] = undefined,
  start: number,
  limit: number
): Promise<BlogType[]> => {
  let url = `${baseUrl}/api/blogs/?limit=${limit}&start=${start}`;
  if (keyword) {
    url = `${baseUrl}/api/blogs/?limit=${limit}&start=${start}&keyword=${keyword}`;
  }
  return fetch(url)
    .then((res) => convertToJson(res))
    .then((data) => getBlogsListFromJson(data))
    .catch((err) => handleThrowError(err));
};

export const getBlogById = (id: string): Promise<BlogType> =>
  fetch(`${baseUrl}/api/blogs/${id}`)
    .then((res) => convertToJson(res))
    .then((data) => getBlogFromJson(data))
    .catch((err) => handleThrowError(err));

export const createBlog = (
  content: string,
  imageFile: File,
  gifURL: string
): Promise<BlogType> => {
  const formData = new FormData();
  formData.append("name", getUserName());
  formData.append("content", content);
  formData.append("gifURL", gifURL);
  if (imageFile) {
    formData.append("imageFile", imageFile);
  }
  return fetch(`${baseUrl}/api/blogs/`, {
    method: "POST",
    body: formData,
  })
    .then((res) => convertToJson(res))
    .then((data) => getBlogFromJson(data))
    .catch((err) => handleThrowError(err));
};

export const deleteBlog = (id: string): Promise<void> => {
  return fetch(`${baseUrl}/api/blogs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new NetworkStatusError(res.status);
      }
    })
    .catch((err) => handleThrowError(err));
};

export const updateBlog = (id: string, content: string): Promise<BlogType> => {
  return fetch(`${baseUrl}/api/blogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ content }),
  })
    .then((res) => convertToJson(res))
    .then((data) => getBlogFromJson(data))
    .catch((err) => handleThrowError(err));
};

// Response json from api is any type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNewsFromJson = (data: any): NewsType => {
  return {
    url: validateAndGet(data.url, "string", ""),
    datePublished: validateAndGet(data.datePublished, "string", ""),
    name: validateAndGet(data.name, "string", ""),
    imageURL: validateAndGet(data.image.thumbnail.contentUrl, "string", ""),
  };
};

const getNewsListFromJson = (data: []): NewsType[] =>
  data
    .map((item) => getNewsFromJson(item))
    .filter((news) => news.url && news.name);

export const getNewsHeadline = (): Promise<NewsType[]> => {
  const azureKey = process.env.AZURE_KEY;
  const newsUrl = process.env.NEWS_URL;
  const req = new Request(newsUrl);

  return fetch(req, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Ocp-Apim-Subscription-Key": `${azureKey}`,
    },
  })
    .then((res) => convertToJson(res))
    .then((data) => {
      if (data.value) return getNewsListFromJson(data.value);
      throw new Error("News API doesn't work.");
    })
    .catch((err) => handleThrowError(err));
};
