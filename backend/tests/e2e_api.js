const { expect } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const fetch = require("node-fetch");
const models = require("../models")(knex);

// In this e2e test, I used fetch function to test REST api
// I directly used knex to Prepare (before) and Clean up (after)
describe("blogs: e2e-api-test", () => {
  after(() => knex.destroy());

  describe("##create##", () => {
    const params = { name: "mer-san", content: "go bold" };
    after(() => knex("blogs").del());
    it("creates a blog", () =>
      fetch(`http://backend:3000/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(params),
      })
        .then((blog) => blog.json())
        .then((blog) => {
          expect(blog.name).to.equal(params.name);
          expect(blog.content).to.equal(params.content);
          expect(blog.createdAt).to.be.a("string");
          expect(blog.updatedAt).to.be.a("string");
          expect(blog.id).to.be.a("number");
        }));
  });

  describe("##list##", () => {
    const seedBlogs = [
      { name: "mer-san", content: "go bold" },
      { name: "cari-san", content: "be a pro" },
    ];
    const names = seedBlogs.map((blog) => blog.name);
    const contents = seedBlogs.map((blog) => blog.content);
    before(() => Promise.all(seedBlogs.map(models.blogs.create)));
    after(() => knex("blogs").del());

    it("list blogs", () =>
      fetch(`http://backend:3000/api/blogs`)
        .then((res) => res.json())
        .then((blogs) => {
          expect(blogs[0].name).to.equal(names[0]);
          expect(blogs[1].name).to.equal(names[1]);
          expect(blogs[0].content).to.equal(contents[0]);
          expect(blogs[1].content).to.equal(contents[1]);
        }));
  });

  describe("##get##", () => {
    const seedBlogs = [{ name: "mer-san", content: "go bold" }];
    before(() => Promise.all(seedBlogs.map(models.blogs.create)));
    after(() => knex("blogs").del());

    it("get a blog", () =>
      fetch(`http://backend:3000/api/blogs`)
        .then((res) => res.json())
        .then((blogs) =>
          fetch(`http://backend:3000/api/blogs/${blogs[0].id}`)
            .then((res) => res.json())
            .then((blog) => {
              expect(blog.name).to.equal(seedBlogs[0].name);
              expect(blog.content).to.equal(seedBlogs[0].content);
            })
        ));
  });

  describe("##update##", () => {
    const seedBlogs = [{ name: "mer-san", content: "go timid" }];
    const updates = [{ content: "go bold" }];
    before(() => Promise.all(seedBlogs.map(models.blogs.create)));
    after(() => knex("blogs").del());

    it("update a blog", () =>
      fetch(`http://backend:3000/api/blogs`)
        .then((res) => res.json())
        .then((blogs) =>
          fetch(`http://backend:3000/api/blogs/${blogs[0].id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              content: updates[0].content,
            }),
          })
        )
        .then((res) => res.json())
        .then((blog) => expect(blog.content).to.equal(updates[0].content)));
  });

  describe("##delete##", () => {
    const seedBlogs = [{ name: "mer-san", content: "go timid" }];
    before(() => Promise.all(seedBlogs.map(models.blogs.create)));
    after(() => knex("blogs").del());

    it("delete a blog", () =>
      fetch(`http://backend:3000/api/blogs`)
        .then((res) => res.json())
        .then((blogs) =>
          fetch(`http://backend:3000/api/blogs/${blogs[0].id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          })
        )
        .then(() => fetch(`http://backend:3000/api/blogs`))
        .then((res) => res.json())
        .then((blogs) => expect(blogs.length).to.equal(0)));
  });
});
