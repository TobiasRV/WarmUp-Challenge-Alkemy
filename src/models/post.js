'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category }) {
      this.belongsTo( Category, { foreignKey: 'category_id'});
    }
  };
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Title can not be null'},
        notEmpty: { msg: 'Title can not be empty'}
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Content can not be null'},
        notEmpty: { msg: 'Content can not be empty'}
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Image can not be null' },
        notEmpty: { msg: 'Image can not be empty' },
        isUrl: { msg: 'Image must be a url'}
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
