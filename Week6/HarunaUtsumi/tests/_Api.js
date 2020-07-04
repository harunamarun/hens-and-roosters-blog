/* eslint-disable no-console */
const { expect, assert } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);

describe("blogs", () => {
  after(() => knex.destroy());
  describe("##setup##", () => {
    it("able to connect to database", () =>
      knex.raw("select 1+1 as result").catch(() => {
        assert.fail("unable to connect to db");
      }));
    it("has run the initial migrations", () =>
      knex("blogs")
        .select()
        .catch(() => {
          assert.fail("blogs table is not found.");
        }));
  });

  describe("##create##", () => {
    let params = { name: " " };
    context("when good params are given", () => {
      before(() => {
        (params.name = "mer-san"), (params.content = "go bold");
      });
      afterEach(() => knex("blogs").del());
      it("creates a blog", () =>
        models.blogs.create(params).then((blog) => {
          expect(blog).to.include({ name: params.name });
          expect(blog).to.include({ content: params.content });
          expect(blog.id).to.be.a("number");
          expect(blog.createdAt).to.be.a("Date");
          expect(blog.updatedAt).to.be.a("Date");
          // When we create new blog, createAt must be the same to updatedAt
          expect(blog.createdAt.getTime()).to.equal(blog.updatedAt.getTime());
        }));
    });
  });

  describe("##list##", () => {
    const blogs = [
      { name: "mer-san", content: "go bold" },
      { name: "cari-san", content: "be a pro" },
    ];
    const names = blogs.map((blog) => blog.name);
    before(() => Promise.all(blogs.map(models.blogs.create)));
    after(() => knex("blogs").del());
    it("lists all blogs", () =>
      models.blogs.list().then((resp) => {
        expect(names).to.include(resp[0].name);
        expect(names).to.include(resp[1].name);
      }));
    it("returns serializable objects", () =>
      models.blogs.list().then((resp) => {
        expect(resp[0].serialize).to.be.a("function");
        expect(resp[0].serialize().id).to.be.a("number");
        expect(resp[0].serialize().name).to.be.a("string");
        expect(resp[0].serialize().content).to.be.a("string");
      }));
  });

  describe("##get##", () => {
    const seedBlogs = [{ name: "mer-san", content: "go bold" }];
    before(() => Promise.all(seedBlogs.map(models.blogs.create)));
    after(() => knex("blogs").del());
    it("get the blog", () =>
      models.blogs.list().then((blogs) => {
        expect(blogs.length).to.equal(1);
        const blog = blogs[0];
        expect(blog.name).to.equal(seedBlogs[0].name);
        expect(blog.content).to.equal(seedBlogs[0].content);
      }));
  });

  describe("##update##", () => {
    const blogs = [{ name: "mer-san", content: "go timid" }];
    const updates = [{ content: "go bold" }];
    before(() => Promise.all(blogs.map(models.blogs.create)));
    after(() => knex("blogs").del());
    it("update the blog", () =>
      models.blogs.list().then((resp) =>
        models.blogs
          .update({ id: resp[0].id, content: updates[0].content })
          .then((resp) => {
            expect(updates[0].content).to.equal(resp.content);
          })
      ));
  });

  describe("##delete##", () => {
    const blogs = [{ name: "mer-san", content: "go timid" }];
    before(() => Promise.all(blogs.map(models.blogs.create)));
    after(() => knex("blogs").del());
    it("delete the blog", () =>
      models.blogs
        .list()
        .then((resp) =>
          models.blogs
            .delete({ id: resp[0].id })
            .then(() =>
              models.blogs
                .list()
                .then((resp) => expect(0).to.equal(resp.length))
            )
        ));
  });
});
