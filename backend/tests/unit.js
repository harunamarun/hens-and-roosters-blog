const { expect } = require("chai");
const knex = require("knex");
const mockKnex = require("mock-knex");
const tracker = mockKnex.getTracker();
const connection = knex({ client: "pg", debug: false });
mockKnex.mock(connection);
const models = require("../models")(connection);

describe("blogs: unit-test", () => {
  describe("##create##", () => {
    const params = { name: "mer-san", content: "go bold" };

    before(() => {
      const methods = ["insert", "select"];
      const results = [
        {
          id: 1,
        },
        [
          {
            id: 1,
            name: params.name,
            content: params.content,
            updated_at: "2020-07-05 09:00:07",
            created_at: "2020-07-05 09:00:07",
          },
        ],
      ];

      tracker.install();
      tracker.on("query", (query) => {
        expect(query.method).to.equal(methods.shift());
        query.response(results.shift());
      });
    });
    after(() => tracker.uninstall());
    it("create a blog", () =>
      models.blogs.create(params).then((blog) => {
        expect(blog.name).to.equal(params.name);
        expect(blog.content).to.equal(params.content);
        expect(blog.createdAt).to.be.a("Date");
        expect(blog.updatedAt).to.be.a("Date");
        expect(blog.id).to.be.a("number");
      }));
  });

  describe("##list##", () => {
    before(() => {
      tracker.install();
      tracker.on("query", (query) => {
        expect(query.method).to.equal("select");
        const results = [
          {
            id: 1,
            name: "mer-san",
            content: "go bold",
            updated_at: "2020-07-05 09:00:00",
            created_at: "2020-07-05 09:00:00",
          },
          {
            id: 2,
            name: "cari-san",
            content: "be a pro",
            updated_at: "2020-07-05 09:00:07",
            created_at: "2020-07-05 09:00:07",
          },
          {
            id: 3,
            name: "pay-san",
            content: "all for one",
            updated_at: "2020-07-05 09:00:10",
            created_at: "2020-07-05 09:00:10",
          },
        ];
        query.response(results);
      });
    });
    after(() => tracker.uninstall());

    it("get blog list", () =>
      models.blogs.list().then((blogs) => {
        expect(blogs.length).to.equal(3);
      }));
  });

  describe("##get##", () => {
    const result = {
      id: 1,
      name: "meru-san",
      content: "go bold",
      updated_at: "2020-07-05 09:00:00",
      created_at: "2020-07-05 09:00:00",
    };
    before(() => {
      tracker.install();
      tracker.on("query", (query) => {
        expect(query.method).to.equal("select");
        query.response([result]);
      });
    });
    after(() => tracker.uninstall());

    it("get a blog", () =>
      models.blogs.get({ id: 1 }).then((actualBlog) => {
        expect(actualBlog.id).to.equal(result.id);
        expect(actualBlog.name).to.equal(result.name);
        expect(actualBlog.content).to.equal(result.content);
      }));
  });

  describe("##update##", () => {
    const params = { id: 1, content: "go bold" };

    const result = {
      id: params.id,
      name: "mer-san",
      content: params.content,
      updated_at: "2020-07-05 09:00:07",
      created_at: "2020-07-05 09:00:07",
    };
    before(() => {
      const methods = ["update", "select"];

      tracker.install();
      tracker.on("query", (query) => {
        expect(query.method).to.equal(methods.shift());
        query.response([result]);
      });
    });
    after(() => tracker.uninstall());
    it("update a blog", () =>
      models.blogs.update(params).then((blog) => {
        expect(blog.id).to.equal(result.id);
        expect(blog.name).to.equal(result.name);
        expect(blog.content).to.equal(result.content);
      }));
  });

  describe("##delete##", () => {
    before(() => {
      tracker.install();
      tracker.on("query", (query) => {
        expect(query.method).to.equal("del");
        query.response([]);
      });
    });
    after(() => tracker.uninstall());

    it("del a blog", () => models.blogs.delete({ id: 1 }));
  });
});
