const express = require("express");

module.exports = models => {
  /*** Controller Logic ***/
  const createBlog = (req, res) => {
    return models.blogs
      .create({
        content: req.body.content,
        name: req.body.name
      })
      .then(() => {
        res.status(201).json("created")})
      .catch(err =>  res.status(400).send(err.message));
    }
  const listBlogs = (req, res) =>
    models.blogs
      .list()
      .then(blogs => blogs.map(blog => blog.serialize()))
      .then(blogs => res.status(200).json(blogs))
      .catch(err => res.status(400).send(err.message));

  const getBlog = (req, res) =>
    models.blogs
      .get({ id: req.params.id })
      .then(blog => blog.serialize())
      .then(blog => res.status(200).json(blog))
      .catch(err => res.status(400).send(err.message));

  const updateBlog = (req, res) =>
    models.blogs
      .update({
        id: req.params.id,
        content: req.body.content,
        name: req.body.name
      })
      .then(blog => blog.serialize())
      .then(blog => res.status(200).json(blog))
      .catch(err => res.status(400).send(err.message));

  const deleteBlog = (req, res) =>
    models.blogs
      .delete({ id: req.params.id })
      .then(() => res.status(204).json("deleted"))
      .catch(err => res.status(400).send(err.message));

  /*** Routes***/
  const router = express.Router();
  router.post("/", createBlog);
  router.get("/", listBlogs);
  router.get("/:id/", getBlog);
  router.patch("/:id/", updateBlog);
  router.delete("/:id/", deleteBlog);

  return router;
};
