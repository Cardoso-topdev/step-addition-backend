module.exports = app => {
  const entries = require("../controllers/entries.controller.js");

  var router = require("express").Router();

  // Create a new Entry
  router.post("/", entries.create);

  // Retrieve all entries
  router.get("/", entries.findAll);

  // Retrieve all published entries
  router.get("/published", entries.findAllPublished);

  // Retrieve a single Entry with id
  router.get("/:id", entries.findOne);

  // Update a Entry with id
  router.put("/:id", entries.update);

  // Delete a Entry with id
  router.delete("/:id", entries.delete);

  // Create a new Entry
  router.delete("/", entries.deleteAll);

  // Generate Steps
  router.post('/generate', entries.generateSteps)

  app.use('/api/v1/entries', router);
};