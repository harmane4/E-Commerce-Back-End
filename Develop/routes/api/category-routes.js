const router = require("express").Router();
const { response } = require("express");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: id,
        product_name,
        price,
        stock,
        category_id,
      },
    ],
  });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: id,
        product_name,
        price,
        stock,
        category_id,
      },
    ],
  });
});

router.post("/", (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create({
      category_name: req.body.category_name,
    });
    response.status(200).json(newCategoryData);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedCategoryData) {
      response.status(404).json({ message: "No category with that id found" });
      return;
    }
    response.status(200).json(updatedCategoryData);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      response.status(404).json({ message: "No category with that id found" });
      return;
    }
    response.status(200).json(categoryData);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
