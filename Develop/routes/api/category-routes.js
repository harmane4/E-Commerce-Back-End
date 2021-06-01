const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (request, response) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    response.status(200).json(categoryData);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/:id", async (request, response) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findOne({
      include: [{ model: Product }],
      where: { id: request.params.id },
    });
    response.status(200).json(categoryData);
  } catch (error) {
    response.status(500).json(error);
  }
});

// router.get("/:id", async (request, response) => {
//   // find one category by its `id` value
//   try {
//     const categoryData = await Category.findByPk(request.params.id, {
//       // be sure to include its associated Products
//       include: [
//         {
//           model: Product,
//         },
//       ],
//     });
//     response.status(200).json(categoryData);
//   } catch (error) {
//     response.status(500).json(error);
//   }
// });

router.post("/", async (request, response) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: request.body.category_name,
    });
    response.status(200).json(categoryData);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.put("/:id", async (request, response) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(request.body, {
      where: {
        id: request.params.id,
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

router.delete("/:id", async (request, response) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy(request.body, {
      where: {
        id: request.params.id,
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
