'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
          notNull: { msg: 'Image can not be null'},
          notEmpty: { msg: 'Image can not be empty'}
        }
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Posts');
  }
};
