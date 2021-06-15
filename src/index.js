const express = require('express');
const { sequelize } = require('./models');

const app = express();

const postRoute = require('./routes/post.routes');
const categoryRoute = require('./routes/category.routes');

app.use(express.json());

app.use('/posts', postRoute);
app.use('/categories', categoryRoute);


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server listening to port: ${server.address().port}`);
  } catch (error) {
      throw new Error(error);
  }
});
server.on('error', (error) => console.log(error));
