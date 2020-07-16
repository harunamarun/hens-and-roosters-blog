const express = require("express");
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const { v4 } = require("uuid");

// Instantiate a storage client
const storage = new Storage();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const bucket = storage.bucket("hens-and-roosters");

module.exports = (models) => {
  /*** Controller Logic ***/
  const createBlog = (req, res, next) => {
    console.log(req);
    if (req.file) {
      console.log("has file");
      // Create a new blob in the bucket and upload the file data.
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();
      blob.name = `${v4()}`;

      blobStream.on("error", (err) => {
        next(err);
      });

      blobStream.on("finish", () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        console.log(publicUrl);
        return models.blogs
          .create({
            content: req.body.content,
            name: req.body.name,
            imageURL: publicUrl,
          })
          .then((blog) => blog.serialize())
          .then((blog) => res.status(201).json(blog))
          .catch((err) => res.status(400).send(err.message));
      });

      blobStream.end(req.file.buffer);
    } else {
      return models.blogs
        .create({
          content: req.body.content,
          name: req.body.name,
          imageURL: "",
        })
        .then((blog) => blog.serialize())
        .then((blog) => res.status(201).json(blog))
        .catch((err) => res.status(400).send(err.message));
    }
  };
  const listBlogs = (req, res) =>
    models.blogs
      .list({ keyword: req.query.keyword })
      .then((blogs) => blogs.map((blog) => blog.serialize()))
      .then((blogs) => res.status(200).json(blogs))
      .catch((err) => res.status(400).send(err.message));

  const getBlog = (req, res) =>
    models.blogs
      .get({ id: req.params.id })
      .then((blog) => blog.serialize())
      .then((blog) => res.status(200).json(blog))
      .catch((err) => res.status(400).send(err.message));

  const updateBlog = (req, res) =>
    models.blogs
      .update({
        id: req.params.id,
        content: req.body.content,
        name: req.body.name,
      })
      .then((blog) => blog.serialize())
      .then((blog) => res.status(200).json(blog))
      .catch((err) => res.status(400).send(err.message));

  const deleteBlog = (req, res) =>
    models.blogs
      .delete({ id: req.params.id })
      .then(() => res.status(204).json("deleted"))
      .catch((err) => res.status(400).send(err.message));

  /*** Routes***/
  const router = express.Router();
  router.post("/", multer.single("imageFile"), createBlog);
  router.get("/", listBlogs);
  router.get("/:id/", getBlog);
  router.patch("/:id/", updateBlog);
  router.delete("/:id/", deleteBlog);

  return router;
};
