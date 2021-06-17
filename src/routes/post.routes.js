const Router = require('express');
const router = Router();

const { Post, Category } = require('../models/index');
const postValidation = require('../validations/post.validation');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes:['id', 'title', 'content', 'image', 'createdAt'],
      order: [['createdAt', 'DESC']],
      include: Category
    });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error:`${error}` });
  }
});

router.get('/:id' , async (req , res)=> {
  const id = req.params.id;
  try {
      const post = await Post.findOne({
        where: { id},
        attributes:['id', 'title', 'content', 'image', 'createdAt'],
        include: Category
      });
      if( post === null)
        throw new Error(`No post with the id ${id} could be found`);
      res.json(post);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error:`${error}` });
  }
});

router.post('/', async (req, res) => {
  const newPost = req.body;
  try {
    const val = postValidation(req.body);
    if(!val.result)
      throw new Error(val.error);
    if(typeof(newPost.category_id) === 'string'){
      const category = await Category.findOne({ where: { name: newPost.category_id }});
      newPost.category_id = category.id;
    }
    if(newPost.image.match(/\.(jpg|png)$/) === null)
      throw new Error('Url must be an image');
    const post = await Post.create(newPost);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error:`${error}` });
  }
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const newPost = req.body;
  try {
    if(newPost.hasOwnProperty('id'))
      throw new Error('Cannot change the id');
    if(typeof(newPost.category_id) === 'string'){
      const category = await Category.findOne({ where: { name: newPost.category_id }});
      newPost.category_id = category.id;
    }
    if(newPost.image.match(/\.(jpg|png)$/) === null)
      throw new Error('Url must be an image');
    await Post.update( { ...newPost }, { where: { id }});
    const post = await Post.findOne({
      where: { id},
      attributes:['id', 'title', 'content', 'image', 'createdAt'],
      include: Category
    });
    if( post === null)
      throw new Error(`No post with the id ${id} could be found`);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error:`${error}` });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({
      where: { id},
      attributes:['id', 'title', 'content', 'image', 'createdAt'],
      include: Category
    });
    if( post === null)
      throw new Error(`No post with the id ${id} could be found`);
    await Post.destroy({ where : { id }});
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error:`${error}` });
  }
})

module.exports = router;
