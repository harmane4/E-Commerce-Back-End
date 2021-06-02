const router = require("express").Router();
const { response } = require("express");
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (request, response) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
      },
    });
    response.status(200).json(tagData);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/:id", async (request, response) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findOne({
      // be sure to include its associated Product data
      include: [{ model: Product }],
      where: { id: request.params.id },
    });
    response.status(200).json(tagData);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.post("/", async (request, response) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: request.body.tag_name,
    });
    response.status(200).json(tagData);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.put("/:id", async (request, response) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(request.body, {
      where: {
        id: request.params.id,
      },
    });
    if (!tagData) {
      response.status(404).json({ message: "No tag found with that id" });
      return;
    }
    response.status(200).json(tagData);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.delete("/:id", async (request, response) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: request.params.id,
      },
    });
    if (!tagData) {
      response.status(404).json({ message: "No tag found with that id" });
      return;
    }
    response.status(200).json(tagData);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
