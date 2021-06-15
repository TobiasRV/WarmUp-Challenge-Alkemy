const Router = require('express');
const router = Router();

const { Category } = require('../models/index');

router.post('/', async (req, res) => {
  const newCategory = req.body;
  try {
    const category = await Category.create(newCategory);
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error:`${error}` });
  }
});

module.exports = router;
