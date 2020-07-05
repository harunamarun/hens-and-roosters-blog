const { expect } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const fetch = require("node-fetch");

describe("blogs", () => {
  after(() => knex.destroy());
  describe("##create##", () => {
    const params = { name: "mer-san", content: "go bold" };
    context("when good params are given", () => {
      afterEach(() => knex("blogs").del());
      it("creates a blog", () =>
        fetch(`http://localhost:3000/api/blogs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(params),
        })
          .then((blog) => blog.json())
          .then((blog) => {
            console.log("blog", blog);
            expect(blog.name).to.equal(params.name);
            expect(blog.content).to.equal(params.content);
            expect(blog.createdAt).to.a("string");
            expect(blog.updatedAt).to.a("string");
            expect(blog.id).to.a("number");
          }));
    });
  });
});
